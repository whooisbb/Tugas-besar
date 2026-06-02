"use client";

import {
  useState,
} from "react";

import {
  signIn,
} from "next-auth/react";

import {
  useRouter,
} from "next/navigation";

import Link
from "next/link";

import {
  GraduationCap,
  Mail,
  Lock,
} from "lucide-react";

export default function LoginPage() {

  const router =
    useRouter();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);



  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const result =
        await signIn(
          "credentials",
          {

            email,

            password,

            redirect: false,
          }
        );

      // LOGIN GAGAL

      if (result?.error) {

        alert(
          "Email atau password salah"
        );

        setLoading(false);

        return;
      }

      // AMBIL SESSION

      const sessionRes =
        await fetch(
          "/api/auth/session"
        );

      const session =
        await sessionRes.json();

      const role =
        session?.user?.role;

      // REDIRECT ROLE

      if (role === "DOSEN") {

        router.push(
          "/dashboard/dosen"
        );
      }

      else if (
        role === "KETUA_KELAS"
        ||
        role === "KETUA"
      ) {

        router.push(
          "/dashboard/ketua-kelas"
        );
      }

      else if (
        role === "MAHASISWA"
      ) {

        router.push(
          "/dashboard/mahasiswa"
        );
      }

      else {

        router.push("/");
      }

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert(
        "Terjadi error"
      );

      setLoading(false);
    }
  }



  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">

      <div className="grid min-h-screen md:grid-cols-2">

        {/* LEFT */}

        <div className="relative hidden overflow-hidden md:flex">

          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-pink-500/30 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />



          <div className="relative z-10 flex flex-col justify-center px-16 text-white">

            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl">

                <GraduationCap
                  size={48}
                />

              </div>

              <div>

                <h1 className="text-5xl font-black">

                  KampusClass

                </h1>

                <p className="mt-2 text-white/70">

                  Smart Campus Platform

                </p>

              </div>

            </div>

            <h2 className="max-w-xl text-6xl font-black leading-tight">

              Selamat Datang
              di Platform
              Kelas Modern.

            </h2>

            <p className="mt-8 max-w-lg text-lg text-white/70">

              Kelola pengumuman,
              jadwal, dan komunikasi
              kelas dalam satu platform
              digital modern.

            </p>

            <div className="mt-12 flex gap-5">

              <a
                href="https://instagram.com/lpkia_sisteminformasi"
                target="_blank"
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl transition hover:scale-105"
              >

                @lpkia_sisteminformasi

              </a>

              <a
                href="https://instagram.com/si.lpkia_25"
                target="_blank"
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl transition hover:scale-105"
              >

                @si.lpkia_25

              </a>

            </div>

          </div>

        </div>



        {/* RIGHT */}

        <div className="flex items-center justify-center p-6">

          <div className="w-full max-w-md rounded-[32px] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">

            <div className="mb-10 text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl">

                <GraduationCap
                  size={52}
                  className="text-white"
                />

              </div>

              <h1 className="mt-6 text-4xl font-black text-white">

                Login

              </h1>

              <p className="mt-3 text-white/70">

                Masuk ke akun KampusClass

              </p>

            </div>



            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm text-white/70">

                  Email

                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4">

                  <Mail
                    size={20}
                    className="text-white/70"
                  />

                  <input
                    type="email"
                    placeholder="Masukkan email"
                    className="w-full bg-transparent py-4 text-white outline-none placeholder:text-white/40"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>



              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm text-white/70">

                  Password

                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4">

                  <Lock
                    size={20}
                    className="text-white/70"
                  />

                  <input
                    type="password"
                    placeholder="Masukkan password"
                    className="w-full bg-transparent py-4 text-white outline-none placeholder:text-white/40"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>



              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-white py-4 font-bold text-blue-700 transition hover:scale-[1.02] disabled:opacity-50"
              >

                {
                  loading
                    ? "Loading..."
                    : "Login"
                }

              </button>

            </form>



            <Link
              href="/"
              className="mt-6 block text-center text-sm text-white/60 transition hover:text-white"
            >

              ← Kembali ke Beranda

            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}