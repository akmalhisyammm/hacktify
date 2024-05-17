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

- `GET /favorites` (authentication)
- `POST /favorites` (authentication)
- `DELETE /favorites/:id` (authentication)

### Track

- `GET /tracks/generate` (authentication)
- `GET /tracks/search` (authentication)

### User

- `GET /users/me` (authentication)
- `PUT /users/me` (authentication)
- `GET /users/top/tracks` (authentication)
- `GET /users/top/artists` (authentication)
- `GET /users/moods/detect` (authentication)

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
  "authorization": "Bearer <token>"
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
  "access_token": "<token>"
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
  "access_token": "<token>"
}
```

## GET /favorites

### Request

- Headers

```json
{
  "authorization": "Bearer <token>"
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
  "authorization": "Bearer <token>"
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
  "authorization": "Bearer <token>"
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

## GET /users/me

### Request

- Headers

```json
{
  "authorization": "Bearer <token>"
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
  "authorization": "Bearer <token>"
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
    "name": "IVE",
    ...
  }
]
```
