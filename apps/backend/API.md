# Fholio API Documentation

Base URL: `http://localhost:3001/api/v1`

## Authentication

Currently using `x-user-id` header for development. In production, implement proper JWT authentication.

---

## Artists

### Get All Artists

```http
GET /artists
```

**Query Parameters:**

- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `league` (enum: Major | Minor)
- `status` (enum: Hot Streak | Rising | New Entrant | Trending | Stable)
- `genre` (string)
- `sortBy` (enum: score | name | streams | engagement, default: score)
- `sortOrder` (enum: asc | desc, default: desc)
- `search` (string)

**Example:**

```bash
curl "http://localhost:3001/api/v1/artists?page=1&limit=20&league=Major&sortBy=score"
```

### Get Single Artist

```http
GET /artists/:id
```

### Get Artist Performance

```http
GET /artists/:id/performance
```

### Get Trending Artists

```http
GET /artists/trending?limit=10
```

### Get Artists by Genre

```http
GET /artists/genre/:genre
```

### Get All Genres

```http
GET /artists/genres
```

---

## Portfolio

### Get Current Portfolio

```http
GET /portfolio/current
Headers: x-user-id: <uuid>
```

### Create Portfolio

```http
POST /portfolio
Headers: x-user-id: <uuid>

Body:
{
  "weekStarting": "2025-11-03T00:00:00Z",
  "artistIds": ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"]
}
```

### Update Portfolio

```http
PUT /portfolio/:id
Headers: x-user-id: <uuid>

Body:
{
  "artistIds": ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"]
}
```

### Get Portfolio History

```http
GET /portfolio/history?limit=10
Headers: x-user-id: <uuid>
```

---

## Charts

### Get Top 100

```http
GET /charts/top100?week=2025-11-03
```

### Get Leaderboard

```http
GET /charts/leaderboard?week=2025-11-03&limit=10
```

### Get Global Leaderboard

```http
GET /charts/leaderboard/global?limit=50
```

### Get Last Week's Winners

```http
GET /charts/winners/last-week?limit=10
```

### Get Social Stats

```http
GET /charts/stats
```

---

## Votes

### Cast Vote

```http
POST /votes
Headers: x-user-id: <uuid>

Body:
{
  "artistId": "uuid",
  "weekStarting": "2025-11-03T00:00:00Z" // optional
}
```

### Get My Votes

```http
GET /votes/my-votes?week=2025-11-03
Headers: x-user-id: <uuid>
```

### Get Remaining Votes

```http
GET /votes/remaining
Headers: x-user-id: <uuid>
```

### Remove Vote

```http
DELETE /votes/:id
Headers: x-user-id: <uuid>
```

---

## Wallet

### Get Wallet

```http
GET /wallet
Headers: x-user-id: <uuid>
```

### Get Payout History

```http
GET /wallet/payouts?limit=20
Headers: x-user-id: <uuid>
```

### Get Transactions

```http
GET /wallet/transactions?limit=50
Headers: x-user-id: <uuid>
```

### Get Referrals

```http
GET /wallet/referrals
Headers: x-user-id: <uuid>
```

---

## Users

### Get Profile

```http
GET /users/me
Headers: x-user-id: <uuid>
```

### Update Profile

```http
PATCH /users/me
Headers: x-user-id: <uuid>

Body:
{
  "username": "newusername",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

### Get Stats

```http
GET /users/me/stats
Headers: x-user-id: <uuid>
```

---

## FAQs

### Get All FAQs

```http
GET /faqs?category=General
```

### Get Categories

```http
GET /faqs/categories
```

---

## Health Check

```http
GET /health
```

Returns server status and uptime.
