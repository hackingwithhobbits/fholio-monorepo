import { getSupabaseClient } from "../client";
import { Artist, ArtistInsert } from "../types/database.types";

/**
 * Get all emerging artists that need syncing
 */
export async function getArtistsNeedingSync(maxAgeHours: number = 24) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("get_artists_needing_sync", {
    max_age_hours: maxAgeHours,
  });

  if (error) throw error;
  return data || [];
}

/**
 * Get artist by Chartmetric ID
 */
export async function getArtistByChartmetricId(
  chartmetricId: number
): Promise<Artist | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("chartmetric_id", chartmetricId)
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows
  return data;
}

/**
 * Insert or update artist
 */
export async function upsertArtist(
  artist: Partial<Artist> & { chartmetric_id: number }
): Promise<Artist> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("artists")
    .upsert(
      {
        ...artist,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "chartmetric_id",
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update artist stats
 */
export async function updateArtistStats(
  artistId: string,
  stats: {
    spotify_followers?: number;
    spotify_monthly_listeners?: number;
    follower_growth_30d?: number;
    is_emerging?: boolean;
    momentum_score?: number;
    chartmetric_last_synced?: string;
  }
) {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("artists")
    .update(stats)
    .eq("id", artistId);

  if (error) throw error;
}

/**
 * Get all emerging artists
 */
export async function getAllEmergingArtists(limit: number = 100) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("is_emerging", true)
    .order("momentum_score", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Check if artist meets emerging criteria
 */
export async function checkEmergingCriteria(
  followers: number,
  listeners: number,
  momentumScore?: number,
  tier?: number
): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("check_emerging_criteria", {
    p_followers: followers,
    p_listeners: listeners,
    p_momentum_score: momentumScore,
    p_tier: tier,
  });

  if (error) throw error;
  return data || false;
}
