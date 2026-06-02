"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSession,
} from "next-auth/react";

import Sidebar
from "@/components/Sidebar";

import {
  Bell,
  CalendarDays,
  BookOpen,
  Activity,
  ArrowRight,
} from "lucide-react";

type Pengumuman = {

  id: string;

  judul: string;

  isi: string;

  author?: {

    name: string;
  };
};

type Jadwal = {

  id: string;

  matkul: string;

  hari: string;

  jam: string;

  ruangan: string;

  dosen: string;
};

export default function MahasiswaDashboard() {

  const {
    data: session,
    status,
  } = useSession();

  const [pengumuman,
    setPengumuman] =
    useState<Pengumuman[]>([]);

  const [jadwal,
    setJadwal] =
    useState<Jadwal[]>([]);



  async function getPengumuman() {

    const res =
      await fetch(
        "/api/pengumuman"
      );

    const data =
      await res.json();

    setPengumuman(data);
  }



  async function getJadwal() {

    const res =
      await fetch(
        "/api/jadwal"
      );

    const data =
      await res.json();

    setJadwal(data);
  }



  useEffect(() => {

    if (status === "loading")
      return;

    const role =
      (session?.user as any)?.role;

    if (
      role !== "MAHASISWA"
    ) {

      window.location.href =
        "/login";
    }

    getPengumuman();

    getJadwal();

  }, [
    session,
    status,
  ]);



  return (

    <div className="flex min-h-screen bg-[#020617] text-white">

      <Sidebar role="MAHASISWA" />



      <main className="flex-1 p-5 md:ml-72 md:p-10">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-10 shadow-2xl">

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-black/20 blur-3xl" />



          <div className="relative z-10">

            <p className="text-sm uppercase tracking-[0.3em] text-blue-100">

              Student Dashboard

            </p>

            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight md:text-6xl">

              Selamat datang,
              {session?.user?.name}

            </h1>

            <p className="mt-6 max-w-2xl text-lg text-blue-100">

              Pantau pengumuman terbaru,
              jadwal kuliah aktif,
              dan seluruh aktivitas kelas
              dalam satu dashboard modern.

            </p>



            <div className="mt-10 flex flex-wrap gap-5">

              <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-xl">

                <p className="text-sm text-blue-100">

                  Total Pengumuman

                </p>

                <h2 className="mt-2 text-4xl font-black">

                  {pengumuman.length}

                </h2>

              </div>



              <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-xl">

                <p className="text-sm text-blue-100">

                  Jadwal Aktif

                </p>

                <h2 className="mt-2 text-4xl font-black">

                  {jadwal.length}

                </h2>

              </div>



              <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-xl">

                <p className="text-sm text-blue-100">

                  Status

                </p>

                <h2 className="mt-2 text-4xl font-black">

                  Active

                </h2>

              </div>

            </div>

          </div>

        </div>



        {/* CONTENT */}

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">

          {/* LEFT */}

          <div>

            {/* PENGUMUMAN */}

            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="mb-8 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="rounded-2xl bg-blue-500/20 p-4">

                    <Bell />

                  </div>

                  <div>

                    <h2 className="text-3xl font-black">

                      Pengumuman

                    </h2>

                    <p className="text-slate-400">

                      Informasi terbaru kelas

                    </p>

                  </div>

                </div>



                <button className="flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm transition hover:bg-white/20">

                  Lihat Semua

                  <ArrowRight size={18} />

                </button>

              </div>



              <div className="space-y-6">

                {pengumuman.map((item) => (

                  <div
                    key={item.id}
                    className="rounded-[28px] border border-white/10 bg-[#0f172a] p-6 transition hover:border-blue-500/40"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black">

                        {
                          item.author?.name?.charAt(0)
                        }

                      </div>



                      <div className="flex-1">

                        <h3 className="text-2xl font-black">

                          {item.judul}

                        </h3>

                        <p className="mt-1 text-sm text-slate-500">

                          {item.author?.name}

                        </p>

                        <p className="mt-5 leading-relaxed text-slate-300">

                          {item.isi}

                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>



          {/* RIGHT */}

          <div className="space-y-8">

            {/* STATUS */}

            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-emerald-500/20 p-4">

                  <Activity />

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    Aktivitas

                  </h2>

                  <p className="text-slate-400">

                    Sistem berjalan normal

                  </p>

                </div>

              </div>



              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-[#0f172a] p-5">

                  <p className="text-sm text-slate-400">

                    Pengumuman Aktif

                  </p>

                  <h3 className="mt-2 text-3xl font-black">

                    {pengumuman.length}

                  </h3>

                </div>



                <div className="rounded-2xl bg-[#0f172a] p-5">

                  <p className="text-sm text-slate-400">

                    Jadwal Kuliah

                  </p>

                  <h3 className="mt-2 text-3xl font-black">

                    {jadwal.length}

                  </h3>

                </div>

              </div>

            </div>



            {/* JADWAL */}

            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="mb-8 flex items-center gap-4">

                <div className="rounded-2xl bg-purple-500/20 p-4">

                  <CalendarDays />

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    Jadwal Kuliah

                  </h2>

                  <p className="text-slate-400">

                    Jadwal terbaru

                  </p>

                </div>

              </div>



              <div className="space-y-5">

                {jadwal.slice(0, 4).map((item) => (

                  <div
                    key={item.id}
                    className="rounded-[28px] border border-white/10 bg-[#0f172a] p-5 transition hover:border-purple-500/40"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-xl font-black">

                          {item.matkul}

                        </h3>

                        <p className="mt-2 text-slate-400">

                          {item.dosen}

                        </p>

                      </div>



                      <div className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">

                        {item.hari}

                      </div>

                    </div>



                    <div className="mt-5 flex flex-col gap-2 text-slate-300">

                      <p>

                        {item.jam}

                      </p>

                      <p>

                        {item.ruangan}

                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}