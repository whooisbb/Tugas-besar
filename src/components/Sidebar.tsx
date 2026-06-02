"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Bell,
  Calendar,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

import {
  signOut,
} from "next-auth/react";

import {
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

type Props = {

  role: string;
};

export default function Sidebar({
  role,
}: Props) {

  const [open,
    setOpen] =
    useState(false);

  const pathname =
    usePathname();



  // DASHBOARD ROLE

  const dashboardLink =

    role === "DOSEN"
      ? "/dashboard/dosen"

      : role === "KETUA_KELAS"
      ? "/dashboard/ketua-kelas"

      : "/dashboard/mahasiswa";



  return (

    <>

      {/* MOBILE TOPBAR */}

      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/80 px-5 py-4 backdrop-blur md:hidden">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-2 text-white">

            <GraduationCap />

          </div>

          <h1 className="text-2xl font-bold text-gray-800">

            Kampus App

          </h1>

        </div>

        <button
          onClick={() =>
            setOpen(!open)
          }
        >

          {
            open
              ? <X />
              : <Menu />
          }

        </button>

      </div>



      {/* OVERLAY */}

      {
        open && (

          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() =>
              setOpen(false)
            }
          />
        )
      }



      {/* SIDEBAR */}

      <aside
        className={`

          fixed z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl transition-all duration-300

          ${open
            ? "left-0"
            : "-left-full"}

          md:left-0
        `}
      >

        {/* HEADER */}

        <div className="border-b border-white/10 p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">

              <GraduationCap size={30} />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Kampus App

              </h1>

              <p className="mt-1 text-sm text-gray-400">

                Class Management

              </p>

            </div>

          </div>

        </div>



        {/* ROLE CARD */}

        <div className="m-5 rounded-2xl bg-white/10 p-5 backdrop-blur">

          <p className="text-sm text-gray-300">

            Login sebagai

          </p>

          <h2 className="mt-2 text-2xl font-bold">

            {role}

          </h2>

        </div>



        {/* MENU */}

        <div className="flex flex-1 flex-col gap-3 px-5">

          {/* DASHBOARD */}

          <Link
            href={dashboardLink}

            onClick={() =>
              setOpen(false)
            }

            className={`

              group flex items-center gap-4 rounded-2xl px-5 py-4 transition

              ${
                pathname === dashboardLink

                  ? "bg-blue-600"

                  : "hover:bg-white/10"
              }

            `}
          >

            <LayoutDashboard
              className="transition group-hover:scale-110"
            />

            Dashboard

          </Link>



          {/* PENGUMUMAN */}

          <Link
            href="/pengumuman"

            onClick={() =>
              setOpen(false)
            }

            className={`

              group flex items-center gap-4 rounded-2xl px-5 py-4 transition

              ${
                pathname === "/pengumuman"

                  ? "bg-blue-600"

                  : "hover:bg-white/10"
              }

            `}
          >

            <Bell
              className="transition group-hover:scale-110"
            />

            Pengumuman

          </Link>



          {/* JADWAL */}

          <Link
            href="/jadwal"

            onClick={() =>
              setOpen(false)
            }

            className={`

              group flex items-center gap-4 rounded-2xl px-5 py-4 transition

              ${
                pathname === "/jadwal"

                  ? "bg-blue-600"

                  : "hover:bg-white/10"
              }

            `}
          >

            <Calendar
              className="transition group-hover:scale-110"
            />

            Jadwal

          </Link>

        </div>



        {/* FOOTER */}

        <div className="p-5">

          <button
            onClick={() =>
              signOut({
                callbackUrl:
                  "/login",
              })
            }

            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-5 py-4 font-bold transition hover:bg-red-600"
          >

            <LogOut />

            Logout

          </button>

        </div>

      </aside>

    </>
  );
}