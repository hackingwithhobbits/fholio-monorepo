import { getSupabaseClient } from "../client";
import { SyncLog, SyncLogInsert } from "../types/database.types";

/**
 * Create sync log
 */
export async function createSyncLog(log: SyncLogInsert): Promise<SyncLog> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("sync_logs")
    .insert(log)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update sync log
 */
export async function updateSyncLog(
  logId: string,
  updates: Partial<SyncLog>
): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("sync_logs")
    .update(updates)
    .eq("id", logId);

  if (error) throw error;
}

/**
 * Get recent sync logs
 */
export async function getRecentSyncLogs(
  limit: number = 10
): Promise<SyncLog[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("sync_logs")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
