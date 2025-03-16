# DMetroVerse Source Code

This repository contains the frontend and backend code for the DMetroVerse website. The DMetroVerse project is aimed at leveraging the backend API of Delhi Metro Rail to provide enhanced features and utility to users beyond mere transportation.

**_Disclaimer: The API utilized in this project is obtained from Delhi Metro Rail's backend, which is not officially documented. Therefore, the usage of this API and the provided URLs is at your own risk. The repository owner is not liable for any consequences or damages that may arise due to the usage of this API or URLs._**

## How to Run Locally

### Prerequisites

1. Ensure you have Node.js installed. If not, you can download it from [here](https://nodejs.org/en/download/).
2. Clone the repository: `git clone https://github.com/dmetroverse-code.git`.
3. Navigate into the repository: `cd dmetroverse`.

### Backend

> Note: Run backend before frontend as server will only run on 3000

1. Navigate into the backend directory: `cd dmetroverse-be`.
2. Install the necessary dependencies: `npm install`.
3. Run the backend server: `npm start`.
4. The backend server is now running on `localhost:3000`.
### Frontend

1. Navigate into the frontend directory: `cd dmetroverse-fe`.
2. Install the necessary dependencies: `npm install`.
3. Run the frontend server: `npm start`.
4. You can now access the frontend on `localhost:3001`.



## Deployment

The frontend of DMetroVerse is hosted on GitHub Pages, while the backend server is deployed on Fly.io.

To successfully deploy the frontend to GitHub Pages while keeping the code in a separate repository from the main code, follow these steps:

### 1. Preparing the Frontend Directory (`dmetroverse-fe`)

Before pushing the code to the main code repository, ensure that there is no `.git` folder inside `dmetroverse-fe`:

```bash
rm -rf dmetroverse-fe/.git
```

### 2. Configure .gitignore in Main Repository

Add the following line to the .gitignore file in your main repository. This ensures that the Git folder inside dmetroverse-fe is ignored when you push code:
```gitignore
dmetroverse-fe/.git/
```

### 3. Add and Push Code to Main Repository

Add and push your code to the main repository as usual:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 4. Initialize Git Repository in dmetroverse-fe

Navigate to the dmetroverse-fe directory and initialize a new Git repository, then add the URL for the GitHub Pages repository:

```bash
cd dmetroverse-fe
git init
git remote add origin YOUR_GITHUB_PAGES_URL
```

Replace YOUR_GITHUB_PAGES_URL with the actual URL for your GitHub Pages repository.

### 5. Deploy Build

Run the deployment script to build and deploy the frontend:

```bash
npm run deploy
```

### 6. Push Main Repository Code

Finally, navigate back to your main repository directory and push the code:

```bash
cd ..
git add .
git commit -m "Updated dmetroverse-fe"
git push origin main
```

By following these steps, the frontend code will be pushed without being considered as a subtree or submodule. This ensures that the dmetroverse-fe code can be deployed to GitHub Pages while the rest of the code resides in the main repository.

For more information on the utilized API and endpoints, please refer to [ENDPOINTS.md](ENDPOINTS.md).

## Contributing

If you discover any more endpoints or wish to contribute to this project, feel free to [create an issue](https://github.com/dmetroverse-code/issues) or [submit a pull request](https://github.com/dmetroverse-code/pulls).
