# GitHub Repository Setup Commands

Follow these steps to create a GitHub repository for your portfolio and prepare it for Vercel deployment:

## 1. Initialize Git Repository (if not already done)

```bash
cd portfolio
git init
```

## 2. Add All Files to Git

```bash
git add .
```

## 3. Commit the Changes

```bash
git commit -m "Initial commit: Portfolio website"
```

## 4. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com)
2. Click on the "+" icon in the top right corner
3. Select "New repository"
4. Enter "Suresh-Kumar" as the repository name
5. Add a description (optional): "My professional portfolio website"
6. Keep it as a public repository
7. Do NOT initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## 5. Link Your Local Repository to GitHub

Replace `YOUR_USERNAME` with your GitHub username (Suresh-cs-q):

```bash
git remote add origin https://github.com/Suresh-cs-q/Suresh-Kumar.git
```

## 6. Push Your Code to GitHub

```bash
git push -u origin main
```

If your default branch is "master" instead of "main", use:

```bash
git push -u origin master
```

## 7. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New" > "Project"
4. Select your "Suresh-Kumar" repository
5. Vercel will automatically detect it's a Vite project
6. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
7. Click "Deploy"

## 8. Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain (e.g., sureshkumar.com)
3. Follow Vercel's instructions to configure your DNS settings

## 9. Verify Deployment

Your portfolio should now be live at:

- https://suresh-kumar.vercel.app (Vercel subdomain)
- https://yourdomain.com (if you configured a custom domain)

## Updating Your Portfolio

Whenever you make changes to your portfolio:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically deploy the updated version.
