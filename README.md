# punjokes

A simple REST API that serves one pun joke per day.

## API

### GET /

Returns the daily pun joke.

**Response:**
```json
{
  "joke": "I used to hate facial hair, but then it grew on me."
}
```

### Rate Limiting

- 60 requests per minute

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm serve
```

The server runs on `http://localhost:3000`.

## Deployment

Configured for Vercel serverless deployment.

## License

MIT
