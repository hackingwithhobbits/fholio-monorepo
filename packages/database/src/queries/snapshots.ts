import { getSupabaseClient } from "../client";
import { ChartmetricSnapshot, SnapshotInsert } from "../types/database.types";

/**
 * Insert snapshot
 */
export async function insertSnapshot(
  snapshot: SnapshotInsert
): Promise<ChartmetricSnapshot> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("chartmetric_snapshots")
    .insert(snapshot)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Batch insert snapshots (upsert)
 */
export async function batchInsertSnapshots(
  snapshots: SnapshotInsert[]
): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("chartmetric_snapshots")
    .upsert(snapshots, {
      onConflict: "artist_id,snapshot_date",
      ignoreDuplicates: false,
    });

  if (error) throw error;
}

/**
 * Get latest snapshot for artist
 */
export async function getLatestArtistSnapshot(artistId: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("get_latest_artist_snapshot", {
    p_artist_id: artistId,
  });

  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
}

/**
 * Get historical snapshots for artist
 */
export async function getArtistSnapshotHistory(
  artistId: string,
  days: number = 180
): Promise<ChartmetricSnapshot[]> {
  const supabase = getSupabaseClient();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("chartmetric_snapshots")
    .select("*")
    .eq("artist_id", artistId)
    .gte("snapshot_date", startDate.toISOString().split("T")[0])
    .order("snapshot_date", { ascending: true });

  if (error) throw error;
  return data || [];
}
