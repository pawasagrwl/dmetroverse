# DMetroVerse Back-End Server (⚠️ **Project Abandoned**)

## **⚠️ Project Status: Abandoned**
DMetroVerse's backend is **no longer functional** because the **Delhi Metro Rail API is blocking all requests**.  
Despite multiple attempts to bypass these restrictions using:
- **Cloudscraper** (Blocked by Cloudflare challenges)
- **FlareSolverr** (Timed out on Fly.io)
- **Puppeteer (Headless & Non-Headless)** (Only worked manually, failed on Fly.io)
- **Fly.io Tweaks** (Didn't help)

None of these solutions worked consistently. Since this project was made for fun and isn't actively used by the creator, **no further development will continue.**  

---

## Setting Up (No Longer Useful)

### Environment Variables

To configure the server, create a `.env` file in the project root with the following variables:

```
SECRET_TOKEN=your_secret_token
PORT=3000
FE_PORT=3001
FE_URL=http://your-frontend-url.com
```

- `SECRET_TOKEN`: Placeholder for future authorization (irrelevant now).
- `PORT`: The port number where your server runs (default: 3000).
- `FE_PORT`: The front-end application's local port.
- `FE_URL`: The deployed front-end URL.

### CORS Configuration

The server uses the `cors` middleware to enable Cross-Origin Resource Sharing (CORS). However, since the backend **can no longer fetch metro data**, this is no longer relevant.

---

## Running the Server (⚠️ **Will Not Work**)

```bash
npm install
npm start
```

Even if the server runs, **API requests will fail** due to Delhi Metro's Cloudflare restrictions.

---

## Deploying the Server (No Longer Needed)

This server was deployed on **Fly.io**, but it **no longer serves any purpose** since requests to the Delhi Metro API **are blocked**.

---

## Contributing

This project is **no longer maintained**. If you find a way to bypass Cloudflare restrictions, feel free to **fork the repository and experiment**.