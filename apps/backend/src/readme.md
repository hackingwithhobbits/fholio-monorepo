// ==========================================
// ARTIST SEARCH & DISCOVERY
// ==========================================

// Search for artists
GET /artist/search
Query: q={artist_name}, limit={10}
Use: When artist signs up, find their Chartmetric ID

// Get artist details
GET /artist/{chartmetric_artist_id}
Returns: Name, genres, social media IDs, images

// Get emerging/trending artists
GET /artist/discover/emerging
Returns: Artists with high momentum scores

// ==========================================
// ARTIST STATS
// ==========================================

// Get Spotify stats
GET /artist/{chartmetric_artist_id}/stat/spotify
Query: field={followers|monthly_listeners|popularity}, since={date}
Returns: Historical data points

// Get streaming summary
GET /artist/{chartmetric_artist_id}/spotify-streaming-stats
Returns: Latest followers, monthly listeners, popularity

// Get social media stats
GET /artist/{chartmetric_artist_id}/stat/instagram
GET /artist/{chartmetric_artist_id}/stat/tiktok
GET /artist/{chartmetric_artist_id}/stat/youtube
Query: field={followers|views|engagement}, since={date}

// Get where people listen (geographic)
GET /artist/{chartmetric_artist_id}/where-people-listen
Returns: Top cities/countries for this artist

// ==========================================
// TRACK DATA
// ==========================================

// Get artist's tracks
GET /artist/{chartmetric_artist_id}/tracks/spotify
Returns: All tracks with ISRCs, release dates, album info

// Get track details
GET /track/{chartmetric_track_id}
Returns: Track name, ISRC, genres, release date

// Get track streaming stats
GET /track/{chartmetric_track_id}/spotify-streaming-stats
Query: since={date}
Returns: Daily streams, popularity over time

// ==========================================
// PLAYLISTS
// ==========================================

// Get artist's playlist placements
GET /artist/{chartmetric_artist_id}/playlists/spotify
Returns: All playlists featuring this artist

// Get playlist details
GET /playlist/{chartmetric_playlist_id}
Returns: Playlist name, follower count, curator

// Get playlist timeline (adds/removes)
GET /artist/{chartmetric_artist_id}/playlists/spotify/current
Returns: When tracks were added/removed from playlists

// ==========================================
// CHARTS
// ==========================================

// Get Spotify charts
GET /charts/spotify/top/{country_code}
Query: date={date}, genre={genre}
Returns: Top 200 tracks in that country/genre

// Get viral charts
GET /charts/spotify/viral/{country_code}
Query: date={date}
Returns: Viral 50 tracks

// Get trending artists
GET /charts/spotify/trending/artists
Query: date={date}
Returns: Artists gaining momentum

// ==========================================
// METADATA
// ==========================================

// Get all genres
GET /genres
Returns: List of all genre IDs and names

// Get all countries
GET /countries
Returns: Country codes and names

// ==========================================
// RATE LIMITS (Typical)
// ==========================================
// - 60 requests per minute
// - 1,000 requests per hour  
// - 10,000 requests per day
// (Varies by plan - confirm with Chartmetric)

// 1. Search for artist
GET /artist/search?q={artist_name}
Response: {
"id": "chartmetric_artist_id",
"name": "Artist Name",
"image_url": "...",
"spotify_id": "...",
"genres": ["indie pop", "alternative"]
}

// 2. Get artist's tracks
GET /artist/{chartmetric_artist_id}/tracks/spotify
Response: {
"tracks": [{
"id": "chartmetric_track_id",
"name": "Track Name",
"album": {
"name": "Album Name",
"image_url": "cover_art_url"
},
"release_date": "2024-01-15",
"isrc": "USRC12345678"
}]
}

// 3. Get track streaming stats
GET /track/{chartmetric_track_id}/spotify-streaming-stats
Response: {
"data": [{
"timestp": "2024-10-10",
"spotify_playlist_count": 1500,
"spotify_popularity": 75,
"spotify_streams": 5000000
}]
}

// 4. Get artist streaming stats (for artist-level display)
GET /artist/{chartmetric_artist_id}/spotify-streaming-stats
Response: {
"latest": {
"followers": 250000,
"monthly_listeners": 500000,
"popularity": 72
},
"historical": [...]
}
