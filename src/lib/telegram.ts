import { Telegraf } from "telegraf";

const bot = new Telegraf(
  process.env.TELEGRAM_BOT_TOKEN!
);

export async function sendTelegramMessage(
  message: string
) {

  try {

    await bot.telegram.sendMessage(

      process.env.TELEGRAM_CHAT_ID!,

      message
    );

  } catch (error) {

    console.error(
      "Telegram Error:",
      error
    );
  }
}