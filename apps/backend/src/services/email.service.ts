// apps/backend/src/services/email.service.ts

import { supabase } from '../config/database';

export class EmailService {
  /**
   * Queue email for sending
   */
  async queueEmail(toEmail: string, templateId: string, subject: string, data: any) {
    const { data: email, error } = await supabase
      .from('email_queue')
      .insert({
        to_email: toEmail,
        template_id: templateId,
        subject,
        data,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return email;
  }

  /**
   * Get email template
   */
  async getTemplate(templateId: string) {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('template_id', templateId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(userId: string) {
    const { data: user } = await supabase
      .from('users')
      .select('email, display_name')
      .eq('id', userId)
      .single();

    if (!user) return;

    await this.queueEmail(user.email, 'welcome', 'Welcome to Fholio!', {
      userName: user.display_name,
    });
  }

  /**
   * Send payout notification email
   */
  async sendPayoutEmail(userId: string, amount: number, weekNumber: number) {
    const { data: user } = await supabase
      .from('users')
      .select('email, display_name')
      .eq('id', userId)
      .single();

    if (!user) return;

    await this.queueEmail(
      user.email,
      'payout_received',
      `You earned $${amount} in Week ${weekNumber}!`,
      {
        userName: user.display_name,
        amount,
        weekNumber,
      }
    );
  }

  /**
   * Send lineup reminder email
   */
  async sendLineupReminder(userId: string, hoursRemaining: number) {
    const { data: user } = await supabase
      .from('users')
      .select('email, display_name')
      .eq('id', userId)
      .single();

    if (!user) return;

    await this.queueEmail(
      user.email,
      'lineup_reminder',
      `${hoursRemaining} hours left to lock your lineup!`,
      {
        userName: user.display_name,
        hoursRemaining,
      }
    );
  }

  /**
   * Send weekly recap email
   */
  async sendWeeklyRecap(userId: string, weekData: any) {
    const { data: user } = await supabase
      .from('users')
      .select('email, display_name')
      .eq('id', userId)
      .single();

    if (!user) return;

    await this.queueEmail(user.email, 'weekly_recap', `Your Week ${weekData.weekNumber} Recap`, {
      userName: user.display_name,
      ...weekData,
    });
  }

  /**
   * Process email queue (called by cron)
   */
  async processEmailQueue(batchSize: number = 50) {
    const { data: emails } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(batchSize);

    if (!emails || emails.length === 0) return;

    for (const email of emails) {
      try {
        // Get template
        const template = await this.getTemplate(email.template_id);

        if (!template) {
          throw new Error(`Template ${email.template_id} not found`);
        }

        // Render template with data
        const htmlContent = this.renderTemplate(template.html_content, email.data);
        const textContent = this.renderTemplate(template.text_content, email.data);

        // Send email (integrate with SendGrid, AWS SES, etc.)
        await this.sendEmailViaProvider(email.to_email, email.subject, htmlContent, textContent);

        // Mark as sent
        await supabase
          .from('email_queue')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
          })
          .eq('id', email.id);
      } catch (error: any) {
        // Mark as failed
        await supabase
          .from('email_queue')
          .update({
            status: 'failed',
            error_message: error.message,
            retry_count: email.retry_count + 1,
          })
          .eq('id', email.id);
      }
    }
  }

  /**
   * Render template with data
   */
  private renderTemplate(template: string, data: any): string {
    let rendered = template;

    // Simple template variable replacement
    Object.keys(data).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, data[key]);
    });

    return rendered;
  }

  /**
   * Send email via provider (placeholder)
   */
  private async sendEmailViaProvider(to: string, subject: string, html: string, text: string) {
    // TODO: Integrate with SendGrid, AWS SES, Mailgun, etc.
    console.log(`Sending email to ${to}: ${subject}`);

    // Example with SendGrid:
    // const msg = {
    //   to,
    //   from: 'noreply@fholio.com',
    //   subject,
    //   text,
    //   html,
    // };
    // await sgMail.send(msg);
  }
}
