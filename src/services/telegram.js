import bot from '#config/bot';

import { formatPrice, capitalize } from '#utils/helpers';
import { logError } from '#services/logger';

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendLinkPreview = async (property) => {
  try {
    const message = `<a href="${property.url}">${capitalize(property.type)} — ${property.agency}</a>`;

    await bot.sendMessage(CHAT_ID, message, {
      parse_mode: 'HTML',
    });
  } catch (error) {
    throw new Error(
      `Failed to send link preview for property: ${property.hash}`,
    );
  }
};

const sendPhotoPreview = async (property) => {
  try {
    const caption = `<a href="${property.url}">${capitalize(property.type)} — ${property.agency}</a>\n${property.city} (${property.zip})\n${property.surface}m² · ${property.bedrooms} bdr. · ${formatPrice(property.price)}`;

    await bot.sendPhoto(CHAT_ID, property.image, {
      caption,
      parse_mode: 'HTML',
    });
  } catch (error) {
    throw new Error(
      `Failed to send photo preview for property: ${property.hash}`,
    );
  }
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
