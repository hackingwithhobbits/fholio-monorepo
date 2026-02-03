// apps/backend/src/services/community.service.ts

import { supabase } from '../config/database';

export class CommunityService {
  /**
   * Get community feed
   */
  async getCommunityFeed(limit: number = 50, offset: number = 0) {
    const { data, error } = await supabase
      .from('community_posts')
      .select(
        `
        *,
        author:users(id, display_name, avatar_url, tier),
        likes:community_likes(count),
        comments:community_comments(count)
      `
      )
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get user's posts
   */
  async getUserPosts(userId: string, limit: number = 20) {
    const { data, error } = await supabase
      .from('community_posts')
      .select(
        `
        *,
        author:users(id, display_name, avatar_url),
        likes:community_likes(count),
        comments:community_comments(count)
      `
      )
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Create post
   */
  async createPost(userId: string, content: string, type: string = 'text', metadata?: any) {
    if (!content || content.trim().length === 0) {
      throw new Error('Post content cannot be empty');
    }

    if (content.length > 5000) {
      throw new Error('Post content too long (max 5000 characters)');
    }

    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        user_id: userId,
        content,
        type,
        metadata,
        is_active: true,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete post
   */
  async deletePost(userId: string, postId: string) {
    // Verify ownership
    const { data: post } = await supabase
      .from('community_posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (!post || post.user_id !== userId) {
      throw new Error('Post not found or unauthorized');
    }

    const { error } = await supabase
      .from('community_posts')
      .update({ is_active: false })
      .eq('id', postId);

    if (error) throw error;
  }

  /**
   * Like post
   */
  async likePost(userId: string, postId: string) {
    // Check if already liked
    const { data: existing } = await supabase
      .from('community_likes')
      .select('*')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .single();

    if (existing) {
      throw new Error('Already liked this post');
    }

    const { data, error } = await supabase
      .from('community_likes')
      .insert({
        user_id: userId,
        post_id: postId,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Create notification for post author
    const { data: post } = await supabase
      .from('community_posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (post && post.user_id !== userId) {
      await supabase.from('notifications').insert({
        user_id: post.user_id,
        type: 'post_liked',
        title: 'Someone liked your post',
        message: 'Your post received a new like',
        data: { postId, likerId: userId },
        is_read: false,
      });
    }

    return data;
  }

  /**
   * Unlike post
   */
  async unlikePost(userId: string, postId: string) {
    const { error } = await supabase
      .from('community_likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);

    if (error) throw error;
  }

  /**
   * Get post comments
   */
  async getPostComments(postId: string) {
    const { data, error } = await supabase
      .from('community_comments')
      .select(
        `
        *,
        author:users(id, display_name, avatar_url)
      `
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Add comment
   */
  async addComment(userId: string, postId: string, content: string) {
    if (!content || content.trim().length === 0) {
      throw new Error('Comment cannot be empty');
    }

    if (content.length > 1000) {
      throw new Error('Comment too long (max 1000 characters)');
    }

    const { data, error } = await supabase
      .from('community_comments')
      .insert({
        user_id: userId,
        post_id: postId,
        content,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Create notification for post author
    const { data: post } = await supabase
      .from('community_posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (post && post.user_id !== userId) {
      await supabase.from('notifications').insert({
        user_id: post.user_id,
        type: 'post_commented',
        title: 'New comment on your post',
        message: content.substring(0, 100),
        data: { postId, commenterId: userId },
        is_read: false,
      });
    }

    return data;
  }

  /**
   * Delete comment
   */
  async deleteComment(userId: string, commentId: string) {
    // Verify ownership
    const { data: comment } = await supabase
      .from('community_comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (!comment || comment.user_id !== userId) {
      throw new Error('Comment not found or unauthorized');
    }

    const { error } = await supabase.from('community_comments').delete().eq('id', commentId);

    if (error) throw error;
  }

  /**
   * Get trending posts
   */
  async getTrendingPosts(limit: number = 20) {
    // Posts with most likes in last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('community_posts')
      .select(
        `
        *,
        author:users(id, display_name, avatar_url),
        likes:community_likes(count),
        comments:community_comments(count)
      `
      )
      .eq('is_active', true)
      .gte('created_at', sevenDaysAgo)
      .order('likes.count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Share lineup (creates a post)
   */
  async shareLineup(userId: string, lineupId: string, caption?: string) {
    // Get lineup details
    const { data: lineup } = await supabase
      .from('fan_lineups')
      .select(
        `
        *,
        lineup_artists(
          *,
          artist:artists(name, image_url)
        )
      `
      )
      .eq('id', lineupId)
      .single();

    if (!lineup) throw new Error('Lineup not found');

    const content = caption || `Check out my lineup! Score: ${lineup.total_score}`;

    return this.createPost(userId, content, 'lineup_share', {
      lineupId,
      lineupData: lineup,
    });
  }
}
