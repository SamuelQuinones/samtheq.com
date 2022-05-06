<div align="center">

# SamTheQ.com

<img alt="The letters S and Q stylized to look like wires and circular nodes" src="https://raw.githubusercontent.com/SamuelQuinones/samtheq.com/d9a66022ceef3a7ec87eb2538d205ad8f31f1c9d/public/Logo_866.png" height="150" />

My personal website to show off projects and a personal portfolio

</div>

## Running the Site

### Prerequisites

This project was built using `node 16.13.0` and `npm 8.1.0`.

It is recommended that you have `nvm` installed, as you can run `nvm use` or `nvm use 16.13.0`. This way it is ensured the node and npm versions are the intended ones.

To use internal scripts like `generators` on windows you may need to install `ts-node` globally:

```bash
npm i -g ts-node
```

After ensuring that you are using the proper version of node and npm, install the dependencies using:

```bash
# NOTE THIS PROJECT USES NPM NOT YARN
npm install
```

### Developing / Running

First clone the repo

```bash
git clone <samtheq-repo>
```

You'll need to create a `.env.local` file, or you can break it up into three files:

- `.env.local`
- `.env.development.local`
- `.env.production.local`

Then add the following variables to your env file(s)

```bash
TWITCH_CLIENT_ID="<SOME STRING>"
TWITCH_SECRET_ID="<SOME STRING>"
TWITCH_STARTING_TOKEN="<SOME STRING>" # optional, but useful if you keep restarting

# You may want to put the db creds in a .env.development.local file to be able to use the npm scripts easily
DB_HOST="<YOUR DB HOST URL>" # localhost
DB_PORT=3306 # or whatever port you wantto use
DB_USER="<YOUR DB USERNAME>" # db_user
DB_PASS="<YOUR DB PASSWORD>" # s0m3St50ngP455w0rd
DB_NAME="<YOUR DB NAME>" # site_content
DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# you may want to put this next one in a .env.production.local file
NEXT_PUBLIC_BASE_URL="http://localhost:6006"
```

These environment variables are necesarry to:

- hit the twitch API to get streaming info
- access the database via Prisma - your credentials will need proper permissions to update the database, create triggers, etc.
- ensure SEO works

Install dependencies and generate the prisma client using the terminal / npm scripts. Generating the client is needed to access the database:

```bash
npm install

# if your DB related variables are in .env.development.local
npm run prisma:generate

# if your DB related variables are in .env.local
npx dotenv prisma generate
```

If you're working with an empty database, you should seed with with some data. Prisma supports this natively, and a seed file has been set up:

```bash
# if your DB related variables are in .env.development.local
npm run prisma:seed

# if your DB related variables are in .env.local
npx dotenv prisma db seed
```

With the database seeded and running, you can start the app in development.

Note that the app will not launch if your database can not be connected to.

```bash
npm run dev

# opens a gui in the browser to view / edit data
npm run prisma:studio
```

With the dev script running, you can visit `http://localhost:5555` in the browser and see the app.

IF running prisma studio, you cam visit `http://localhost:9999` in the browser.

## Contributing

Info coming soon...
