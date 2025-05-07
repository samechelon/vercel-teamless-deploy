# Vercel Teamless Deploy Action

A GitHub Action that handles unauthorized Vercel deployments by using an authorized token. This action is specifically designed for teams using Vercel's free tier who need to collaborate but can't afford the Team or Enterprise plans.

## The Problem

On Vercel's free tier:
- Only the project owner can deploy
- Team collaboration requires a paid plan
- Other contributors get "must have access to the project" errors when deploying

This action automatically handles these authorization failures by re-deploying with an authorized token.

## Usage

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Deploy to Vercel
        id: deploy_attempt
        continue-on-error: true
        run: |
          OUTPUT=$(vercel --token ${{ secrets.VERCEL_TOKEN }} --prod 2>&1)
          echo "::set-output name=error::$OUTPUT"
          if echo "$OUTPUT" | grep -q "must have access to the project"; then
            exit 1
          fi
        
      - name: Handle Unauthorized Deploy
        if: steps.deploy_attempt.outcome == 'failure'
        uses: samechelon/vercel-teamless-deploy@v1
        with:
          vercel-token: ${{ secrets.AUTHORIZED_VERCEL_TOKEN }}
          project-path: '.'
          deployment-error: ${{ steps.deploy_attempt.outputs.error }}
```

## Inputs

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `vercel-token` | Authorized Vercel token for deployment | Yes | - |
| `project-path` | Path to the project directory | No | `.` |
| `deployment-error` | Error message from the failed deployment | Yes | - |

## How It Works

1. Your regular deployment workflow attempts to deploy with the contributor's token
2. If deployment fails due to authorization
3. This action kicks in and deploys using an authorized token

## Important Notes

- This action is intended for use with Vercel's free tier
- Make sure to keep your authorized token secure
- Only use this if you cannot afford Vercel's paid plans
- This is not a replacement for Vercel's official team features

## Setup

1. **Get an authorized Vercel token:**
   - Log in to Vercel as the project owner
   - Go to Settings > Tokens
   - Create a new token with deploy permissions
   - Copy the token value

2. **Configure repository secret:**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `AUTHORIZED_VERCEL_TOKEN`
   - Value: Paste the Vercel token from step 1
   - Click "Add secret"

3. **Update your workflow:**
   ```yaml
   name: Deploy to Vercel
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Deploy to Vercel
           id: deploy_attempt
           continue-on-error: true
           run: |
             OUTPUT=$(vercel --token ${{ secrets.VERCEL_TOKEN }} --prod 2>&1)
             echo "::set-output name=error::$OUTPUT"
             if echo "$OUTPUT" | grep -q "must have access to the project"; then
               exit 1
             fi
         
         - name: Handle Unauthorized Deploy
           if: steps.deploy_attempt.outcome == 'failure'
           uses: samechelon/vercel-teamless-deploy@v1
           with:
             vercel-token: ${{ secrets.AUTHORIZED_VERCEL_TOKEN }}
             deployment-error: ${{ steps.deploy_attempt.outputs.error }}
   ```

**Important Security Note:**
- Only repository administrators should have access to the `AUTHORIZED_VERCEL_TOKEN`
- Never expose this token in your code or commit history
- Regularly rotate the token for security

## License

MIT License - see the LICENSE file for details