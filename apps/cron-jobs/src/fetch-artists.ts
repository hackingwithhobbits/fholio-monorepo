import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { ChartmetricClient } from "./utils/chartmetric-client.js";
import { RateLimiter } from "./utils/rate-limiter.js";
import { mergeArtistData } from "./utils/data-merger.js";
import type {
  ChartmetricFilterResponse,
  ChartmetricDetailedResponse,
} from "./types.js";

dotenv.config();

// Configuration
const CONFIG = {
  CHARTMETRIC_REFRESH_TOKEN: process.env.CHARTMETRIC_REFRESH_TOKEN!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE || "100"),
  START_OFFSET: parseInt(process.env.START_OFFSET || "0"),
  MAX_OFFSET: parseInt(process.env.MAX_OFFSET || "10000"),
  RATE_LIMIT_MS: parseInt(process.env.RATE_LIMIT_MS || "2000"),
};

// Validate configuration
if (
  !CONFIG.CHARTMETRIC_REFRESH_TOKEN ||
  !CONFIG.SUPABASE_URL ||
  !CONFIG.SUPABASE_KEY
) {
  console.error("❌ Missing required environment variables!");
  console.error("Please check your .env file");
  process.exit(1);
}

// Initialize clients
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
const chartmetric = new ChartmetricClient(CONFIG.CHARTMETRIC_REFRESH_TOKEN);
const rateLimiter = new RateLimiter(CONFIG.RATE_LIMIT_MS);
/**
 * Test Supabase connection
 */
async function testSupabaseConnection(): Promise<boolean> {
  console.log("\n🔌 Testing Supabase connection...");
  console.log(`   URL: ${CONFIG.SUPABASE_URL}`);
  console.log(`   Key: ${CONFIG.SUPABASE_KEY.substring(0, 20)}...`);

  try {
    // Test 1: Check if table exists
    const { data, error, count } = await supabase
      .from("artists")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("❌ Supabase connection failed:", error);
      return false;
    }

    console.log("✅ Supabase connection successful!");
    console.log(`   Table 'artists' exists with ${count ?? 0} records`);
    return true;
  } catch (error) {
    console.error("❌ Exception testing Supabase:", error);
    return false;
  }
}
/**
 * Fetch artists from filter endpoint
 */
