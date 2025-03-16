# DMetroVerse Back-End Server

## Setting Up

### Environment Variables

To configure the server, create a `.env` file in the project root with the following variables:

```
SECRET_TOKEN=your_secret_token
PORT=3000
FE_PORT=3001
FE_URL=http://your-frontend-url.com
```

- `SECRET_TOKEN`: This is for future use when you might want to use a middleware to check authorization. Replace `your_secret_token` with your desired secret token.
- `PORT`: This is the port number where your server will run. If not provided, the server will run on port 3000 by default.
- `FE_PORT`: This is the port number where your front-end application runs in your local development environment.
- `FE_URL`: This is the URL of your front-end application when it is deployed.

### CORS Configuration

The server uses the `cors` middleware to enable Cross-Origin Resource Sharing (CORS). This is necessary to allow your front-end application to communicate with this server. The CORS options are set to only allow requests from your front-end application, whether it is in the local development environment (`http://localhost:${FE_PORT}`) or deployed (`${FE_URL}`).

## Running the Server

After setting up, you can start the server by running:

```bash
npm install
npm start
```

You should see a console log saying "Server running on port ${PORT}".

## Deploying the Server

This server is designed to be deployed on Fly.io. Follow the [Fly.io documentation](https://fly.io/docs/getting-started/) to learn how to deploy this server.
