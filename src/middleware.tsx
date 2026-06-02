import { withAuth }
from "next-auth/middleware";

export default withAuth(

  function middleware(req) {

    const token =
      req.nextauth.token;

    const pathname =
      req.nextUrl.pathname;

    // DOSEN ONLY

    if (
      pathname.startsWith(
        "/dashboard/dosen"
      )
    ) {

      if (
        token?.role !== "DOSEN"
      ) {

        return Response.redirect(
          new URL(
            "/login",
            req.url
          )
        );
      }
    }

    // KETUA ONLY

    if (
      pathname.startsWith(
        "/dashboard/ketua-kelas"
      )
    ) {

      if (
        token?.role
        !== "KETUA_KELAS"
      ) {

        return Response.redirect(
          new URL(
            "/login",
            req.url
          )
        );
      }
    }

    // MAHASISWA ONLY

    if (
      pathname.startsWith(
        "/dashboard/mahasiswa"
      )
    ) {

      if (
        token?.role
        !== "MAHASISWA"
      ) {

        return Response.redirect(
          new URL(
            "/login",
            req.url
          )
        );
      }
    }

  },

  {
    callbacks: {

      authorized: ({
        token,
      }) => !!token,
    },
  }
);

export const config = {

  matcher: [

    "/dashboard/:path*",
  ],
};