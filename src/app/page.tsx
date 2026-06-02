import Link
from "next/link";

import {
  Bell,
  CalendarDays,
  Users,
  MessageCircle,
  Camera,
} from "lucide-react";

export default function HomePage() {

  return (

    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white">

      {/* NAVBAR */}

      <nav className="flex items-center justify-between px-6 py-5 md:px-14">

        <div>

          <h1 className="text-3xl font-black">

            KampusClass

          </h1>

          <p className="text-sm text-white/70">

            Sistem Informasi 25

          </p>

        </div>

        <div className="flex items-center gap-5">

          <a
            href="#fitur"
            className="hidden text-white/80 transition hover:text-white md:block"
          >

            Fitur

          </a>

          <a
            href="#sosial"
            className="hidden text-white/80 transition hover:text-white md:block"
          >

            Sosial

          </a>

          <Link
            href="/login"
            className="rounded-2xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:scale-105"
          >

            Login

          </Link>

        </div>

      </nav>



      {/* HERO */}

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-14 md:grid-cols-2 md:px-14">

        {/* LEFT */}

        <div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">

            <MessageCircle size={18} />

            <span>

              Platform Sosial Kelas Kampus

            </span>

          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">

            Sistem
            <br />
            Manajemen
            <br />
            Kelas 

          </h1>

          <p className="mt-7 max-w-xl text-lg text-white/80">

            Kelola pengumuman,
            pergantian jadwal kuliah,
            dalam satu platform digital
            untuk mahasiswa LPKIA

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/login"
              className="rounded-2xl bg-white px-7 py-4 font-bold text-blue-700 transition hover:scale-105"
            >

              Mulai Sekarang

            </Link>

            <button className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-semibold backdrop-blur-xl">

              Explore Features

            </button>

          </div>



          {/* INSTAGRAM */}

          <div className="mt-10 flex flex-wrap items-center gap-5 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 shadow-xl">

              <Camera size={34} />

            </div>

            <div>

              <p className="text-sm text-white/60">

                Ikuti Instagram Sistem Informasi

              </p>

              <div className="mt-2 flex flex-wrap items-center gap-4">

                <a
                  href="https://instagram.com/lpkia_sisteminformasi"
                  target="_blank"
                  className="font-bold transition hover:text-pink-300"
                >

                  @lpkia_sisteminformasi

                </a>

                <span className="text-white/40">

                  •

                </span>

                <a
                  href="https://instagram.com/si.lpkia_25"
                  target="_blank"
                  className="font-bold transition hover:text-pink-300"
                >

                  @si.lpkia_25

                </a>

              </div>

            </div>

          </div>

        </div>



        {/* RIGHT */}

        <div className="relative">

          <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-pink-500/30 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />



          <div className="relative space-y-5 rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">

            {/* POST */}

            <div className="rounded-3xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold">

                  B

                </div>

                <div>

                  <h3 className="font-bold">

                    Bambang Irwansyah

                  </h3>

                  <p className="text-sm text-white/60">

                    2 menit lalu

                  </p>

                </div>

              </div>

              <p className="mt-4 text-white/90">

                Besok jangan lupa
                presentasi HR

              </p>

            </div>



            {/* FEATURES CARD */}

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-3xl bg-white/10 p-5">

                <Bell className="mb-3" />

                <h3 className="text-xl font-bold">

                  Pengumuman

                </h3>

                <p className="mt-2 text-white/70">

                  Informasi realtime
                  dari dosen & ketua kelas.

                </p>

              </div>

              <div className="rounded-3xl bg-white/10 p-5">

                <CalendarDays className="mb-3" />

                <h3 className="text-xl font-bold">

                  Jadwal

                </h3>

                <p className="mt-2 text-white/70">

                  Informasi Pergantian Jadwal kuliah Realtime.

                </p>

              </div>

            </div>



            {/* SOCIAL */}

            <div className="rounded-3xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <Users />

                <h3 className="text-xl font-bold">

                  Sosial Kelas

                </h3>

              </div>

              <p className="mt-3 text-white/80">

                Bangun komunikasi kelas
                cepat dengan intregasi bot ke grup whatsapp.                

              </p>

            </div>

          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section
        id="fitur"
        className="bg-white px-6 py-24 text-gray-900 md:px-14"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <p className="font-semibold uppercase tracking-widest text-indigo-600">

              Fitur Kami

            </p>

            <h2 className="mt-4 text-5xl font-black">

              Semua Kebutuhan Kelas
              dalam Satu Platform

            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">

              Dirancang untuk memudahkan
              komunikasi dan manajemen kelas
              secara digital dan modern.

            </p>

          </div>



          <div className="grid gap-7 md:grid-cols-4">

            <div className="rounded-3xl bg-gray-50 p-8 shadow-lg transition hover:-translate-y-2">

              <Bell
                size={44}
                className="text-indigo-600"
              />

              <h3 className="mt-6 text-2xl font-bold">

                Pengumuman

              </h3>

              <p className="mt-3 text-gray-500">

                Update informasi terbaru
                secara realtime.

              </p>

            </div>



            <div className="rounded-3xl bg-gray-50 p-8 shadow-lg transition hover:-translate-y-2">

              <CalendarDays
                size={44}
                className="text-green-600"
              />

              <h3 className="mt-6 text-2xl font-bold">

                Jadwal Pergantian

              </h3>

              <p className="mt-3 text-gray-500">

                Jadwal Pergantian yang
                realtime dan bisa diakses kapan saja.

              </p>

            </div>



            <div className="rounded-3xl bg-gray-50 p-8 shadow-lg transition hover:-translate-y-2">

              <Users
                size={44}
                className="text-pink-600"
              />

              <h3 className="mt-6 text-2xl font-bold">

                Sosial Kelas

              </h3>

              <p className="mt-3 text-gray-500">

                Informasi Anti delay Dan Realtime di forward oleh BOT.

              </p>

            </div>



            <div className="rounded-3xl bg-gray-50 p-8 shadow-lg transition hover:-translate-y-2">

              <MessageCircle
                size={44}
                className="text-orange-500"
              />

              <h3 className="mt-6 text-2xl font-bold">

                Diskusi

              </h3>

              <p className="mt-3 text-gray-500">

                Diskusi dan komunikasi
                kelas lebih Efektif.

              </p>

            </div>

          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer
        id="sosial"
        className="border-t border-white/10 bg-[#0b1023] px-6 py-14 text-white md:px-14"
      >

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">

          <div>

            <h2 className="text-3xl font-black">

              KampusClass

            </h2>

            <p className="mt-4 text-white/60">

              Platform digital modern
              untuk manajemen kelas Berbasis Online.

            </p>

          </div>



          <div>

            <h3 className="mb-4 text-xl font-bold">

              Navigasi

            </h3>

            <div className="space-y-3 text-white/70">

              <p>Beranda</p>

              <p>Fitur</p>

              <p>Sosial</p>

            </div>

          </div>



          <div>

            <h3 className="mb-4 text-xl font-bold">

              Kontak

            </h3>

            <div className="space-y-3 text-white/70">

              <p>sekretariat@lpkia.ac.id</p>

              <p>0812-2090-7680</p>

            </div>

          </div>



          <div>

            <h3 className="mb-4 text-xl font-bold">

              Instagram Kami

            </h3>

            <div className="space-y-5">

              <a
                href="https://instagram.com/lpkia_sisteminformasi"
                target="_blank"
                className="flex items-center gap-3 text-white/80 transition hover:text-pink-400"
              >

                <Camera />

                @lpkia_sisteminformasi

              </a>

              <a
                href="https://instagram.com/si.lpkia_25"
                target="_blank"
                className="flex items-center gap-3 text-white/80 transition hover:text-pink-400"
              >

                <Camera />

                @si.lpkia_25

              </a>

            </div>

          </div>

        </div>



        <div className="mt-12 border-t border-white/10 pt-7 text-center text-white/50">

          © 2026 KampusClass.
          All rights reserved.

        </div>

      </footer>

    </main>
  );
}