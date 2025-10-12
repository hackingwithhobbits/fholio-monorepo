import { AppClient } from "../components/AppClient";

// This could be used for server-side data fetching
async function getInitialData() {
  // Example: fetch user preferences, initial tracks, etc.
  // const userPreferences = await fetchUserPreferences();
  // const featuredTracks = await fetchFeaturedTracks();

  return {
    // userPreferences,
    // featuredTracks,
    initialPage: "landing" as const,
  };
}

export default async function HomePage() {
  // Server-side data fetching
  const initialData = await getInitialData();

  return (
    <div className="min-h-screen bg-background">
      <AppClient initialPage={initialData.initialPage} />
    </div>
  );
}
