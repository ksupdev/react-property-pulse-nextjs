This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Command note
```shell
## Generate project
npx create-next-app@latest react-property-pulse-nextjs
```

## Mongo database configuration

```shell
  # command for run => 
  docker compose -f docker-compose-mongodb.yml up -d

  # command for run => 
  docker compose -f  docker-compose-mongodb.yml down

  # database connection
  `mongodb://root:example@localhost:27099`
```

