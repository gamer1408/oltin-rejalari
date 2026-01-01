# Malina UZ Backend Setup

## Quick Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   - Copy `.env` file
   - Replace `<bot_token>` with: `8288724306:AAG5asuVV2L6-gFHromP2d-sxQ3vJCMryBI`
   - Replace `<chat_id>` with: `1159272333`

3. **Start server:**
   ```bash
   npm start
   ```

## Test Endpoint

```bash
curl -X POST http://localhost:3001/apply \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+998901234567",
    "region": "Toshkent",
    "quantity": 100,
    "product": "Maravilla",
    "message": "Test message"
  }'
```

## Deploy Options

- **Vercel:** `vercel --prod`
- **Render:** Connect GitHub repo
- **Railway:** `railway deploy`

## Environment Variables for Production

```
BOT_TOKEN=8288724306:AAG5asuVV2L6-gFHromP2d-sxQ3vJCMryBI
CHAT_ID=1159272333
PORT=3001
```