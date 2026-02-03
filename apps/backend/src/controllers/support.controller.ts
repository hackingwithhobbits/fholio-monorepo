// apps/backend/src/controllers/support.controller.ts

import { Request, Response } from 'express';
import { SupportService } from '../services/support.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const supportService = new SupportService();

export const supportController = {
  /**
   * POST /api/support/tickets
   * Create support ticket
   */
  async createTicket(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { subject, description, category, priority } = req.body;

      if (!subject || !description || !category) {
        return res.status(400).json({
          success: false,
          message: 'Subject, description, and category are required',
        });
      }

      const ticket = await supportService.createTicket(
        req.user.id,
        subject,
        description,
        category,
        priority
      );

      logger.info('Support ticket created', {
        userId: req.user.id,
        ticketId: ticket.id,
      });

      res.json({
        success: true,
        data: ticket,
        message: 'Support ticket created successfully',
      });
    } catch (error: any) {
      logger.error('Error creating support ticket', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * GET /api/support/tickets
   * Get user's tickets
   */
  async getMyTickets(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const tickets = await supportService.getUserTickets(req.user.id);

      res.json({
        success: true,
        data: tickets,
      });
    } catch (error: any) {
      logger.error('Error fetching tickets', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch tickets',
      });
    }
  },

  /**
   * GET /api/support/tickets/:id
   * Get ticket details
   */
  async getTicketDetails(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const ticket = await supportService.getTicketDetails(req.user.id, id);

      res.json({
        success: true,
        data: ticket,
      });
    } catch (error: any) {
      logger.error('Error fetching ticket details', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * POST /api/support/tickets/:id/messages
   * Add message to ticket
   */
  async addMessage(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({
          success: false,
          message: 'Message is required',
        });
      }

      const msg = await supportService.addMessage(req.user.id, id, message);

      res.json({
        success: true,
        data: msg,
        message: 'Message added successfully',
      });
    } catch (error: any) {
      logger.error('Error adding message', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * PUT /api/support/tickets/:id/close
   * Close ticket
   */
  async closeTicket(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await supportService.closeTicket(req.user.id, id);

      res.json({
        success: true,
        message: 'Ticket closed successfully',
      });
    } catch (error: any) {
      logger.error('Error closing ticket', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * GET /api/support/categories
   * Get support categories
   */
  async getCategories(req: Request, res: Response) {
    try {
      const categories = supportService.getSupportCategories();

      res.json({
        success: true,
        data: categories,
      });
    } catch (error: any) {
      logger.error('Error fetching categories', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
      });
    }
  },
};
