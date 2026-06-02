import { Telegraf } from "telegraf";
import { prisma } from "../lib/prisma";

const bot = new Telegraf(
  process.env.TELEGRAM_BOT_TOKEN!
);

// =========================
// START
// =========================

bot.start(async (ctx) => {

  await ctx.reply(

`Selamat datang di Kampus Bot

Perintah yang tersedia:

/pengumuman
/pengumuman_terbaru

/jadwal
/jadwal senin
/jadwal selasa
/jadwal rabu
/jadwal kamis
/jadwal jumat`
  );
});

// =========================
// PENGUMUMAN TERBARU
// =========================

bot.command(
  "pengumuman_terbaru",
  async (ctx) => {

    const data =
      await prisma.pengumuman.findFirst({

        orderBy: {
          createdAt: "desc",
        },
      });

    if (!data) {

      return ctx.reply(
        "Belum ada pengumuman."
      );
    }

    await ctx.reply(

`📢 ${data.judul}

${data.isi}`
    );
  }
);

// =========================
// SEMUA PENGUMUMAN
// =========================

bot.command(
  "pengumuman",
  async (ctx) => {

    const data =
      await prisma.pengumuman.findMany({

        orderBy: {
          createdAt: "desc",
        },

        take: 5,
      });

    if (!data.length) {

      return ctx.reply(
        "Belum ada pengumuman."
      );
    }

    const text =
      data.map(

        (item, index) =>

`${index + 1}. ${item.judul}`
      )
      .join("\n");

    await ctx.reply(
      text
    );
  }
);

// =========================
// JADWAL
// =========================

bot.command(
  "jadwal",
  async (ctx) => {

    const text =
      ctx.message.text;

    const parts =
      text.split(" ");

    // /jadwal senin
    if (parts.length > 1) {

      const hari =
        parts.slice(1).join(" ");

      const semuaJadwal =
        await prisma.jadwal.findMany();

      const jadwal =
        semuaJadwal.filter(

          (item) =>

            item.hari
              .toLowerCase()
              .trim()

            ===

            hari
              .toLowerCase()
              .trim()
        );

      if (!jadwal.length) {

        return ctx.reply(
          `Tidak ada jadwal hari ${hari}`
        );
      }

      const hasil =
        jadwal.map(

          (item) =>

`${item.matkul}
🕒 ${item.jam}
📍 ${item.ruangan}
👨‍🏫 ${item.dosen}`
        )
        .join("\n\n");

      return ctx.reply(
        hasil
      );
    }

    // /jadwal
    const jadwal =
      await prisma.jadwal.findMany({

        orderBy: {
          createdAt: "desc",
        },
      });

    if (!jadwal.length) {

      return ctx.reply(
        "Belum ada jadwal."
      );
    }

    const hasil =
      jadwal.map(

        (item) =>

`${item.matkul}
📅 ${item.hari}
🕒 ${item.jam}`
      )
      .join("\n\n");

    await ctx.reply(
      hasil
    );
  }
);

// =========================
// BOT START
// =========================

bot.launch({
  dropPendingUpdates: true,
});

console.log(
  "Telegram Bot Running..."
);

process.once(
  "SIGINT",
  () => bot.stop("SIGINT")
);

process.once(
  "SIGTERM",
  () => bot.stop("SIGTERM")
);

bot.catch((err) => {

  console.error(
    "BOT ERROR:",
    err
  );
});