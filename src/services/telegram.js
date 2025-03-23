import bot from '#config/bot';

const chatId = process.env.TELEGRAM_CHAT_ID;

const buildMessage = (
  title = 'Cozy Apartment in Brussels',
  description = 'Looking for a spacious 2-bedroom near the city center.',
  link = 'https://www.immoweb.be/en/classified/house/for-sale/uccle/1180/20517986',
) => {
  return `<b>${title}</b>\n${description}\n<a href="${link}">View more</a>`;
};

export const sendNotification = async () => {
  try {
    await bot.sendMessage(chatId, buildMessage(), { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Failed to send Telegram message:', error.message);
  }
};
