export interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  votes: number;
  trending: boolean;
  image: string;
}

export const weeklyTracks: Track[] = [
  // Electronic / EDM (1-15)
  {
    id: 1,
    title: "Neon Nights",
    artist: "Crystal Skies",
    genre: "Electronic",
    votes: 2847,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Midnight Drive",
    artist: "Neon Dreams",
    genre: "Electronic",
    votes: 2654,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Electric Soul",
    artist: "Luna Waves",
    genre: "Electronic",
    votes: 2421,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Pulse",
    artist: "Synthwave City",
    genre: "Electronic",
    votes: 2198,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Binary Dreams",
    artist: "Pixel Hearts",
    genre: "Electronic",
    votes: 2054,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Frequency",
    artist: "Digital Rain",
    genre: "Electronic",
    votes: 1987,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Cyber Love",
    artist: "Neon Pulse",
    genre: "Electronic",
    votes: 1876,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Aurora",
    artist: "Skyline Drive",
    genre: "Electronic",
    votes: 1765,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Wavelength",
    artist: "Echo Chamber",
    genre: "Electronic",
    votes: 1654,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    title: "Voltage",
    artist: "Circuit Breaker",
    genre: "Electronic",
    votes: 1543,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    title: "Prism",
    artist: "Light Years",
    genre: "Electronic",
    votes: 1432,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    title: "Spectrum",
    artist: "Color Theory",
    genre: "Electronic",
    votes: 1321,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
  },
  {
    id: 13,
    title: "Digital Heart",
    artist: "Cyber Souls",
    genre: "Electronic",
    votes: 1210,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop",
  },
  {
    id: 14,
    title: "Glitch",
    artist: "Error 404",
    genre: "Electronic",
    votes: 1099,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  },
  {
    id: 15,
    title: "Neon Paradise",
    artist: "Future Shock",
    genre: "Electronic",
    votes: 988,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop",
  },

  // Hip-Hop / Rap (16-30)
  {
    id: 16,
    title: "Crown",
    artist: "Royal Flush",
    genre: "Hip-Hop",
    votes: 2932,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
  },
  {
    id: 17,
    title: "Empire State",
    artist: "Big City Dreams",
    genre: "Hip-Hop",
    votes: 2765,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&h=400&fit=crop",
  },
  {
    id: 18,
    title: "Hustle",
    artist: "Grind Mode",
    genre: "Hip-Hop",
    votes: 2543,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=400&fit=crop",
  },
  {
    id: 19,
    title: "Gold Chains",
    artist: "Lux Life",
    genre: "Hip-Hop",
    votes: 2398,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
  },
  {
    id: 20,
    title: "Flex",
    artist: "Young Mogul",
    genre: "Hip-Hop",
    votes: 2187,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1549834125-82d3c48159a3?w=400&h=400&fit=crop",
  },
  {
    id: 21,
    title: "Street Dreams",
    artist: "Urban Legend",
    genre: "Hip-Hop",
    votes: 2054,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 22,
    title: "No Sleep",
    artist: "Night Shift",
    genre: "Hip-Hop",
    votes: 1943,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 23,
    title: "Victory Lap",
    artist: "Champion",
    genre: "Hip-Hop",
    votes: 1832,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 24,
    title: "Elevate",
    artist: "Rise Up",
    genre: "Hip-Hop",
    votes: 1721,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
  {
    id: 25,
    title: "Boss Moves",
    artist: "CEO Mentality",
    genre: "Hip-Hop",
    votes: 1610,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
  },
  {
    id: 26,
    title: "Drip",
    artist: "Fashion Killa",
    genre: "Hip-Hop",
    votes: 1499,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  },
  {
    id: 27,
    title: "Sauce",
    artist: "Flavor Gang",
    genre: "Hip-Hop",
    votes: 1388,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=400&h=400&fit=crop",
  },
  {
    id: 28,
    title: "Vibes",
    artist: "Good Energy",
    genre: "Hip-Hop",
    votes: 1277,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop",
  },
  {
    id: 29,
    title: "Paper Route",
    artist: "Money Moves",
    genre: "Hip-Hop",
    votes: 1166,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 30,
    title: "Momentum",
    artist: "Wave Rider",
    genre: "Hip-Hop",
    votes: 1055,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
  },

  // Pop (31-45)
  {
    id: 31,
    title: "Heartbeat",
    artist: "Summer Grace",
    genre: "Pop",
    votes: 2898,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  },
  {
    id: 32,
    title: "Dancing in the Rain",
    artist: "Poppy Lane",
    genre: "Pop",
    votes: 2687,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 33,
    title: "Starlight",
    artist: "Luna Belle",
    genre: "Pop",
    votes: 2476,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: 34,
    title: "Forever Young",
    artist: "Timeless",
    genre: "Pop",
    votes: 2265,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 35,
    title: "Sweet Dreams",
    artist: "Melody Rose",
    genre: "Pop",
    votes: 2154,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 36,
    title: "Butterfly",
    artist: "Sky Blue",
    genre: "Pop",
    votes: 2043,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
  {
    id: 37,
    title: "Golden Hour",
    artist: "Sunset Dreams",
    genre: "Pop",
    votes: 1932,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
  },
  {
    id: 38,
    title: "Paradise",
    artist: "Island Vibes",
    genre: "Pop",
    votes: 1821,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  },
  {
    id: 39,
    title: "Magic",
    artist: "Wonder Girl",
    genre: "Pop",
    votes: 1710,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=400&h=400&fit=crop",
  },
  {
    id: 40,
    title: "Runaway",
    artist: "Free Spirit",
    genre: "Pop",
    votes: 1599,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop",
  },
  {
    id: 41,
    title: "Wildflower",
    artist: "Garden Party",
    genre: "Pop",
    votes: 1488,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 42,
    title: "Sunshine",
    artist: "Happy Days",
    genre: "Pop",
    votes: 1377,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
  },
  {
    id: 43,
    title: "Crystal Clear",
    artist: "Pure Tone",
    genre: "Pop",
    votes: 1266,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop",
  },
  {
    id: 44,
    title: "Moonlight",
    artist: "Night Sky",
    genre: "Pop",
    votes: 1155,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  },
  {
    id: 45,
    title: "Echo",
    artist: "Reverb",
    genre: "Pop",
    votes: 1044,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop",
  },

  // Rock (46-60)
  {
    id: 46,
    title: "Thunder Road",
    artist: "Storm Chasers",
    genre: "Rock",
    votes: 2654,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
  },
  {
    id: 47,
    title: "Rebel Heart",
    artist: "Wild Ones",
    genre: "Rock",
    votes: 2443,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  },
  {
    id: 48,
    title: "Fire and Ice",
    artist: "Voltage",
    genre: "Rock",
    votes: 2332,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 49,
    title: "Hurricane",
    artist: "Category 5",
    genre: "Rock",
    votes: 2221,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: 50,
    title: "Iron Will",
    artist: "Steel Heart",
    genre: "Rock",
    votes: 2110,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 51,
    title: "Avalanche",
    artist: "Mountain Peak",
    genre: "Rock",
    votes: 1999,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 52,
    title: "Blackout",
    artist: "Power Surge",
    genre: "Rock",
    votes: 1888,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
  {
    id: 53,
    title: "Revolution",
    artist: "The Uprising",
    genre: "Rock",
    votes: 1777,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
  },
  {
    id: 54,
    title: "Warrior",
    artist: "Battle Born",
    genre: "Rock",
    votes: 1666,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  },
  {
    id: 55,
    title: "Phoenix Rising",
    artist: "From Ashes",
    genre: "Rock",
    votes: 1555,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=400&h=400&fit=crop",
  },
  {
    id: 56,
    title: "Demolition",
    artist: "Wrecking Crew",
    genre: "Rock",
    votes: 1444,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop",
  },
  {
    id: 57,
    title: "Shockwave",
    artist: "Sonic Boom",
    genre: "Rock",
    votes: 1333,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 58,
    title: "Riot",
    artist: "Chaos Theory",
    genre: "Rock",
    votes: 1222,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
  },
  {
    id: 59,
    title: "Bulletproof",
    artist: "Armor Up",
    genre: "Rock",
    votes: 1111,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop",
  },
  {
    id: 60,
    title: "Inferno",
    artist: "Blaze",
    genre: "Rock",
    votes: 1000,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  },

  // R&B / Soul (61-70)
  {
    id: 61,
    title: "Velvet Touch",
    artist: "Smooth Operator",
    genre: "R&B",
    votes: 2576,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
  },
  {
    id: 62,
    title: "Silk Sheets",
    artist: "Midnight Lover",
    genre: "R&B",
    votes: 2365,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&h=400&fit=crop",
  },
  {
    id: 63,
    title: "Brown Sugar",
    artist: "Sweet Soul",
    genre: "R&B",
    votes: 2154,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=400&fit=crop",
  },
  {
    id: 64,
    title: "Purple Rain",
    artist: "Royal Velvet",
    genre: "R&B",
    votes: 1943,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
  },
  {
    id: 65,
    title: "Soul Glow",
    artist: "Radiance",
    genre: "R&B",
    votes: 1832,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1549834125-82d3c48159a3?w=400&h=400&fit=crop",
  },
  {
    id: 66,
    title: "Honeydew",
    artist: "Sweet Melody",
    genre: "R&B",
    votes: 1721,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 67,
    title: "Twilight",
    artist: "Dusk till Dawn",
    genre: "R&B",
    votes: 1610,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 68,
    title: "Slow Motion",
    artist: "Time Freeze",
    genre: "R&B",
    votes: 1499,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 69,
    title: "Champagne Nights",
    artist: "Bubbly",
    genre: "R&B",
    votes: 1388,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
  {
    id: 70,
    title: "Satin Dreams",
    artist: "Luxury Life",
    genre: "R&B",
    votes: 1277,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
  },

  // Indie / Alternative (71-85)
  {
    id: 71,
    title: "Ghost Town",
    artist: "Empty Streets",
    genre: "Indie",
    votes: 2498,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  },
  {
    id: 72,
    title: "Ocean Eyes",
    artist: "Coastal Drift",
    genre: "Indie",
    votes: 2287,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=400&h=400&fit=crop",
  },
  {
    id: 73,
    title: "Cigarette Daydreams",
    artist: "Smoky Room",
    genre: "Indie",
    votes: 2176,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop",
  },
  {
    id: 74,
    title: "Vintage Heart",
    artist: "Retro Soul",
    genre: "Indie",
    votes: 2065,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 75,
    title: "Coffee & Poetry",
    artist: "Café Noir",
    genre: "Indie",
    votes: 1954,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
  },
  {
    id: 76,
    title: "Wanderlust",
    artist: "Nomad Dreams",
    genre: "Indie",
    votes: 1843,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop",
  },
  {
    id: 77,
    title: "Melancholy",
    artist: "Blue Monday",
    genre: "Indie",
    votes: 1732,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  },
  {
    id: 78,
    title: "Polaroid",
    artist: "Instant Memory",
    genre: "Indie",
    votes: 1621,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop",
  },
  {
    id: 79,
    title: "Autumn Leaves",
    artist: "Season Change",
    genre: "Indie",
    votes: 1510,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
  },
  {
    id: 80,
    title: "Bicycle",
    artist: "Sunday Ride",
    genre: "Indie",
    votes: 1399,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&h=400&fit=crop",
  },
  {
    id: 81,
    title: "Telescope",
    artist: "Star Gazer",
    genre: "Alternative",
    votes: 1288,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=400&fit=crop",
  },
  {
    id: 82,
    title: "Concrete Jungle",
    artist: "Urban Jungle",
    genre: "Alternative",
    votes: 1177,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
  },
  {
    id: 83,
    title: "Analog",
    artist: "Old School",
    genre: "Alternative",
    votes: 1066,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1549834125-82d3c48159a3?w=400&h=400&fit=crop",
  },
  {
    id: 84,
    title: "Basement Tapes",
    artist: "Underground Sound",
    genre: "Alternative",
    votes: 955,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 85,
    title: "Static",
    artist: "White Noise",
    genre: "Alternative",
    votes: 844,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },

  // Jazz / Neo-Soul (86-93)
  {
    id: 86,
    title: "Blue Note",
    artist: "Jazz Cats",
    genre: "Jazz",
    votes: 2420,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: 87,
    title: "Satin Doll",
    artist: "Smooth Jazz Trio",
    genre: "Jazz",
    votes: 2209,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
  },
  {
    id: 88,
    title: "Midnight Express",
    artist: "Late Night Sessions",
    genre: "Jazz",
    votes: 1998,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
  },
  {
    id: 89,
    title: "Cool Breeze",
    artist: "Summer Jazz",
    genre: "Jazz",
    votes: 1787,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  },
  {
    id: 90,
    title: "Velvet Lounge",
    artist: "The Sophisticates",
    genre: "Jazz",
    votes: 1676,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=400&h=400&fit=crop",
  },
  {
    id: 91,
    title: "Bourbon Street",
    artist: "NOLA Vibes",
    genre: "Jazz",
    votes: 1565,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop",
  },
  {
    id: 92,
    title: "Manhattan Nights",
    artist: "City Lights",
    genre: "Jazz",
    votes: 1454,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 93,
    title: "Skyline",
    artist: "Penthouse Suite",
    genre: "Jazz",
    votes: 1343,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
  },

  // Bonus Tracks (94-100)
  {
    id: 94,
    title: "Gravity",
    artist: "Free Fall",
    genre: "Alternative",
    votes: 1232,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop",
  },
  {
    id: 95,
    title: "Euphoria",
    artist: "Cloud Nine",
    genre: "Electronic",
    votes: 1121,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  },
  {
    id: 96,
    title: "Karma",
    artist: "Full Circle",
    genre: "Hip-Hop",
    votes: 1010,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop",
  },
  {
    id: 97,
    title: "Mirage",
    artist: "Desert Dreams",
    genre: "Indie",
    votes: 899,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
  },
  {
    id: 98,
    title: "Obsidian",
    artist: "Dark Matter",
    genre: "Rock",
    votes: 788,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&h=400&fit=crop",
  },
  {
    id: 99,
    title: "Serenity",
    artist: "Peaceful Mind",
    genre: "Pop",
    votes: 677,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=400&fit=crop",
  },
  {
    id: 100,
    title: "Zenith",
    artist: "Peak Performance",
    genre: "Electronic",
    votes: 566,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
  },
];
