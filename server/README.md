# Branded Things API Documentation

URL: https://hacktify-api.akmalhisyam.my.id/api/v1

## Endpoints

List of available endpoints:

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/google`
- `GET /auth/spotify`
- `GET /auth/spotify/callback`

### Favorite

- `GET /favorites` (default authentication)
- `POST /favorites` (default authentication)
- `DELETE /favorites/:id` (default authentication)

### Track

- `GET /tracks/generate` (default authentication)
- `GET /tracks/search` (spotify authentication)

### User

- `GET /users/me` (default authentication)
- `PUT /users/me` (default authentication)
- `GET /users/top/tracks` (spotify authentication)
- `GET /users/top/artists` (spotify authentication)
- `GET /users/moods/detect` (spotify authentication)

## Global Responses

### Response (401 - Unauthorized)

```json
{
  "message": "You are not logged in"
}
```

OR

```json
{
  "message": "User no longer exists"
}
```

OR

```json
{
  "message": "Invalid token"
}
```

### Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

### Response (404 - Not Found)

```json
{
  "message": "<entity_name> with id <entity_id> is not found"
}
```

### Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

## POST /auth/register

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

- Body

```json
{
  "name": "Muhammad Akmal Hisyam",
  "gender": "male",
  "picture": "https://example.com/image/1",
  "phone": "08123456789",
  "UserId": 1
}
```

### Response (201 - Created)

```json
{
  "id": 1,
  "email": "akmal@hacktify.com"
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Name is required"
}
```

OR

```json
{
  "message": "Email already exists"
}
```

## POST /auth/login

### Request

- Body

```json
{
  "email": "akmal@hacktify.com",
  "password": "12345"
}
```

### Response (200 - OK)

```json
{
  "access_token": "<default_token>"
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Email and password are required"
}
```

## GET /auth/google

### Request

- Headers

```json
{
  "token": "<google_token>"
}
```

### Response (200 - OK)

```json
{
  "access_token": "<default_token>"
}
```

## GET /auth/spotify

### Response (Redirect)

To: https://accounts.spotify.com/authorize

## GET /auth/spotify/callback

### Request

- Query

```json
{
  "code": "<spotify_code>",
  "state": "<random_string>"
}
```

### Response (200 - OK)

```json
{
  "access_token": "<spotify_token>",
  "refresh_token": "<spotify_refresh_token>"
}
```

## GET /favorites

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

### Response (200 - OK)

```json
[
  {
    "name": "I AM",
    "artist": "IVE",
    "UserId": 1
  },
  {
    "name": "Kitsch",
    "artist": "IVE",
    "UserId": 1
  }
]
```

## POST /favorites

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

- Body

```json
{
  "name": "I AM",
  "artist": "IVE"
}
```

### Response (201 - Created)

```json
{
  "id": 1,
  "name": "I AM",
  "artist": "IVE",
  "UserId": 1,
  "createdAt": "<created_date>",
  "updatedAt": "<updated_date>"
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Name is required, Artist is required"
}
```

## DELETE /favorites/:id

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

- Params

```json
{
  "id": 2
}
```

### Response (200 - OK)

```json
{
  "message": "Favorite has been deleted"
}
```

## GET /tracks/generate

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

- Query

```json
{
  "q": "best k-pop songs"
}
```

### Response (200 - OK)

```json
{
  "tracks": [
    {
      "name": "I AM",
      "artist": "IVE"
    },
    {
      "name": "Kitsch",
      "artist": "IVE"
    },
    {
      "name": "Violeta",
      "artist": "IZ*ONE"
    }
  ]
}
```

## GET /tracks/search

### Request

- Headers

```json
{
  "authorization": "Bearer <spotify_token>"
}
```

- Query

```json
{
  "q": "I AM - IVE"
}
```

### Response (200 - OK)

```json
{
  "id": "<spotify_id>",
  "name": "I AM",
  ...
}
```

## GET /users/me

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

### Response (200 - OK)

```json
{
  "id": 1,
  "email": "akmal@hacktify.com",
  "password": "12345",
  "createdAt": "<created_date>",
  "updatedAt": "<updated_date>",
  "Profile": {
    "id": 1,
    "name": "Muhammad Akmal Hisyam",
    "gender": "male",
    "picture": "https://example.com/image/1",
    "phone": "08123456789",
    "createdAt": "<created_date>",
    "updatedAt": "<updated_date>"
  }
}
```

## PUT /users/me

### Request

- Headers

```json
{
  "authorization": "Bearer <default_token>"
}
```

- Body

```json
{
  "name": "Muhammad Akmal Hisyam",
  "gender": "male",
  "picture": "https://example.com/image/1",
  "phone": "08123456789"
}
```

### Response (200 - OK)

```json
{
  "id": 1,
  "name": "Muhammad Akmal Hisyam",
  "gender": "male",
  "picture": "https://example.com/image/1",
  "phone": "08123456789",
  "UserId": 1,
  "createdAt": "<created_date>",
  "updatedAt": "<updated_date>"
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Full name is required"
}
```

## GET /users/top/tracks

### Request

- Headers

```json
{
  "authorization": "Bearer <spotify_token>"
}
```

### Response (200 - OK)

```json
[
  {
    "id": "<spotify_id>",
    "name": "I AM",
    ...
  }
]
```

## GET /users/top/artists

### Request

- Headers

```json
{
  "authorization": "Bearer <spotify_token>"
}
```

### Response (200 - OK)

```json
[
  {
    "id": "<spotify_id>",
    "name": "IVE",
    ...
  }
]
```

## GET /users/moods/detect

### Request

- Headers

```json
{
  "authorization": "Bearer <spotify_token>"
}
```

### Response (200 - OK)

```json
{
  "moods": ["energetic", "dreamy", "upbeat"]
}
```

a5071ae5ef37a8ac
