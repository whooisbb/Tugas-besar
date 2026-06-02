import {
  NextResponse,
} from "next/server";

import {
  prisma,
} from "../../../../lib/prisma";

import {
  getServerSession,
} from "next-auth";

import {
  authOptions,
} from "../../../../lib/auth";



// ======================
// UPDATE JADWAL
// ======================

export async function PUT(
  req: Request,
  { params }: {
    params: Promise<{
      id: string;
    }>
  }
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

    const role =
      session.user.role;

    if (
      role !== "DOSEN"
      &&
      role !== "KETUA_KELAS"
      &&
      role !== "KETUA"
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

    // PARAMS

    const {
      id,
    } = await params;

    // BODY

    const body =
      await req.json();

    const {
      matkul,
      hari,
      jam,
      ruangan,
      dosen,
    } = body;

    // UPDATE

    const jadwal =
      await prisma.jadwal.update({

        where: {
          id,
        },

        data: {

          matkul,
          hari,
          jam,
          ruangan,
          dosen,
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
// DELETE JADWAL
// ======================

export async function DELETE(
  req: Request,
  { params }: {
    params: Promise<{
      id: string;
    }>
  }
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

    const role =
      session.user.role;

    if (
      role !== "DOSEN"
      &&
      role !== "KETUA_KELAS"
      &&
      role !== "KETUA"
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

    // PARAMS

    const {
      id,
    } = await params;

    // DELETE

    await prisma.jadwal.delete({

      where: {
        id,
      },
    });

    return NextResponse.json({

      message:
        "Jadwal berhasil dihapus",
    });

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