# Real Estate Scraper

This project was built to automate my apartment search by monitoring properties for sale across multiple Belgian real estate agency websites.

The project consists of several agency-specific scrapers that run on a schedule using GitHub Actions. Newly discovered properties are stored in MongoDB, and Telegram notifications are sent whenever new listings match the configured search criteria.

The goal is to eliminate the need to manually check multiple real estate websites throughout the day and to receive new property listings as soon as they become available.

<p align="center">
  <img src="assets/notifications.jpeg" alt="telegram notification example" width="350" />
</p>

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Supported Websites](#supported-websites)
3. [How It Works](#how-it-works)
4. [Search Criteria](#search-criteria)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)

## Tech Stack

- **Express** — REST API and application server
- **MongoDB Atlas** — Cloud database for storing property listings
- **Mongoose** — MongoDB object modeling
- **GitHub Actions** — Scheduled scraper execution
- **Axios** — HTTP requests for APIs and static pages
- **Cheerio** — HTML parsing and DOM traversal
- **Puppeteer** — Browser automation for dynamic websites
- **Node Cron** — Local scraper scheduling
- **Node Telegram Bot API** — Telegram notifications

## Supported Websites

- [Century 21](https://www.century21.be/)
- [ERA](https://www.era.be/)
- [Expertissimmo](https://www.expertissimmo.eu/)
- [Immovlan](https://www.immovlan.be/)
- [Latour & Petit](https://www.latouretpetit.be/)
- [MyImmo](https://www.myimmo.be/)
- [Realo](https://www.realo.be/)
- [We Invest](https://weinvest.be/)

## How It Works

1. GitHub Actions runs agency-specific scrapers on a schedule.
2. Each scraper collects property listings from a supported real estate agency website using the configured search criteria.
3. Properties are assigned a unique hash and compared against existing records in MongoDB to detect new listings and prevent duplicates.
4. New properties are stored in MongoDB.
5. Telegram notifications are sent when new properties are discovered.

## Search Criteria

Property search criteria can be customized in [src/config/search.js](https://github.com/LauraMelita/realestate/blob/main/src/config/search.js). Adjust these values to match your own property search requirements.

## Installation

> [!IMPORTANT]
> Requires Node.js `>= 20.6.0`.

1. Clone the repository.

```bash
git clone https://github.com/LauraMelita/realestate.git
```

2. Navigate into the project directory.

```bash
cd realestate
```

3. Install dependencies.

```bash
npm ci
```

4. Create the environment file.

```bash
cp .env.default .env
```

## Configuration

### MongoDB Atlas

1. Go to https://cloud.mongodb.com/.
2. Create a new project named `realestate`.
3. Create a free MongoDB Atlas cluster.
4. Create a database user and password.
5. Allow your IP address in the **Network Access** settings.
6. Copy the MongoDB connection string.
7. Add the connection string to your `.env` file.

```env
DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/realestate
```

### Telegram Notifications

1. Open https://t.me/BotFather in Telegram and click **Open in Web**.
2. Send `/newbot`.
3. Choose a bot **name** and **username**.
4. Copy the generated bot token into your `.env` file.

```env
TELEGRAM_BOT_TOKEN=XYZ
```

5. Open the following URL in your browser.

> [!IMPORTANT]
> Replace `<YOUR_BOT_TOKEN>` with your actual bot token.

```txt
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

6. Send any message to your bot.
7. Locate `chat.id`.

```json
{
  "message": {
    "chat": {
      "id": 123456789
    }
  }
}
```

8. Copy the `id` value into your `.env` file.

```env
TELEGRAM_CHAT_ID=123456789
```

### GitHub Actions

> [!NOTE]
> GitHub Actions cron schedules use UTC.

1. Add repository secrets using the same values configured in your local `.env` file.

   Go to **Settings → Secrets and variables → Actions → Secrets**.

   ```env
   DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/realestate
   TELEGRAM_BOT_TOKEN=XYZ
   TELEGRAM_CHAT_ID=123456789
   ```

2. Add repository variables to enable scrapers.

   Go to **Settings → Secrets and variables → Actions → Variables**.

> [!NOTE]
> Set a variable to `false` to disable the corresponding scraper workflow.

   ```env
   ENABLE_CENTURY_SCRAPER=true
   ENABLE_ERA_SCRAPER=true
   ENABLE_EXPERTISSIMMO_SCRAPER=true
   ENABLE_IMMOVLAN_SCRAPER=true
   ENABLE_LATOURETPETIT_SCRAPER=true
   ENABLE_MYIMMO_SCRAPER=true
   ENABLE_REALO_SCRAPER=true
   ENABLE_WEINVEST_SCRAPER=true
   ```

## Usage

### Start the server

```bash
npm run server
```

### Run the server and local scheduler in parallel

> [!NOTE]
> This starts the Express server and runs all `enabled` scrapers using the schedules defined in [src/config/agencies.js](https://github.com/LauraMelita/realestate/blob/main/src/config/agencies.js).

```bash
npm run dev
```

### Run a single scraper

```bash
npm run scraper century
```
