import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma }
from "../../../../lib/prisma";



// ======================
// UPDATE
// ======================

export async function PUT(
  req: NextRequest,
  {
    params,
  }: any
) {

  try {

    // NEXT 16 FIX

    const resolvedParams =
      await params;

    const id =
      resolvedParams.id;

    console.log(
      "UPDATE ID:",
      id
    );

    const body =
      await req.json();

    console.log(body);

    const updated =
      await prisma.pengumuman.update({

        where: {
          id: String(id),
        },

        data: {

          judul:
            String(body.title),

          isi:
            String(body.content),
        },
      });

    return NextResponse.json(
      updated
    );

  } catch (error) {

    console.log(
      "UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Gagal update",
      },
      {
        status: 500,
      }
    );
  }
}



// ======================
// DELETE
// ======================

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: any
) {

  try {

    // NEXT 16 FIX

    const resolvedParams =
      await params;

    const id =
      resolvedParams.id;

    console.log(
      "DELETE ID:",
      id
    );

    await prisma.pengumuman.delete({

      where: {
        id: String(id),
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(
      "DELETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Gagal delete",
      },
      {
        status: 500,
      }
    );
  }
}