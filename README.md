# Vercel Teamless Deploy Action

A GitHub Action that automates Vercel deployments with an intelligent fallback system for authorized credentials.

## Features

- ✅ Attempts deployment using user credentials
- ✅ If user deployment fails, automatically uses authorized fallback credentials
- ✅ Supports both production and preview deployments
- ✅ Provides deployment URL and status as output
- ✅ Customizable with various configuration options

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
        
      - name: Vercel Teamless Deploy
        uses: yourusername/vercel-teamless-deploy@v1
        id: deploy
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          fallback-vercel-token: ${{ secrets.AUTHORIZED_VERCEL_TOKEN }}
          production: 'true'
          
      - name: Show deployment URL
        run: echo "Deployed to ${{ steps.deploy.outputs.deployment-url }}"
```

## Input

| Name                | Description                                     | Required | Default |
|---------------------|-------------------------------------------------|----------|---------|
| `vercel-token`      | User's Vercel token for deployment              | Yes      | -       |
| `fallback-vercel-token` | Authorized Vercel token for fallback        | Yes      | -       |
| `production`        | Execute production deployment                   | No       | `true`  |
| `working-directory` | Working directory for deployment                | No       | `.`     |
| `failfast`          | Fail immediately if user deploy fails           | No       | `false` |

## Output

| Name              | Description                                              |
|-------------------|----------------------------------------------------------|
| `deployment-url`  | URL of the deployed project                              |
| `deployment-status` | Deployment status (`SUCCESS`, `FALLBACK_SUCCESS`, `FAILED`) |

## Examples

### Basic Deployment

```yaml
- name: Vercel Teamless Deploy
  uses: yourusername/vercel-teamless-deploy@v1
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    fallback-vercel-token: ${{ secrets.AUTHORIZED_VERCEL_TOKEN }}
```

### Deployment on Specific Directory

```yaml
- name: Vercel Teamless Deploy
  uses: yourusername/vercel-teamless-deploy@v1
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    fallback-vercel-token: ${{ secrets.AUTHORIZED_VERCEL_TOKEN }}
    working-directory: './frontend'
```

### Test Environment Deployment

```yaml
- name: Vercel Teamless Deploy Preview
  uses: yourusername/vercel-teamless-deploy@v1
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    fallback-vercel-token: ${{ secrets.AUTHORIZED_VERCEL_TOKEN }}
    production: 'false'
```

## License

MIT License - see the LICENSE file for details.