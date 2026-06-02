import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { sendTelegramMessage } from "../../../lib/telegram";

// =======================
// GET PENGUMUMAN
// =======================

export async function GET() {

  try {

    const pengumuman =
      await prisma.pengumuman.findMany({

        include: {
          author: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      pengumuman
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}



// =======================
// POST PENGUMUMAN
// =======================

export async function POST(
  req: Request
) {

  try {

    const session =
      await getServerSession(
        authOptions as any
      ) as any;

    if (!session) {

      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    const {
      title,
      content,
    } = body;

    if (
      !title ||
      !content
    ) {

      return NextResponse.json(
        {
          message:
            "Semua field wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    const pengumuman =
      await prisma.pengumuman.create({

        data: {

          judul: title,

          isi: content,

          authorId:
            session.user.id,
        },
      });



    // ==========================
    // KIRIM KE TELEGRAM
    // ==========================

    try {

      await sendTelegramMessage(

`📢  PENGUMUMAN BARU

Judul:
${title}

Isi:
${content}

Dikirim oleh:
${session.user.name}`
      );

    } catch (telegramError) {

      console.log(
        "Telegram Error:",
        telegramError
      );
    }



    return NextResponse.json(
      pengumuman,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}