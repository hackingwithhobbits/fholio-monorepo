import {
  ChartmetricFilterResponse,
  ChartmetricDetailedResponse,
  MergedArtistData,
} from "../types.js";

export function mergeArtistData(
  filterData: ChartmetricFilterResponse,
  detailedData: ChartmetricDetailedResponse
): MergedArtistData {
  const detailed = detailedData.obj;
  const stats = detailed.cm_statistics?.latest || {};

  return {
    // Core Identity
    id: parseInt(filterData.cm_artist),
    name: detailed.name || filterData.name,
    isni: detailed.isni,
    band: detailed.band ?? filterData.band ?? false,

    // Identity Details
    gender: detailed.gender,
    gender_title: detailed.gender_title,
    pronoun_title: detailed.pronoun_title || filterData.pronoun,

    // Location
    code2: detailed.code2 || filterData.code2,
    hometown_city: detailed.hometown_city || filterData.hometown_city,
    hometown_city_id: detailed.hometown_city_id,
    current_city: detailed.current_city || filterData.current_city,
    current_city_id: detailed.current_city_id,

    // Media
    image_url: detailed.image_url || filterData.image_url,
    cover_url: detailed.cover_url,
    preview_track_id: detailed.preview_track_id,
    description: detailed.description,
    is_custom_description: detailed.is_custom_description,

    // Career Status
    career_stage:
      filterData.career_status?.stage || detailed.career_status?.stage,
    career_stage_score:
      filterData.career_status?.stage_score ||
      detailed.career_status?.stage_score,
    career_trend:
      filterData.career_status?.trend || detailed.career_status?.trend,
    career_trend_score:
      filterData.career_status?.trend_score ||
      detailed.career_status?.trend_score,
    artist_tier: detailed.artist_tier,

    // Rankings
    cm_artist_rank: detailed.cm_artist_rank || filterData.cm_artist_rank,
    cm_artist_score: detailed.cm_artist_score,
    rank_eg: detailed.rank_eg || filterData.rank_eg,
    rank_fb: detailed.rank_fb || filterData.rank_fb,

    // Key Platform Stats
    sp_monthly_listeners:
      stats.sp_monthly_listeners ?? filterData.sp_monthly_listeners,
    sp_followers: stats.sp_followers ?? filterData.sp_followers,
    sp_popularity: stats.sp_popularity ?? filterData.sp_popularity,
    sp_followers_to_listeners_ratio:
      stats.sp_followers_to_listeners_ratio ??
      filterData.sp_followers_to_listeners_ratio,

    ins_followers: stats.ins_followers ?? filterData.ins_followers,
    ins_engagement_rate:
      stats.ins_engagement_rate ?? filterData.ins_engagement_rate,

    tiktok_followers: stats.tiktok_followers ?? filterData.tiktok_followers,
    tiktok_likes: stats.tiktok_likes ?? filterData.tiktok_likes,
    tiktok_engagement_rate:
      stats.tiktok_engagement_rate ?? filterData.tiktok_engagement_rate,
    tiktok_track_posts:
      stats.tiktok_track_posts ?? filterData.tiktok_track_posts,

    ycs_subscribers: stats.ycs_subscribers ?? filterData.ycs_subscribers,
    ycs_views: stats.ycs_views ?? filterData.ycs_views,
    youtube_monthly_video_views:
      stats.youtube_monthly_video_views ??
      filterData.youtube_monthly_video_views,
    youtube_daily_video_views:
      stats.youtube_daily_video_views ?? filterData.youtube_daily_video_views,

    facebook_followers:
      stats.facebook_followers ?? filterData.facebook_followers,
    twitter_followers: stats.ts_followers ?? filterData.ts_followers,
    shazam_count: stats.shazam_count ?? filterData.shazam_count,

    // Complex Nested Data
    genres: detailed.genres,
    genre_smart_ordered:
      detailed.genre_smart_ordered || filterData.genre_smart_ordered,
    moods: detailed.moods,
    mood_smart_ordered: detailed.mood_smart_ordered,
    activities: detailed.activities,
    activities_smart_ordered: detailed.activities_smart_ordered,
    associated_labels: detailed.associatedLabels,

    // All Platform Stats
    platform_stats: detailed.cm_statistics?.latest,
    platform_ranks: detailed.cm_statistics?.latest?.stats_ranked,

    // Change Tracking
    weekly_diff: detailed.cm_statistics?.weekly_diff,
    monthly_diff: detailed.cm_statistics?.monthly_diff,
    bimonthly_diff: detailed.cm_statistics?.bimonthly_diff,
    weekly_diff_percent: detailed.cm_statistics?.weekly_diff_percent,
    monthly_diff_percent: detailed.cm_statistics?.monthly_diff_percent,

    // Additional Stats
    playlist_stats: {
      spotify: {
        playlist_count:
          stats.spotify_playlist_count ?? filterData.spotify_playlist_count,
        playlist_total_reach:
          stats.spotify_playlist_total_reach ??
          filterData.spotify_playlist_total_reach,
        ed_playlist_count:
          stats.spotify_ed_playlist_count ??
          filterData.spotify_ed_playlist_count,
        ed_playlist_total_reach:
          stats.spotify_ed_playlist_total_reach ??
          filterData.spotify_ed_playlist_total_reach,
      },
      apple_music: {
        playlist_count:
          stats.itunes_playlist_count ?? filterData.itunes_playlist_count,
        ed_playlist_count:
          stats.itunes_ed_playlist_count ?? filterData.itunes_ed_playlist_count,
      },
      deezer: {
        fans: stats.deezer_fans ?? filterData.deezer_fans,
        playlist_count:
          stats.deezer_playlist_count ?? filterData.deezer_playlist_count,
        ed_playlist_count:
          stats.deezer_ed_playlist_count ?? filterData.deezer_ed_playlist_count,
      },
      youtube: {
        playlist_count:
          stats.youtube_playlist_count ?? filterData.youtube_playlist_count,
        playlist_total_reach:
          stats.youtube_playlist_total_reach ??
          filterData.youtube_playlist_total_reach,
        ed_playlist_count:
          stats.youtube_ed_playlist_count ??
          filterData.youtube_ed_playlist_count,
        ed_playlist_total_reach:
          stats.youtube_ed_playlist_total_reach ??
          filterData.youtube_ed_playlist_total_reach,
      },
    },
    where_people_listen: stats.sp_where_people_listen
      ? typeof stats.sp_where_people_listen === "string"
        ? JSON.parse(stats.sp_where_people_listen)
        : stats.sp_where_people_listen
      : detailed.cm_statistics?.sp_where_people_listen,

    // Metadata Flags
    verified: detailed.verified,
    inactive: detailed.inactive,
    is_comparable: detailed.is_comparable,
    is_duplicate: detailed.is_duplicate,
    is_non_artist: detailed.is_non_artist,

    // Timestamp
    data_timestamp: detailed.cm_statistics?.timestamp || detailed.created_at,
  };
}
