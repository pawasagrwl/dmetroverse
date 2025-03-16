# DMetroVerse (⚠️ **Project Abandoned**)

This repository contains the frontend and backend code for the DMetroVerse website. The DMetroVerse project was aimed at leveraging the backend API of Delhi Metro Rail to provide enhanced features and utility to users beyond mere transportation.

## **⚠️ Project Status: Abandoned**
DMetroVerse is now **discontinued** because we can no longer fetch data from the **Delhi Metro Rail backend API**. Cloudflare protections have become too strict, blocking all requests from our Fly.io backend. Despite multiple attempts to bypass these restrictions using:

- **Cloudscraper** (Failed due to Cloudflare challenges)
- **FlareSolverr** (Failed due to challenge timeouts)
- **Puppeteer (Headless & Non-Headless)** (Only worked locally, failed on Fly.io)
- **Fly.io Instance Tweaks** (Still blocked)

None of these solutions provided a **reliable way** to get API responses on Fly.io. Since this project was made for fun and not actively used by the creator, **no further development will continue.**

---

## How to Run Locally

### Prerequisites

1. Ensure you have Node.js installed. If not, you can download it from [here](https://nodejs.org/en/download/).
2. Clone the repository:  
   ```bash
   git clone https://github.com/dmetroverse-code.git
   ```
3. Navigate into the repository:  
   ```bash
   cd dmetroverse
   ```

### Backend

> Note: Run the backend before the frontend, as the server will only run on port 3000.

1. Navigate into the backend directory:  
   ```bash
   cd dmetroverse-be
   ```
2. Install the necessary dependencies:  
   ```bash
   npm install
   ```
3. Run the backend server:  
   ```bash
   npm start
   ```
4. The backend server is now running on `localhost:3000`.

**🚨 WARNING:**  
- API calls **will not work** since Delhi Metro has blocked all server-based requests.
- The backend is **non-functional** without API responses.

### Frontend

1. Navigate into the frontend directory:  
   ```bash
   cd dmetroverse-fe
   ```
2. Install the necessary dependencies:  
   ```bash
   npm install
   ```
3. Run the frontend server:  
   ```bash
   npm start
   ```
4. You can now access the frontend on `localhost:3001`.  

**🚨 WARNING:**  
- The frontend **depends on the backend**, which is non-functional.
- The app **will not work** beyond basic UI interactions.

---

## Deployment (No Longer Functional)

The frontend of DMetroVerse was hosted on **GitHub Pages**, while the backend server was deployed on **Fly.io**. However, since API requests are blocked, deployment no longer serves any purpose.

---

## Contributing

This project is **no longer maintained**. No new contributions will be accepted, as the backend API can no longer be accessed.

If you have a **working alternative API** or **a way to bypass Cloudflare's restrictions**, feel free to **fork the project** and experiment.
