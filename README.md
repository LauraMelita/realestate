# Real Estate Scraper

This project was built to automate my apartment search process by aggregating real estate listings from multiple property websites into a single workflow.

The scraper continuously monitors supported websites, stores newly discovered listings in MongoDB, and sends Telegram notifications whenever matching properties are detected.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Supported Websites](#supported-websites)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API](#api)

## Tech Stack

- **Express** — REST API and application server
- **Axios** — HTTP requests for APIs and static pages
- **Cheerio** — HTML parsing and DOM traversal
- **Puppeteer** — Browser automation for dynamic websites
- **Mongoose** — MongoDB object modeling
- **Node Cron** — Automated scraping schedules
- **Node Telegram Bot API** — Telegram notifications

## Supported Websites

- [By The Way](https://bytheway.immo/)
- [Century 21](https://www.century21.be/)
- [ERA](https://www.era.be/)
- [Expertissimmo](https://www.expertissimmo.eu/)
- [Immo Abita](https://www.immoabita.be/)
- [Immovlan](https://www.immovlan.be/)
- [Immoweb](https://www.immoweb.be/)
- [Latour & Petit](https://www.latouretpetit.be/)
- [MyImmo](https://www.myimmo.be/)
- [Oralis](https://www.oralis.be/)
- [Realo](https://www.realo.be/)

## Project Structure

```txt
src/
├── config/        # Application and scraper configuration
├── controllers/   # Business logic
├── middlewares/   # Express middlewares
├── models/        # Mongoose schemas
├── routes/        # API routes
├── scrapers/      # Website-specific scraping logic
├── services/      # External services (Telegram, logging, etc.)
├── utils/         # Shared utility functions
└── server.js      # Application entry point
```

## Installation

> [!IMPORTANT]
> Requires Node.js >= 20.6.0

1. Clone the repository

```bash
git clone https://github.com/LauraMelita/realestate.git
```

2. Navigate into the project directory

```bash
cd realestate
```

3. Install dependencies

```bash
npm install
```

4. Create the environment file

```bash
cp .env.default .env
```

## Configuration

### MongoDB Atlas

1. Go to https://cloud.mongodb.com/

2. Create a new project named `realestate`

3. Create a free MongoDB Atlas cluster

4. Create a database user and password

5. Allow your IP address in the Network Access settings

6. Copy the MongoDB connection string

7. Add the connection string to your `.env` file

   ```env
   DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/realestate
   ```

### Telegram Notifications

1. Open https://t.me/BotFather in Telegram

2. Click **Open in Web**

3. Send `/newbot`

4. Choose:
   - a bot name
   - a bot username (must be unique and end with `bot`)

5. Copy the generated bot token into your `.env` file

   ```env
   TELEGRAM_BOT_TOKEN=
   ```

6. Open the following URL in your browser

   ```txt
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```

> [!IMPORTANT]
> Replace `<YOUR_BOT_TOKEN>` with your actual bot token

7. Send any message to your bot

8. Locate `chat.id`

   ```json
   {
     "message": {
       "chat": {
         "id": 123456789
       }
     }
   }
   ```

9. Copy the `id` value into your `.env` file

   ```env
   TELEGRAM_CHAT_ID=
   ```

## Usage

### Start the server

```bash
npm start
```

### Run in development mode

```bash
npm run dev
```

## API

#### `GET /properties`

Returns all scraped properties stored in MongoDB

Example:
`http://localhost:5000/properties`
