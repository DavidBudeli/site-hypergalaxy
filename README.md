# Hyper Galaxy

Hyper Galaxy Cloud is a Next.js SaaS experience for AI infrastructure, automation and enterprise operations.

## Local Development

```bash
npm install
npm run dev
```

## Production Checks

```bash
npm run lint
npm run build
npm run start -- -p 3000
```

## Deploy Hostinger

Use the GitHub deployment integration with the repository root.

Install command:
```bash
npm ci
```

Build command:
```bash
npm run build
```

Start command:
```bash
npm run start -- -p $PORT
```

Node:
```text
22.x
```

Root directory:
```text
./
```

Production domain:
```text
https://hypergalaxy.cloud
```

Branch:
```text
master
```

Do not commit real secrets. Use `.env.example` as the reference for Hostinger environment variables.
