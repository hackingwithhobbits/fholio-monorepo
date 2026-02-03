// apps/backend/src/controllers/community.controller.ts

import { Request, Response } from 'express';
import { CommunityService } from '../services/community.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const communityService = new CommunityService();

export const communityController = {
  /**
   * GET /api/community/feed
   * Get community feed
   */
  async getFeed(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const posts = await communityService.getCommunityFeed(limit, offset);

      res.json({
        success: true,
        data: posts,
        meta: {
          limit,
          offset,
          count: posts.length,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching community feed', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch community feed',
      });
    }
  },

  /**
   * POST /api/community/posts
   * Create a post
   */
  async createPost(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { content, type, metadata } = req.body;

      if (!content) {
        return res.status(400).json({
          success: false,
          message: 'Content is required',
        });
      }

      const post = await communityService.createPost(req.user.id, content, type, metadata);

      logger.info('Post created', { userId: req.user.id, postId: post.id });

      res.json({
        success: true,
        data: post,
        message: 'Post created successfully',
      });
    } catch (error: any) {
      logger.error('Error creating post', {
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
   * DELETE /api/community/posts/:id
   * Delete a post
   */
  async deletePost(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await communityService.deletePost(req.user.id, id);

      logger.info('Post deleted', { userId: req.user.id, postId: id });

      res.json({
        success: true,
        message: 'Post deleted successfully',
      });
    } catch (error: any) {
      logger.error('Error deleting post', {
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
   * POST /api/community/posts/:id/like
   * Like a post
   */
  async likePost(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await communityService.likePost(req.user.id, id);

      res.json({
        success: true,
        message: 'Post liked',
      });
    } catch (error: any) {
      logger.error('Error liking post', {
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
   * DELETE /api/community/posts/:id/like
   * Unlike a post
   */
  async unlikePost(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await communityService.unlikePost(req.user.id, id);

      res.json({
        success: true,
        message: 'Post unliked',
      });
    } catch (error: any) {
      logger.error('Error unliking post', {
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
   * GET /api/community/posts/:id/comments
   * Get post comments
   */
  async getComments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comments = await communityService.getPostComments(id);

      res.json({
        success: true,
        data: comments,
      });
    } catch (error: any) {
      logger.error('Error fetching comments', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch comments',
      });
    }
  },

  /**
   * POST /api/community/posts/:id/comments
   * Add comment to post
   */
  async addComment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({
          success: false,
          message: 'Content is required',
        });
      }

      const comment = await communityService.addComment(req.user.id, id, content);

      res.json({
        success: true,
        data: comment,
        message: 'Comment added',
      });
    } catch (error: any) {
      logger.error('Error adding comment', {
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
   * GET /api/community/trending
   * Get trending posts
   */
  async getTrending(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const posts = await communityService.getTrendingPosts(limit);

      res.json({
        success: true,
        data: posts,
      });
    } catch (error: any) {
      logger.error('Error fetching trending posts', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trending posts',
      });
    }
  },

  /**
   * POST /api/community/share-lineup
   * Share lineup to community
   */
  async shareLineup(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { lineup_id, caption } = req.body;

      if (!lineup_id) {
        return res.status(400).json({
          success: false,
          message: 'lineup_id is required',
        });
      }

      const post = await communityService.shareLineup(req.user.id, lineup_id, caption);

      res.json({
        success: true,
        data: post,
        message: 'Lineup shared successfully',
      });
    } catch (error: any) {
      logger.error('Error sharing lineup', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
