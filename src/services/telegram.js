import bot from '#config/bot';

import { formatPrice, capitalize } from '#utils/helpers';
import { logError } from '#services/logger';

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendLinkPreview = async ({ url, type, agency }) => {
  const message = `<a href="${url}">${capitalize(type)} — ${agency}</a>`;

  await bot.sendMessage(CHAT_ID, message, {
    parse_mode: 'HTML',
  });
};

const sendPhotoPreview = async ({
  url,
  type,
  agency,
  city,
  zip,
  surface,
  bedrooms,
  price,
  image,
}) => {
  const caption = `<a href="${url}">${capitalize(type)} — ${agency}</a>\n${city} (${zip})\n${surface}m² · ${bedrooms} bdr. · ${formatPrice(price)}`;

  await bot.sendPhoto(CHAT_ID, image, {
    caption,
    parse_mode: 'HTML',
  });
};

export const sendNotification = async (data, hasLinkPreview) => {
  try {
    for (const newListing of data) {
      if (hasLinkPreview) {
        await sendLinkPreview(newListing);
      } else {
        await sendPhotoPreview(newListing);
      }
    }
  } catch (error) {
    logError('Failed to send Telegram message:', error.message);
  }
};