async function fetchArtistsList(
  offset: number
): Promise<ChartmetricFilterResponse[]> {
  console.log(`\n📥 Fetching artists at offset ${offset}...`);

  await rateLimiter.wait();

  try {
    const response: any = await chartmetric.get("/artist/list/filter", {
      limit: CONFIG.BATCH_SIZE,
      offset,
      code2: "US",
      career_stage: "undiscovered",
      "sp_f[]": [1000, 50000], // Spotify followers filter
    });

    // The response structure is: { obj: { obj: [...artists], offset: X, total: Y } }
    const artists = response.obj?.obj || [];
    const total = response.obj?.total || 0;

    console.log(
      `✅ Fetched ${artists.length} artists (Total available: ${total})`
    );
    return artists;
  } catch (error: any) {
    console.error(
      `❌ Error fetching artists list:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Fetch detailed data for a single artist
 */
async function fetchArtistDetails(
  artistId: string
): Promise<ChartmetricDetailedResponse | null> {
  await rateLimiter.wait();

  try {
    const response = await chartmetric.get<ChartmetricDetailedResponse>(
      `/artist/${artistId}`
    );
    return response;
  } catch (error: any) {
    console.error(
      `❌ Error fetching details for artist ${artistId}:`,
      error.response?.data || error.message
    );
    return null;
  }
}
/**
 * Save or update artist in Supabase
 */
async function upsertArtist(artistData: any): Promise<boolean> {
  try {
    const { data: existing, error } = await supabase
      .from("artists")
      .upsert(artistData, {
        onConflict: "id",
        ignoreDuplicates: true,
      })
      .select();

    if (existing) {
      console.log(`⏭️  Skipping artist ${artistData.id} - already exists`);
      return true; // Return true to count as "processed"
    }
    if (error) {
      console.error(`❌ Supabase error for artist ${artistData.id}:`, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      // Log the data that failed (first 500 chars)
      console.error(
        "Failed data sample:",
        JSON.stringify(artistData, null, 2).substring(0, 500)
      );
      return false;
    }

    return true;
  } catch (error: any) {
    console.error(`❌ Exception upserting artist ${artistData.id}:`, {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack?.split("\n").slice(0, 3).join("\n"),
    });
    return false;
  }
}

/**
 * Update fetch progress in Supabase
 */
async function updateProgress(
  offset: number,
  totalFetched: number,
  status: string = "in_progress"
) {
  try {
    await supabase.from("fetch_progress").upsert(
      {
        endpoint: "artist_list_filter",
        last_offset: offset,
        last_fetch_at: new Date().toISOString(),
        status,
        total_fetched: totalFetched,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "endpoint",
      }
    );
  } catch (error) {
    console.error("⚠️  Error updating progress:", error);
  }
}

/**
 * Process a batch of artists
 */
async function processBatch(
  artists: ChartmetricFilterResponse[]
): Promise<number> {
  let successCount = 0;

  for (let i = 0; i < artists.length; i++) {
    const filterData = artists[i];
    const artistId = filterData.cm_artist;

    console.log(
      `\n[${i + 1}/${artists.length}] Processing artist: ${filterData.name} (ID: ${artistId})`
    );

    // Fetch detailed data
    const detailedData = await fetchArtistDetails(artistId);

    if (!detailedData) {
      console.log(`⚠️  Skipping artist ${artistId} due to fetch error`);
      continue;
    }

    // Merge data
    const mergedData = mergeArtistData(filterData, detailedData);

    // Save to Supabase
    const success = await upsertArtist(mergedData);

    if (success) {
      console.log(`✅ Successfully saved artist: ${mergedData.name}`);
      successCount++;
    }
  }

  return successCount;
}

/**
 * Main execution function
 */
async function main() {
  console.log("🚀 Starting Artist Data Collection");
  console.log("===================================");
  console.log(
    `Config: Batch Size=${CONFIG.BATCH_SIZE}, Start Offset=${CONFIG.START_OFFSET}, Max Offset=${CONFIG.MAX_OFFSET}`
  );
  const connected = await testSupabaseConnection();
  if (!connected) {
    console.error(
      "\n❌ Cannot connect to Supabase. Please check your configuration."
    );
    console.error("Make sure:");
    console.error("  1. SUPABASE_URL is correct");
    console.error("  2. SUPABASE_SERVICE_ROLE_KEY is correct (not anon key)");
    console.error('  3. The "artists" table exists in your database');
    process.exit(1);
  }

  let currentOffset = CONFIG.START_OFFSET;
  let totalProcessed = 0;
  let totalSaved = 0;

  try {
    while (currentOffset < CONFIG.MAX_OFFSET) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`📊 BATCH: Offset ${currentOffset} / ${CONFIG.MAX_OFFSET}`);
      console.log(`${"=".repeat(60)}`);

      // Fetch artists list
      const artists = await fetchArtistsList(currentOffset);

      if (artists.length === 0) {
        console.log("✅ No more artists to fetch. Done!");
        await updateProgress(currentOffset, totalSaved, "completed");
        break;
      }

      // Process batch
      const savedCount = await processBatch(artists);

      totalProcessed += artists.length;
      totalSaved += savedCount;

      console.log(
        `\n📈 Progress: ${totalProcessed} processed, ${totalSaved} saved`
      );

      // Update progress
      await updateProgress(currentOffset, totalSaved);

      // Move to next batch
      currentOffset += CONFIG.BATCH_SIZE;

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("\n✅ ===================================");
    console.log("✅ Artist Data Collection Complete!");
    console.log(`✅ Total Processed: ${totalProcessed}`);
    console.log(`✅ Total Saved: ${totalSaved}`);
    console.log("✅ ===================================\n");
  } catch (error) {
    console.error("\n❌ Fatal error in main execution:", error);
    await updateProgress(currentOffset, totalSaved, "failed");
    process.exit(1);
  }
}

// Run the script
main();
