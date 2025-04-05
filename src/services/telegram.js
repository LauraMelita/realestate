import bot from '#config/bot';

const chatId = process.env.TELEGRAM_CHAT_ID;

const buildMessage = (url) => {
  return `<a href="${url}">New apartment</a>`;
};

export const sendNotification = async (data) => {
  try {
    for (const newListing of data) {
      await bot.sendMessage(chatId, buildMessage(newListing.url), {
        parse_mode: 'HTML',
      });
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error.message);
  }
};
