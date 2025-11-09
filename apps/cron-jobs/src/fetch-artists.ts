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
const alreadyStoredIds = [
  26193, 38077, 38692, 47348, 55044, 74945, 85072, 94514, 98385, 101672, 107403,
  116105, 117895, 123978, 128400, 134789, 139006, 149603, 149673, 176835,
  177257, 187855, 197052, 233204, 240633, 251162, 255168, 258558, 264744,
  286097, 295684, 305692, 317616, 335787, 343720, 375031, 379702, 406229,
  414884, 417432, 432186, 460931, 486602, 521300, 556222, 569146, 572402,
  605288, 655542, 668069, 678796, 711752, 712646, 714297, 717160, 717952,
  731873, 739379, 742861, 749905, 750294, 774986, 776939, 780731, 788027,
  796520, 801647, 804633, 807987, 836827, 838513, 839597, 856823, 880667,
  882752, 887663, 893444, 894275, 899508, 901267, 915148, 918813, 925782,
  932136, 940356, 962305, 981377, 983599, 986128, 998860, 1025547, 1030450,
  1048894, 1067615, 1085073, 1089415, 1090676, 1091685, 1104071, 1107025,
  1109875, 1116088, 1130207, 1130729, 1133668, 1134224, 1139653, 1140132,
  1140450, 1147667, 1150938, 1157800, 1166136, 1173282, 1177353, 1194041,
  1196878, 1209841, 1239727, 1251198, 1256558, 1257117, 1258610, 1296151,
  1318873, 1330143, 1330343, 1331430, 1331555, 1334758, 1350580, 1351128,
  1352609, 1363391, 1363937, 1365302, 1365887, 1367866, 1371009, 1371250,
  1371804, 1373948, 1374910, 1374981, 1380370, 1383354, 1383380, 1386620,
  1388092, 1389170, 1390801, 1391573, 1393113, 1393228, 1393694, 1394425,
  1413464, 1418625, 1420358, 1420457, 1420870, 1425551, 1425809, 1429204,
  1430789, 1432792, 1433506, 1434500, 1437504, 1440590, 1442952, 1445622,
  1446920, 1461786, 1462438, 1470572, 1470824, 1472773, 1472819, 1476582,
  1491748, 1492481, 1505300, 1523944, 1537542, 1541768, 1551622, 1557728,
  1566072, 1579123, 1592179, 1593817, 1603742, 1607859, 1611587, 1617228,
  1631091, 1634078, 1639186, 1641358, 1647048, 1647126, 1649294, 1659829,
  1678283, 1678664, 1686851, 1687654, 1688242, 1689317, 1694044, 1695033,
  1696287, 1697429, 1703120, 1704940, 1705374, 1710399, 1711344, 1713753,
  1722534, 1723773, 1734061, 1749289, 1752212, 1758758, 1765208, 1792653,
  3299108, 3300700, 3315003, 3324295, 3331583, 3366571, 3366843, 3367110,
  3380782, 3383807, 3384320, 3384623, 3400345, 3400484, 3415043, 3416404,
  3418610, 3420362, 3420714, 3420962, 3426579, 3435566, 3436086, 3437121,
  3438686, 3440228, 3441979, 3442711, 3442896, 3447451, 3452447, 3467300,
  3468649, 3476659, 3478043, 3480811, 3483935, 3489553, 3490139, 3496243,
  3498836, 3501232, 3508239, 3510561, 3511109, 3513835, 3514821, 3518632,
  3520033, 3526589, 3532632, 3536156, 3540694, 3543028, 3544593, 3544820,
  3546448, 3548219, 3551056, 3551270, 3555950, 3560303, 3560929, 3562236,
  3562756, 3570252, 3573423, 3573579, 3577862, 3581250, 3582642, 3583868,
  3584978, 3585971, 3587636, 3589989, 3591580, 3612245, 3615939, 3619463,
  3620836, 3621602, 3622327, 3623703, 3626873, 3627742, 3627787, 3628244,
  3629761, 3639862, 3640571, 3640580, 3643372, 3650790, 3651714, 3652969,
  3653993, 3654636, 3655002, 3655310, 3656419, 3656902, 3656938, 3658622,
  3658967, 3659286, 3663077, 3663360, 3665786, 3665816, 3674527, 3674820,
  3674859, 3679452, 3679725, 3682860, 3686596, 3687452, 3697067, 3699962,
  3701663, 3704870, 3705428, 3707317, 3708531, 3710450, 3713883, 3719311,
  3719663, 3727264, 3736095, 3740211, 3743982, 3746683, 3748168, 3753259,
  3754380, 3757789, 3760144, 3760214, 3766169, 3770812, 3774123, 3777999,
  3780396, 3787808, 3789717, 3791276, 3796382, 3802702, 3804604, 3806426,
  3808524, 3810041, 3811477, 3811509, 3812041, 3813345, 3819456, 3828533,
  3833747, 3834232, 3842100, 3844679, 3846627, 3852648, 3853319, 3854055,
  3856898, 3868671, 3870152, 3870273, 3873120, 3876002, 3881127, 3882693,
  3886700, 3888865, 3888888, 3890749, 3893420, 3898151, 3898961, 3899493,
  3901563, 3906007, 3909222, 3912834, 3917911, 3918969, 3924502, 3926913,
  3932325, 3933837, 3934435, 3937851, 3943532, 3947363, 3948628, 3955299,
  3958976, 3962964, 3963855, 3965156, 3966824, 3978855, 3979963, 3986884,
  3993904, 3996848, 4011037, 4013448, 4014506, 4015227, 4019042, 4025816,
  4029483, 4054748, 4068409, 4074117, 4075678, 4079217, 4092118, 4096306,
  4113694, 4114162, 4129484, 4132197, 4135200, 4149185, 4150059, 4150339,
  4153076, 4162041, 4162923, 4163405, 4177764, 4185602, 4191899, 4196594,
  4197014, 4197525, 4202448, 4206004, 4210088, 4216124, 4216455, 4228973,
  4231626, 4232813, 4238664, 4239028, 4240510, 4242107, 4242336, 4247942,
  4258295, 4265017, 4266988, 4269355, 4270789, 4280152, 4283735, 4285851,
  4322663, 4328582, 4329185, 4329926, 4337085, 4339540, 4340859, 4343852,
  4347124, 4354861, 4363252, 4369619, 4377962, 4379076, 4390171, 4393747,
  4398193, 4398235, 4406146, 4407107, 4408174, 4411650, 4421318, 4428125,
  4430865, 4441914, 4449893, 4490847, 4490979, 4503522, 4507252, 4535636,
  4552375, 4607409, 4610939, 4624066, 4639935, 4648829, 4652388, 4654639,
  4682470, 4692440, 4710422, 4741786, 4750991, 4767050, 4771272, 4779710,
  4780430, 4782804, 4792948, 4800534, 4803182, 4819962, 4827477, 4840369,
  4860693, 4866231, 4878009, 4885817, 4886550, 4894861, 4917237, 4921067,
  4941707, 4943967, 4956777, 4973250, 4991254, 5005188, 5005558, 5024113,
  5025306, 5032813, 5068351, 5074008, 5088355, 5099405, 5119937, 5145087,
  5157271, 5214893, 5251440, 5278575, 5289741, 5299200, 5309789, 5319741,
  5336946, 5351627, 5365502, 5369405, 5419144, 5456547, 5467813, 5471327,
  5475099, 5515465, 5534591, 5549178, 5550947, 5589166, 5620662, 5622281,
  5656801, 5674659, 5698585, 5705855, 5707162, 5716137, 5734445, 5746289,
  5798273, 5808229, 5852265, 5901192, 5936939, 5938375, 6017044, 6029263,
  6040682, 6047036, 6049344, 6062129, 6062283, 6072696, 6102993, 6106684,
  6127256, 6144896, 6168746, 6172524, 6182648, 6185097, 6188941, 6199338,
  6200813, 6207101, 6256965, 6281813, 6282620, 6283510, 6294331, 6306117,
  6308472, 6322682, 6330614, 6339127, 6340652, 6341344, 6347815, 6354454,
  6357904, 6364317, 6366538, 6370472, 6383000, 6435976, 6445080, 6465468,
  6465768, 6476382, 6480885, 6488325, 6488975, 6542241, 6544999, 6555261,
  6556004, 6635112, 6653454, 6667893, 6693329, 6731279, 6738476, 6747584,
  6753553, 6763877, 6768372, 6800434, 6805765, 6820349, 6869487, 6878536,
  6895846, 6919122, 6932913, 6947389, 6954979, 6973044, 6983097, 7023464,
  7029737, 7052951, 7064309, 7065593, 7068751, 7072884, 7088886, 7093348,
  7095072, 7125822, 7129738, 7132831, 7147520, 7148557, 7186718, 7231737,
  7235218, 7248929, 7289434, 7332458, 7359413, 7373119, 7384480, 7394977,
  7399933, 7419361, 7423406, 7453202, 7460131, 7466873, 7477088, 7485832,
  7494114, 7502335, 7502412, 7509509, 7515326, 7537920, 7549146, 7565666,
  7584703, 7618050, 7624276, 7630180, 7660291, 7665700, 7675519, 7680264,
  7689417, 7699763, 7708706, 7712084, 7730037, 7736926, 7739214, 7755286,
  7789895, 7790948, 7813572, 7817002, 7833597, 7844684, 7856536, 7858092,
  7881445, 7903690, 7905123, 7919373, 7930936, 7949289, 7965577, 7972392,
  7989923, 8002353, 8027196, 8035031, 8040419, 8045606, 8058682, 8064782,
  8075797, 8093524, 8097532, 8111943, 8119425, 8119936, 8122237, 8145215,
  8152806, 8168900, 8171959, 8176012, 8183595, 8198448, 8201384, 8211484,
  8225913, 8315806, 8324631, 8339718, 8346470, 8351867, 8369108, 8371941,
  8435074, 8446909, 8452428, 8468483, 8518609, 8536175, 8544909, 8544917,
  8560257, 8566936, 8567265, 8601494, 8611126, 8630884, 8631997, 8638581,
  8642124, 8648162, 8657278, 8688968, 8705087, 8710624, 8724918, 8725017,
  8733432, 8744994, 8758339, 8767414, 8769127, 8799425, 8801763, 8808561,
  8838544, 8858585, 8859637, 8864625, 8867654, 8939749, 8959485, 8969318,
  8972858, 9017418, 9017835, 9021935, 9022532, 9037158, 9060040, 9072840,
  9087626, 9094753, 9096450, 9101576, 9182261, 9228928, 9279557, 9281708,
  9299102, 9301760, 9315364, 9324974, 9344315, 9344395, 9344896, 9347742,
  9351912, 9352114, 9360504, 9364410, 9365790, 9371582, 9372220, 9373337,
  9374381, 9405835, 9412700, 9417713, 9422447, 9435773, 9444479, 9456119,
  9458368, 9470698, 9471294, 9480326, 9480654, 9497198, 9524656, 9553304,
  9558480, 9565409, 9571699, 9573512, 9588433, 9606202, 9623870, 9632786,
  9651236, 9660447, 9662053, 9667571, 9669356, 9686854, 9727969, 9740427,
  9745637, 9760850, 9763382, 9765042, 9779194, 9781934, 9782382, 9791977,
  9801742, 9802179, 9808927, 9828022, 9833697, 9838707, 9841070, 9846050,
  9852752, 9855365, 9902757, 9903612, 9907352, 9923883, 9933343, 9939083,
  9954409, 9958621, 9971239, 9971744, 9996330, 9999916, 10005255, 10018520,
  10019404, 10024991, 10029071, 10042921, 10044073, 10053518, 10055197,
  10056668, 10074370, 10079622, 10082737, 10084602, 10095080, 10106939,
  10127785, 10147264, 10152184, 10152955, 10172527, 10194309, 10212750,
  10214503, 10214553, 10214890, 10231404, 10239215, 10249791, 10252243,
  10257799, 10274101, 10308618, 10360026, 10368130, 10372107, 10377443,
  10392979, 10395734, 10410103, 10549481, 10560154, 10649425, 10768926,
  10811246, 10813319, 10879827, 11390727, 11479439, 11498287, 11876808,
  13338774, 14176792,
];
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
      "sp_ml[]": [20000, 50000], // Spotify monthly listeners
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
// Add this at the top of your file, after imports

async function processBatch(
  artists: ChartmetricFilterResponse[]
): Promise<number> {
  let successCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < artists.length; i++) {
    const filterData = artists[i];
    const artistId = filterData.cm_artist;

    console.log(
      `\n[${i + 1}/${artists.length}] Processing artist: ${filterData.name} (ID: ${artistId})`
    );

    // Check if artist already exists in our stored IDs
    if (alreadyStoredIds.includes(parseInt(artistId))) {
      console.log(
        `⏭️  Skipping artist ${artistId} - already stored in database`
      );
      skippedCount++;
      successCount++; // Count as success since it's already in DB
      continue;
    }

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

  console.log(
    `\n📊 Batch Summary: ${successCount} successful, ${skippedCount} skipped (already stored)`
  );
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
