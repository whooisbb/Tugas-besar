"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSession,
} from "next-auth/react";

import {
  toast,
} from "sonner";

import Swal
from "sweetalert2";

import Sidebar
from "@/components/Sidebar";

import {
  Bell,
  CalendarDays,
  Pencil,
  Sparkles,
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

export default function KetuaDashboard() {

  const {
    data: session,
    status,
  } = useSession();

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  const [editId,
    setEditId] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

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
      role !== "KETUA_KELAS"
      &&
      role !== "KETUA"
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



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      let res;

      // UPDATE

      if (editId !== "") {

        res =
          await fetch(
            `/api/pengumuman/${editId}`,
            {

              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                title,

                content,
              }),
            }
          );
      }

      // CREATE

      else {

        res =
          await fetch(
            "/api/pengumuman",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                title,

                content,
              }),
            }
          );
      }

      const data =
        await res.json();

      if (!res.ok) {

        toast.error(
          data.message ||
          "Gagal"
        );

        setLoading(false);

        return;
      }

      toast.success(

        editId
          ? "Pengumuman berhasil diupdate"
          : "Pengumuman berhasil dibuat"
      );

      setTitle("");

      setContent("");

      setEditId("");

      getPengumuman();

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error(
        "Terjadi error"
      );

      setLoading(false);
    }
  }



  async function handleDelete(
    id: string
  ) {

    const result =
      await Swal.fire({

        title:
          "Hapus Pengumuman?",

        text:
          "Data tidak bisa dikembalikan",

        icon:
          "warning",

        showCancelButton:
          true,

        confirmButtonColor:
          "#dc2626",

        cancelButtonColor:
          "#6b7280",

        confirmButtonText:
          "Ya, hapus",

        cancelButtonText:
          "Batal",
      });

    if (!result.isConfirmed)
      return;

    const res =
      await fetch(
        `/api/pengumuman/${id}`,
        {
          method: "DELETE",
        }
      );

    if (res.ok) {

      toast.success(
        "Pengumuman berhasil dihapus"
      );

      getPengumuman();
    }

    else {

      toast.error(
        "Gagal menghapus"
      );
    }
  }



  function handleEdit(
    item: Pengumuman
  ) {

    setEditId(item.id);

    setTitle(item.judul);

    setContent(item.isi);

    window.scrollTo({

      top: 0,

      behavior: "smooth",
    });
  }



  return (

    <div className="flex min-h-screen bg-[#0f172a] text-white">

      <Sidebar role="KETUA_KELAS" />



      <main className="flex-1 p-5 md:ml-72 md:p-10">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <p className="text-sm uppercase tracking-widest text-blue-400">

              Dashboard Ketua Kelas

            </p>

            <h1 className="mt-2 text-5xl font-black">

              Selamat Datang 

            </h1>

            <p className="mt-3 text-slate-400">

              Kelola pengumuman dan aktivitas kelas modern.

            </p>

          </div>



          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">

            <p className="text-sm text-slate-400">

              Logged in as

            </p>

            <h3 className="mt-1 text-xl font-bold">

              {session?.user?.name}

            </h3>

          </div>

        </div>



        {/* STATS */}

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-blue-500 to-indigo-600 p-7 shadow-2xl">

            <Bell size={38} />

            <h2 className="mt-5 text-5xl font-black">

              {pengumuman.length}

            </h2>

            <p className="mt-2 text-white/80">

              Total Pengumuman

            </p>

          </div>



          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-purple-500 to-pink-500 p-7 shadow-2xl">

            <CalendarDays size={38} />

            <h2 className="mt-5 text-5xl font-black">

              {jadwal.length}

            </h2>

            <p className="mt-2 text-white/80">

              Jadwal Aktif

            </p>

          </div>



          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500 to-green-600 p-7 shadow-2xl">

            <Sparkles size={38} />

            <h2 className="mt-5 text-5xl font-black">

              Active

            </h2>

            <p className="mt-2 text-white/80">

              System Status

            </p>

          </div>

        </div>



        {/* COMPOSE */}

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-2xl bg-blue-500/20 p-3">

              <Pencil />

            </div>

            <div>

              <h2 className="text-3xl font-black">

                {
                  editId
                    ? "Edit Pengumuman"
                    : "Buat Pengumuman"
                }

              </h2>

              <p className="text-slate-400">

                Bagikan informasi terbaru untuk mahasiswa.

              </p>

            </div>

          </div>



          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Masukkan judul pengumuman..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />



            <textarea
              placeholder="Tulis isi pengumuman..."
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
            />



            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-bold transition hover:scale-105 disabled:opacity-50"
            >

              {
                loading
                  ? "Loading..."
                  : editId
                  ? "Update Pengumuman"
                  : "Publish Pengumuman"
              }

            </button>

          </form>

        </div>



        {/* FEED */}

        <div className="mt-10 space-y-6">

          {pengumuman.map((item) => (

            <div
              key={item.id}
              className="rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black">

                  {
                    item.author?.name?.charAt(0)
                  }

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    {item.judul}

                  </h2>

                  <p className="text-slate-400">

                    by {item.author?.name}

                  </p>

                </div>

              </div>



              <p className="mt-6 leading-relaxed text-slate-300">

                {item.isi}

              </p>



              <div className="mt-7 flex gap-4">

                <button
                  onClick={() =>
                    handleEdit(item)
                  }
                  className="rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:scale-105"
                >

                  Edit

                </button>

                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="rounded-2xl bg-red-500 px-5 py-3 font-semibold transition hover:scale-105"
                >

                  Delete

                </button>

              </div>

            </div>
          ))}

        </div>



        {/* RECENT JADWAL */}

        <div className="mt-14">

          <h2 className="mb-6 text-3xl font-black">

            Jadwal Susulan Tersedia

          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {jadwal.slice(0, 3).map((item) => (

              <div
                key={item.id}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >

                <h3 className="text-2xl font-black">

                  Mata Kuliah: {item.matkul}

                </h3>

                <div className="mt-5 space-y-3 text-slate-300">

                  <p>

                   Hari: {item.hari}

                  </p>

                  <p>

                   Jam: {item.jam}

                  </p>

                  <p>

                   Ruangan: {item.ruangan}

                  </p>

                  <p>

                      Dosen: {item.dosen}

                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </main>

    </div>
  );
}