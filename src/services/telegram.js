import bot from '#config/bot';

import { formatPrice, capitalize } from '#utils/helpers';
import { logError } from '#services/logger';

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendNotification = async (data, { hasLinkPreview, agencyLabel }) => {
  try {
    for (const { type, city, zip, surface, bedrooms, peb, price, url, image } of data) {
      const title = `[NEW] ${capitalize(type)} | ${agencyLabel}`;
      const location = `📍 ${city} (${zip})`;

      const details = [
        surface ? `${surface}m²` : null,
        bedrooms ? `${bedrooms} bdr` : null,
        peb ? `PEB ${peb}` : null,
        price ? formatPrice(price) : null,
      ]
        .filter(Boolean)
        .join(' · ');

      const message = [title, location, details].filter(Boolean).join('\n');

      if (hasLinkPreview || !image) {
        await bot.sendMessage(CHAT_ID, `${message}\n\n${url}`, { disable_web_page_preview: false });
      } else {
        await bot.sendPhoto(CHAT_ID, image, { caption: `${message}\n\n${url}` });
      }
    }
  } catch (error) {
    logError('Failed to send Telegram message:', error.message);
  }
};
