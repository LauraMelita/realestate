import bot from '#config/bot';
import { logError } from '#services/logger';
import { formatPrice, generateMapsUrl, sleep } from '#utils/helpers';

const MESSAGE_DELAY = 500;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendNotification = async (data, { hasLinkPreview, agencyLabel }) => {
  for (const property of data) {
    try {
      const { image, price, peb, zip, city, address, surface, bedrooms, url } = property;

      const mapsUrl = generateMapsUrl(address, city, zip);
      const formattedPrice = price ? formatPrice(price) : 'Price on demand';
      const details = [surface ? `${surface} m²` : null, bedrooms ? `${bedrooms} bdr` : null, peb ? `PEB ${peb}` : null]
        .filter(Boolean)
        .join(' · ');

      const message =
        `🚀 <a href="${url}">Apartment on ${agencyLabel}</a>\n` +
        `${city}\n` +
        `${formattedPrice}\n` +
        (details ? `${details}\n` : '') +
        (mapsUrl ? `<a href="${mapsUrl}">📍 View on Maps</a>` : '');

      if (hasLinkPreview || !image) {
        await bot.sendMessage(CHAT_ID, message, { disable_web_page_preview: false, parse_mode: 'HTML' });
      } else {
        await bot.sendPhoto(CHAT_ID, image, { caption: message, parse_mode: 'HTML' });
      }
    } catch (error) {
      logError('Failed to send Telegram message', {
        agency: property.agency,
        sourceId: property.sourceId,
        error: error.message,
      });
    } finally {
      await sleep(MESSAGE_DELAY);
    }
  }
};
