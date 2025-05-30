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

## npm package
```shell
npm i react-icons
npm i mongodb mongoose
npm i regenerate-unicode-properties
npm i next-auth
npm i cloudinary
npm i react-toastify
npm i react-geocode mapbox-gl react-map-gl
npm i react-share
npm i react-spinners
npm i photoswipe react-photoswipe-gallery

npm install tailwindcss @tailwindcss/postcss postcss
```

## Create Database Mongo

- create database

```json
const database = 'propertypulse';
const collection = 'properties';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);
```

- import data on properties2.json

```json
// The current database to use.
use('propertypulse');

// Create a new document in the collection.
db.getCollection('properties').insertMany([data]);
```

