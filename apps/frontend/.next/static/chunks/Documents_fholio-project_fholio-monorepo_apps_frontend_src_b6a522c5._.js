(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/data/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "artists",
    ()=>artists,
    "fanPoolData",
    ()=>fanPoolData,
    "faqs",
    ()=>faqs,
    "payoutHistory",
    ()=>payoutHistory,
    "socialStats",
    ()=>socialStats,
    "sponsors",
    ()=>sponsors,
    "topFans",
    ()=>topFans,
    "userPortfolio",
    ()=>userPortfolio
]);
// Helper to determine league tier
const getLeagueTier = (listeners, followers)=>{
    return listeners > 100000 || followers > 20000 ? "Major" : "Minor";
};
const artists = [
    {
        id: "1",
        name: "Aiko Blaze",
        genre: "Pop",
        score: 98.7,
        change: 5.2,
        imageUrl: "https://images.unsplash.com/photo-1596391124253-68a9733e4932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBuZW9ufGVufDF8fHx8MTc2MTcxMTcyMHww&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 12847,
        streams: 8500000,
        engagement: 95,
        votes: 98,
        growth: 12,
        weeklyHistory: [
            78,
            82,
            85,
            89,
            92,
            95,
            98.7
        ],
        bio: "Rising pop sensation known for electrifying performances and chart-topping hits.",
        monthlyListeners: 425000,
        instagramFollowers: 87000,
        location: "Los Angeles, CA",
        status: "Hot Streak",
        weeklyTrack: "Neon Dreams",
        league: "Major",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com",
            tiktok: "https://tiktok.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "2",
        name: "Nova Red",
        genre: "Hip-Hop",
        score: 94.3,
        change: 3.8,
        imageUrl: "https://images.unsplash.com/photo-1645305783467-1f78f9b984ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcmFwcGVyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYxNzExNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 10523,
        streams: 7200000,
        engagement: 92,
        votes: 94,
        growth: 8,
        weeklyHistory: [
            75,
            79,
            84,
            87,
            90,
            92,
            94.3
        ],
        bio: "Groundbreaking hip-hop artist with a unique sound and powerful lyrics.",
        monthlyListeners: 312000,
        instagramFollowers: 52000,
        location: "Atlanta, GA",
        status: "Rising",
        weeklyTrack: "City Lights",
        league: "Major",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "3",
        name: "The Radiants",
        genre: "Alt Rock",
        score: 89.2,
        change: -1.5,
        imageUrl: "https://images.unsplash.com/photo-1616688920494-6758cf681803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYmFuZCUyMGNvbmNlcnR8ZW58MXx8fHwxNzYxNjc2NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 9876,
        streams: 6800000,
        engagement: 88,
        votes: 89,
        growth: -2,
        weeklyHistory: [
            82,
            85,
            88,
            90,
            92,
            90.7,
            89.2
        ],
        bio: "Indie rock band bringing raw energy and unforgettable riffs to the stage.",
        monthlyListeners: 185000,
        instagramFollowers: 34000,
        location: "Brooklyn, NY",
        status: "Stable",
        weeklyTrack: "Electric Soul",
        league: "Major",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "4",
        name: "Stellar Waves",
        genre: "Electronic",
        score: 87.5,
        change: 4.2,
        imageUrl: "https://images.unsplash.com/photo-1692176548571-86138128e36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBkanxlbnwxfHx8fDE3NjE2NTIxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 8234,
        streams: 5900000,
        engagement: 86,
        votes: 88,
        growth: 6,
        weeklyHistory: [
            72,
            76,
            79,
            82,
            84,
            85,
            87.5
        ],
        bio: "Electronic music producer creating immersive soundscapes and festival anthems.",
        monthlyListeners: 267000,
        instagramFollowers: 28000,
        location: "London, UK",
        status: "Rising",
        weeklyTrack: "Pulse",
        league: "Major",
        socialLinks: {
            spotify: "https://spotify.com",
            tiktok: "https://tiktok.com"
        }
    },
    {
        id: "5",
        name: "Luna Echo",
        genre: "Indie",
        score: 85.1,
        change: 2.3,
        imageUrl: "https://images.unsplash.com/photo-1512153129600-528cae82b06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGFydGlzdCUyMGd1aXRhcnxlbnwxfHx8fDE3NjE2Mzk0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 7652,
        streams: 4800000,
        engagement: 84,
        votes: 86,
        growth: 4,
        weeklyHistory: [
            70,
            73,
            77,
            80,
            82,
            83,
            85.1
        ],
        bio: "Indie singer-songwriter with haunting melodies and poetic storytelling.",
        monthlyListeners: 142000,
        instagramFollowers: 19500,
        location: "Portland, OR",
        status: "Trending",
        weeklyTrack: "Moonlight",
        league: "Major",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "6",
        name: "Phoenix Rise",
        genre: "R&B",
        score: 82.9,
        change: 1.8,
        imageUrl: "https://images.unsplash.com/photo-1566477712363-3c75dd39b416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBzdGFyJTIwc3RhZ2V8ZW58MXx8fHwxNzYxNjA3MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 6843,
        streams: 4200000,
        engagement: 81,
        votes: 83,
        growth: 3,
        weeklyHistory: [
            68,
            72,
            75,
            78,
            80,
            81,
            82.9
        ],
        bio: "Soulful R&B artist with smooth vocals and infectious rhythms.",
        monthlyListeners: 98000,
        instagramFollowers: 15000,
        location: "Chicago, IL",
        status: "Stable",
        weeklyTrack: "Velvet Nights",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com"
        }
    },
    {
        id: "7",
        name: "Violet Storm",
        genre: "EDM",
        score: 79.4,
        change: 6.7,
        imageUrl: "https://images.unsplash.com/photo-1598387846279-b8b5e470b7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkaiUyMG5lb258ZW58MXx8fHwxNzMwMzI2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 5234,
        streams: 3200000,
        engagement: 78,
        votes: 80,
        growth: 9,
        weeklyHistory: [
            58,
            62,
            67,
            71,
            74,
            76,
            79.4
        ],
        bio: "Festival-ready EDM producer with explosive drops and mesmerizing visuals.",
        monthlyListeners: 87000,
        instagramFollowers: 12000,
        location: "Miami, FL",
        status: "Hot Streak",
        weeklyTrack: "Thunder",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            tiktok: "https://tiktok.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "8",
        name: "Midnight Poets",
        genre: "Alternative",
        score: 76.2,
        change: 8.9,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGJhbmQlMjBsaXZlfGVufDF8fHx8MTczMDMyNjQwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 4521,
        streams: 2100000,
        engagement: 75,
        votes: 77,
        growth: 11,
        weeklyHistory: [
            52,
            57,
            62,
            66,
            70,
            73,
            76.2
        ],
        bio: "Alternative band crafting atmospheric soundscapes and introspective lyrics.",
        monthlyListeners: 65000,
        instagramFollowers: 8500,
        location: "Seattle, WA",
        status: "Rising",
        weeklyTrack: "Stargazer",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "9",
        name: "Jade Rivers",
        genre: "Pop",
        score: 73.8,
        change: 4.3,
        imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBwZXJmb3JtaW5nfGVufDF8fHx8MTczMDMyNjQwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 3892,
        streams: 1800000,
        engagement: 72,
        votes: 74,
        growth: 5,
        weeklyHistory: [
            56,
            60,
            64,
            67,
            70,
            72,
            73.8
        ],
        bio: "Emerging pop artist with catchy hooks and relatable storytelling.",
        monthlyListeners: 54000,
        instagramFollowers: 11000,
        location: "Nashville, TN",
        status: "New Entrant",
        weeklyTrack: "Better Days",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            tiktok: "https://tiktok.com"
        }
    },
    {
        id: "10",
        name: "Cipher",
        genre: "Hip-Hop",
        score: 71.5,
        change: 12.1,
        imageUrl: "https://images.unsplash.com/photo-1571609191277-4e2d9e4b5e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBzdHVkaW98ZW58MXx8fHwxNzMwMzI2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 3124,
        streams: 1200000,
        engagement: 70,
        votes: 72,
        growth: 15,
        weeklyHistory: [
            42,
            48,
            54,
            59,
            64,
            68,
            71.5
        ],
        bio: "Underground hip-hop talent with sharp wordplay and authentic flow.",
        monthlyListeners: 38000,
        instagramFollowers: 6800,
        location: "Detroit, MI",
        status: "Hot Streak",
        weeklyTrack: "Street Code",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "11",
        name: "Scarlett Haze",
        genre: "Pop",
        score: 68.9,
        change: 3.2,
        imageUrl: "https://images.unsplash.com/photo-1563681543778-002ee8f3cd8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBjb25jZXJ0fGVufDF8fHx8MTc2MTg1NzQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 2876,
        streams: 980000,
        engagement: 68,
        votes: 69,
        growth: 4,
        weeklyHistory: [
            51,
            55,
            59,
            62,
            65,
            67,
            68.9
        ],
        bio: "Dynamic pop artist with powerful vocals and stadium-worthy anthems.",
        monthlyListeners: 42000,
        instagramFollowers: 9200,
        location: "Toronto, ON",
        status: "Rising",
        weeklyTrack: "Gravity",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            tiktok: "https://tiktok.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "12",
        name: "The Solstice",
        genre: "Alternative",
        score: 65.4,
        change: -0.8,
        imageUrl: "https://images.unsplash.com/photo-1693835777292-cf103dcd2324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZ3VpdGFyaXN0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NjE4NTc0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 2543,
        streams: 850000,
        engagement: 65,
        votes: 66,
        growth: -1,
        weeklyHistory: [
            60,
            63,
            65,
            67,
            66,
            66.2,
            65.4
        ],
        bio: "Atmospheric alternative rock with haunting guitar work and ethereal soundscapes.",
        monthlyListeners: 35000,
        instagramFollowers: 7100,
        location: "Austin, TX",
        status: "Stable",
        weeklyTrack: "Eclipse",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com"
        }
    },
    {
        id: "13",
        name: "Rhythm Nation",
        genre: "R&B",
        score: 62.7,
        change: 5.8,
        imageUrl: "https://images.unsplash.com/photo-1687585612299-1f0e727b6f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtbWVyJTIwbGl2ZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MTg1NzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 2198,
        streams: 720000,
        engagement: 62,
        votes: 63,
        growth: 7,
        weeklyHistory: [
            45,
            49,
            53,
            56,
            59,
            61,
            62.7
        ],
        bio: "Groove-heavy R&B collective blending classic soul with modern production.",
        monthlyListeners: 29000,
        instagramFollowers: 5900,
        location: "Oakland, CA",
        status: "Trending",
        weeklyTrack: "Smooth Operator",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            instagram: "https://instagram.com"
        }
    },
    {
        id: "14",
        name: "Sax & the City",
        genre: "Jazz",
        score: 59.3,
        change: 2.1,
        imageUrl: "https://images.unsplash.com/photo-1687589891886-a8578a54ef76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWNpYW4lMjBzYXhvcGhvbmV8ZW58MXx8fHwxNzYxODE5OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 1987,
        streams: 610000,
        engagement: 59,
        votes: 60,
        growth: 3,
        weeklyHistory: [
            48,
            51,
            54,
            56,
            57,
            58,
            59.3
        ],
        bio: "Modern jazz quartet bringing bebop energy to the contemporary scene.",
        monthlyListeners: 24000,
        instagramFollowers: 4200,
        location: "New Orleans, LA",
        status: "New Entrant",
        weeklyTrack: "Blue Monday",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            apple: "https://music.apple.com"
        }
    },
    {
        id: "15",
        name: "Dusty Trails",
        genre: "Country",
        score: 56.8,
        change: 7.4,
        imageUrl: "https://images.unsplash.com/photo-1740689050594-3df494210843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5JTIwc2luZ2VyJTIwc3RhZ2V8ZW58MXx8fHwxNzYxODU3NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        fanBackers: 1765,
        streams: 520000,
        engagement: 56,
        votes: 57,
        growth: 9,
        weeklyHistory: [
            38,
            42,
            46,
            49,
            52,
            54,
            56.8
        ],
        bio: "Heartland country with honest storytelling and authentic twang.",
        monthlyListeners: 21000,
        instagramFollowers: 3800,
        location: "Nashville, TN",
        status: "Hot Streak",
        weeklyTrack: "Back Roads",
        league: "Minor",
        socialLinks: {
            spotify: "https://spotify.com",
            tiktok: "https://tiktok.com"
        }
    }
];
const userPortfolio = {
    artists: [
        artists[0],
        artists[1],
        artists[3],
        artists[4],
        artists[5]
    ],
    totalScore: 447.5,
    weeklyEarnings: 127.5,
    lifetimeEarnings: 1834.25,
    tier: "Gold",
    rank: 342,
    referralCount: 7,
    referralBonus: 35.0
};
const fanPoolData = {
    totalPool: 850000,
    artistPool: 510000,
    fanShare: 127500,
    platform: 170000,
    bonusEvents: 42500
};
const payoutHistory = [
    {
        week: "Oct 21-27, 2025",
        amount: 127.5,
        artists: [
            "Aiko Blaze",
            "Nova Red",
            "Stellar Waves"
        ]
    },
    {
        week: "Oct 14-20, 2025",
        amount: 95.75,
        artists: [
            "Aiko Blaze",
            "Luna Echo"
        ]
    },
    {
        week: "Oct 7-13, 2025",
        amount: 143.2,
        artists: [
            "Nova Red",
            "Stellar Waves",
            "Phoenix Rise"
        ]
    },
    {
        week: "Sep 30-Oct 6, 2025",
        amount: 88.4,
        artists: [
            "Aiko Blaze",
            "Phoenix Rise"
        ]
    }
];
const faqs = [
    {
        question: "What's the difference between Major and Minor League?",
        answer: "Major League artists have 100K+ monthly Spotify listeners OR 20K+ Instagram followers. Minor League artists are below these thresholds. Both leagues compete separately with their own rewards pools and leaderboards."
    },
    {
        question: "How are artists selected?",
        answer: "Artists are eligible based on streaming platform presence and verified engagement metrics. We track performance across Spotify, Apple Music, TikTok, and Instagram to calculate weekly scores."
    },
    {
        question: "Can I change my Fholio?",
        answer: "Yes! You can adjust your portfolio weekly before Friday lock-in (11:59 PM EST). Once locked, your selections are final for that week's competition."
    },
    {
        question: "When do payouts happen?",
        answer: "Payouts are processed every Monday for the previous week's performance. Funds are credited to your Rewards Wallet and can be withdrawn or reinvested."
    },
    {
        question: "What are the artist rules?",
        answer: "Artists must submit one active track per week. Tracks can be repeated but score decays 10-15% per week to encourage fresh content. No fake streams, botting, or manipulation allowed—violations result in immediate removal."
    },
    {
        question: "How does the referral system work?",
        answer: "Invite friends to join Fholio and earn a 5% bonus on their weekly activity. Your referrals also get a sign-up bonus. More referrals = higher tier multipliers."
    },
    {
        question: "Is this available globally?",
        answer: "Fholio is currently available in the United States, Canada, and the United Kingdom. We're expanding to additional markets throughout 2025."
    },
    {
        question: "How is this different from gambling?",
        answer: "Fholio is a skill-based fantasy league, not gambling. Your success depends on music knowledge, artist research, and strategic portfolio building—similar to fantasy sports. There are no odds, no house edge, and no chance-based outcomes."
    }
];
const socialStats = {
    artistsJoinedThisWeek: 127,
    fanLineupsCreated: 3842,
    moneyDistributed: 284500,
    totalMembers: 18234
};
const topFans = [
    {
        id: "1",
        name: "Alex Chen",
        city: "San Francisco",
        earnings: 423.5,
        rank: 1,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
    },
    {
        id: "2",
        name: "Jordan Taylor",
        city: "New York",
        earnings: 387.25,
        rank: 2,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
        id: "3",
        name: "Sam Rivera",
        city: "Los Angeles",
        earnings: 352.8,
        rank: 3,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100"
    },
    {
        id: "4",
        name: "Casey Morgan",
        city: "Chicago",
        earnings: 318.4,
        rank: 4,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    {
        id: "5",
        name: "Riley Brooks",
        city: "Austin",
        earnings: 295.75,
        rank: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    }
];
const sponsors = [
    {
        id: "1",
        name: "Spotify",
        logo: "🎵",
        type: "brand"
    },
    {
        id: "2",
        name: "Red Bull",
        logo: "🔴",
        type: "brand"
    },
    {
        id: "3",
        name: "Coachella",
        logo: "🎪",
        type: "festival"
    },
    {
        id: "4",
        name: "Atlantic Records",
        logo: "💿",
        type: "label"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient,
    "apiFetch",
    ()=>apiFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/next@15.5.2_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$1$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/axios@1.13.1/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// API Configuration
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3001/api/v1") || "http://localhost:3001/api/v1";
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$1$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
});
// Request interceptor
apiClient.interceptors.request.use((config)=>{
    // Add auth token if available
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    // Add user ID for development (replace with proper auth later)
    const userId = localStorage.getItem("user_id");
    if (userId) {
        config.headers["x-user-id"] = userId;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor
apiClient.interceptors.response.use((response)=>response.data, (error)=>{
    var _error_response_data_error, _error_response_data, _error_response, _error_response1, _error_config, _error_response2, _error_response_data_error1, _error_response_data1, _error_response3;
    // Handle errors consistently
    const errorMessage = ((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : (_error_response_data_error = _error_response_data.error) === null || _error_response_data_error === void 0 ? void 0 : _error_response_data_error.message) || error.message || "An error occurred";
    console.error("API Error:", {
        status: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.status,
        message: errorMessage,
        url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url
    });
    return Promise.reject({
        message: errorMessage,
        status: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.status,
        code: (_error_response3 = error.response) === null || _error_response3 === void 0 ? void 0 : (_error_response_data1 = _error_response3.data) === null || _error_response_data1 === void 0 ? void 0 : (_error_response_data_error1 = _error_response_data1.error) === null || _error_response_data_error1 === void 0 ? void 0 : _error_response_data_error1.code
    });
});
async function apiFetch(endpoint, config) {
    return apiClient.request({
        url: endpoint,
        ...config
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/artist.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "artistService",
    ()=>artistService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/client.ts [app-client] (ecmascript)");
;
const artistService = {
    /**
   * Get all artists with filters
   */ async getArtists (params) {
        const searchParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach((param)=>{
                let [key, value] = param;
                if (value !== undefined) {
                    searchParams.append(key, String(value));
                }
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/artists?".concat(searchParams.toString()));
    },
    /**
   * Get single artist by ID
   */ async getArtistById (id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/artists/".concat(id));
    },
    /**
   * Get artist performance history
   */ async getArtistPerformance (id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/artists/".concat(id, "/performance"));
    },
    /**
   * Get trending artists
   */ async getTrending () {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/artists/trending?limit=".concat(limit));
    },
    /**
   * Get artists by genre
   */ async getByGenre (genre) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/artists/genre/".concat(genre));
    },
    /**
   * Get all genres
   */ async getGenres () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/artists/genres");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/chart.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chartService",
    ()=>chartService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/client.ts [app-client] (ecmascript)");
;
const chartService = {
    /**
   * Get Top 100 artists
   */ async getTop100 (week) {
        const url = week ? "/charts/top100?week=".concat(week) : "/charts/top100";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(url);
    },
    /**
   * Get leaderboard
   */ async getLeaderboard (week) {
        let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/charts/leaderboard?week=".concat(week, "&limit=").concat(limit));
    },
    /**
   * Get global leaderboard
   */ async getGlobalLeaderboard () {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 50;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/charts/leaderboard/global?limit=".concat(limit));
    },
    /**
   * Get last week's winners
   */ async getLastWeekWinners () {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/charts/winners/last-week?limit=".concat(limit));
    },
    /**
   * Get social stats
   */ async getSocialStats () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/charts/stats");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/portfolio.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "portfolioService",
    ()=>portfolioService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/client.ts [app-client] (ecmascript)");
;
const portfolioService = {
    /**
   * Get current portfolio
   */ async getCurrentPortfolio () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/portfolio/current");
    },
    /**
   * Get portfolio history
   */ async getPortfolioHistory () {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/portfolio/history?limit=".concat(limit));
    },
    /**
   * Create portfolio
   */ async createPortfolio (data) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/portfolio", {
            method: "POST",
            data
        });
    },
    /**
   * Update portfolio
   */ async updatePortfolio (portfolioId, data) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/portfolio/".concat(portfolioId), {
            method: "PUT",
            data
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/wallet.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "walletService",
    ()=>walletService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/client.ts [app-client] (ecmascript)");
;
const walletService = {
    /**
   * Get wallet
   */ async getWallet () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/wallet");
    },
    /**
   * Get payout history
   */ async getPayoutHistory () {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 20;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/wallet/payouts?limit=".concat(limit));
    },
    /**
   * Get transactions
   */ async getTransactions () {
        let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 50;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/wallet/transactions?limit=".concat(limit));
    },
    /**
   * Get referrals
   */ async getReferrals () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/wallet/referrals");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$artist$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/artist.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$chart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/chart.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$portfolio$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/portfolio.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$wallet$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/wallet.service.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/useArtists.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useArtist",
    ()=>useArtist,
    "useArtists",
    ()=>useArtists,
    "useTrendingArtists",
    ()=>useTrendingArtists
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/swr@2.3.6_react@18.3.1/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$artist$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/artist.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
function useArtists(params) {
    _s();
    const key = params ? [
        "artists",
        JSON.stringify(params)
    ] : "artists";
    const { data, error, isLoading, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, {
        "useArtists.useSWR": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$artist$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["artistService"].getArtists(params)
    }["useArtists.useSWR"]);
    return {
        artists: (data === null || data === void 0 ? void 0 : data.data) || [],
        pagination: data === null || data === void 0 ? void 0 : data.meta,
        isLoading,
        isError: !!error,
        error,
        mutate
    };
}
_s(useArtists, "VRI3YSxoWYZ/jyoKeeIu/AvyMKw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useArtist(id) {
    _s1();
    const { data, error, isLoading, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(id ? [
        "artist",
        id
    ] : null, {
        "useArtist.useSWR": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$artist$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["artistService"].getArtistById(id)
    }["useArtist.useSWR"]);
    return {
        artist: data === null || data === void 0 ? void 0 : data.data,
        isLoading,
        isError: !!error,
        error,
        mutate
    };
}
_s1(useArtist, "VRI3YSxoWYZ/jyoKeeIu/AvyMKw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useTrendingArtists() {
    let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
    _s2();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])([
        "artists",
        "trending",
        limit
    ], {
        "useTrendingArtists.useSWR": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$artist$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["artistService"].getTrending(limit)
    }["useTrendingArtists.useSWR"]);
    return {
        artists: (data === null || data === void 0 ? void 0 : data.data) || [],
        isLoading,
        isError: !!error,
        error
    };
}
_s2(useTrendingArtists, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/useCharts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLeaderboard",
    ()=>useLeaderboard,
    "useSocialStats",
    ()=>useSocialStats,
    "useTop100",
    ()=>useTop100
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/node_modules/.pnpm/swr@2.3.6_react@18.3.1/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$chart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/api/services/chart.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
function useTop100(week) {
    _s();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])([
        "charts",
        "top100",
        week
    ], {
        "useTop100.useSWR": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$chart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartService"].getTop100(week)
    }["useTop100.useSWR"]);
    return {
        artists: (data === null || data === void 0 ? void 0 : data.data) || [],
        isLoading,
        isError: !!error,
        error
    };
}
_s(useTop100, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useLeaderboard(week) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
    _s1();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])([
        "leaderboard",
        week,
        limit
    ], {
        "useLeaderboard.useSWR": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$chart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartService"].getLeaderboard(week, limit)
    }["useLeaderboard.useSWR"]);
    return {
        topFans: (data === null || data === void 0 ? void 0 : data.data) || [],
        isLoading,
        isError: !!error,
        error
    };
}
_s1(useLeaderboard, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useSocialStats() {
    _s2();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])("social-stats", {
        "useSocialStats.useSWR": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$api$2f$services$2f$chart$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartService"].getSocialStats()
    }["useSocialStats.useSWR"]);
    return {
        stats: data === null || data === void 0 ? void 0 : data.data,
        isLoading,
        isError: !!error,
        error
    };
}
_s2(useSocialStats, "3etLDUffADz62tD7g9gJKxYxEy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$18$2e$3$2e$1$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useArtists$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/useArtists.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useCharts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/useCharts.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useArtist",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useArtists$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArtist"],
    "useArtists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useArtists$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArtists"],
    "useLeaderboard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useCharts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeaderboard"],
    "useSocialStats",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useCharts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocialStats"],
    "useTop100",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useCharts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTop100"],
    "useTrendingArtists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useArtists$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrendingArtists"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useArtists$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/useArtists.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$fholio$2d$project$2f$fholio$2d$monorepo$2f$apps$2f$frontend$2f$src$2f$lib$2f$hooks$2f$useCharts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/fholio-project/fholio-monorepo/apps/frontend/src/lib/hooks/useCharts.ts [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Documents_fholio-project_fholio-monorepo_apps_frontend_src_b6a522c5._.js.map