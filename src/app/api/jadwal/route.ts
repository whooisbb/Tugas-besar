import { NextResponse }
from "next/server";

import { prisma }
from "../../../lib/prisma";

import { getServerSession }
from "next-auth";

import { authOptions }
from "../../../lib/auth";



// ======================
// GET JADWAL
// ======================

export async function GET() {

  try {

    const jadwal =
      await prisma.jadwal.findMany({

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      jadwal
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



// ======================
// POST JADWAL
// ======================

export async function POST(
  req: Request
) {

  try {

    const session =
      await getServerSession(
        authOptions as any
      ) as any;

    console.log(session);

    // CEK LOGIN

    if (!session?.user) {

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

    const role =
      session.user.role;

    console.log(role);

    // IZINKAN DOSEN & KETUA

    const allowedRoles = [
      "DOSEN",
      "KETUA_KELAS",
      "KETUA",
    ];

    if (
      !allowedRoles.includes(
        role
      )
    ) {

      return NextResponse.json(
        {
          message:
            "Akses ditolak",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await req.json();

    const {
      matkul,
      hari,
      jam,
      ruangan,
      dosen,
    } = body;

    // VALIDASI

    if (
      !matkul
      || !hari
      || !jam
      || !ruangan
      || !dosen
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

    // CREATE

    const jadwal =
      await prisma.jadwal.create({

        data: {

          matkul:
            String(matkul),

          hari:
            String(hari),

          jam:
            String(jam),

          ruangan:
            String(ruangan),

          dosen:
            String(dosen),
        },
      });

    return NextResponse.json(
      jadwal,
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
}``