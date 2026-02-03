// apps/backend/src/services/support.service.ts

import { supabase } from '../config/database';

export class SupportService {
  /**
   * Create support ticket
   */
  async createTicket(
    userId: string,
    subject: string,
    description: string,
    category: string,
    priority: string = 'medium'
  ) {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: userId,
        subject,
        description,
        category,
        priority,
        status: 'open',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Send confirmation email
    await this.sendTicketConfirmationEmail(userId, data.id, subject);

    return data;
  }

  /**
   * Get user's tickets
   */
  async getUserTickets(userId: string) {
    const { data, error } = await supabase
      .from('support_tickets')
      .select(
        `
        *,
        messages:support_ticket_messages(
          count
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get ticket details
   */
  async getTicketDetails(userId: string, ticketId: string) {
    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!ticket) throw new Error('Ticket not found');

    // Get messages
    const { data: messages } = await supabase
      .from('support_ticket_messages')
      .select(
        `
        *,
        sender:users(display_name, avatar_url)
      `
      )
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    return {
      ...ticket,
      messages: messages || [],
    };
  }

  /**
   * Add message to ticket
   */
  async addMessage(userId: string, ticketId: string, message: string, isStaff: boolean = false) {
    // Verify ticket belongs to user
    const { data: ticket } = await supabase
      .from('support_tickets')
      .select('user_id, status')
      .eq('id', ticketId)
      .single();

    if (!ticket) throw new Error('Ticket not found');
    if (!isStaff && ticket.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    if (ticket.status === 'closed') {
      throw new Error('Cannot add message to closed ticket');
    }

    const { data, error } = await supabase
      .from('support_ticket_messages')
      .insert({
        ticket_id: ticketId,
        user_id: userId,
        message,
        is_staff: isStaff,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Update ticket status
    await supabase
      .from('support_tickets')
      .update({
        status: isStaff ? 'awaiting_customer' : 'awaiting_staff',
        updated_at: new Date().toISOString(),
      })
      .eq('id', ticketId);

    return data;
  }

  /**
   * Close ticket
   */
  async closeTicket(userId: string, ticketId: string) {
    const { error } = await supabase
      .from('support_tickets')
      .update({
        status: 'closed',
        closed_at: new Date().toISOString(),
      })
      .eq('id', ticketId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Send ticket confirmation email
   */
  private async sendTicketConfirmationEmail(userId: string, ticketId: string, subject: string) {
    const { data: user } = await supabase
      .from('users')
      .select('email, display_name')
      .eq('id', userId)
      .single();

    if (!user) return;

    await supabase.from('email_queue').insert({
      to_email: user.email,
      template_id: 'support_ticket_created',
      subject: `Support Ticket Created: ${subject}`,
      data: {
        userName: user.display_name,
        ticketId,
        subject,
      },
      status: 'pending',
    });
  }

  /**
   * Get support categories
   */
  getSupportCategories() {
    return [
      { id: 'account', name: 'Account Issues', description: 'Login, password, profile' },
      {
        id: 'payment',
        name: 'Payment & Wallet',
        description: 'Deposits, withdrawals, transactions',
      },
      { id: 'lineup', name: 'Lineup Issues', description: 'Picks, locks, scoring' },
      { id: 'technical', name: 'Technical Problem', description: 'Bugs, errors, performance' },
      { id: 'rules', name: 'Rules & Questions', description: 'How things work' },
      { id: 'other', name: 'Other', description: 'Everything else' },
    ];
  }
}
