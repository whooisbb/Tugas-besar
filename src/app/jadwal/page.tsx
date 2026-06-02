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
  CalendarDays,
  Clock3,
  GraduationCap,
  MapPin,
  User,
  Plus,
  Sparkles,
} from "lucide-react";

type Jadwal = {

  id: string;

  matkul: string;

  hari: string;

  jam: string;

  ruangan: string;

  dosen: string;
};

export default function JadwalPage() {

  const {
    data: session,
  } = useSession();

  const role =
    (session?.user as any)?.role;

  const canManage =
    role === "DOSEN"
    ||
    role === "KETUA_KELAS"
    ||
    role === "KETUA";

  const [jadwal,
    setJadwal] =
    useState<Jadwal[]>([]);

  const [matkul,
    setMatkul] =
    useState("");

  const [hari,
    setHari] =
    useState("");

  const [jam,
    setJam] =
    useState("");

  const [ruangan,
    setRuangan] =
    useState("");

  const [dosen,
    setDosen] =
    useState("");

  const [editId,
    setEditId] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);



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

    getJadwal();

  }, []);




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
            `/api/jadwal/${editId}`,
            {

              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                matkul,
                hari,
                jam,
                ruangan,
                dosen,
              }),
            }
          );
      }

      // CREATE

      else {

        res =
          await fetch(
            "/api/jadwal",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                matkul,
                hari,
                jam,
                ruangan,
                dosen,
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
          ? "Jadwal berhasil diupdate"
          : "Jadwal berhasil dibuat"
      );

      setMatkul("");
      setHari("");
      setJam("");
      setRuangan("");
      setDosen("");
      setEditId("");

      getJadwal();

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
          "Hapus Jadwal?",

        text:
          "Data tidak bisa dikembalikan",

        icon:
          "warning",

        showCancelButton:
          true,

        confirmButtonColor:
          "#ef4444",

        cancelButtonColor:
          "#64748b",

        confirmButtonText:
          "Ya, hapus",

        cancelButtonText:
          "Batal",
      });

    if (!result.isConfirmed)
      return;

    const res =
      await fetch(
        `/api/jadwal/${id}`,
        {
          method: "DELETE",
        }
      );

    if (res.ok) {

      toast.success(
        "Jadwal berhasil dihapus"
      );

      getJadwal();
    }

    else {

      toast.error(
        "Gagal menghapus"
      );
    }
  }



  function handleEdit(
    item: Jadwal
  ) {

    setEditId(item.id);

    setMatkul(item.matkul);

    setHari(item.hari);

    setJam(item.jam);

    setRuangan(item.ruangan);

    setDosen(item.dosen);

    window.scrollTo({

      top: 0,

      behavior: "smooth",
    });
  }



  return (

    <div className="flex min-h-screen bg-[#0f172a] text-white">

      <Sidebar role={role || ""} />



      <main className="flex-1 p-5 md:ml-72 md:p-10">

        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm uppercase tracking-widest text-blue-400">

              Schedule Management

            </p>

            <h1 className="mt-3 text-5xl font-black">

              Jadwal Kuliah 📚

            </h1>

            <p className="mt-3 text-slate-400">

              Kelola dan lihat jadwal kuliah modern.

            </p>

          </div>



          {/* STATS */}

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-purple-500 to-pink-500 p-6 shadow-2xl">

              <CalendarDays size={34} />

              <h2 className="mt-4 text-4xl font-black">

                {jadwal.length}

              </h2>

              <p className="mt-2 text-white/80">

                Jadwal Aktif

              </p>

            </div>



            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500 to-green-600 p-6 shadow-2xl">

              <Sparkles size={34} />

              <h2 className="mt-4 text-4xl font-black">

                Active

              </h2>

              <p className="mt-2 text-white/80">

                System Status

              </p>

            </div>

          </div>

        </div>



        {/* FORM */}

        {canManage && (

          <div className="mb-10 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">

            <div className="mb-7 flex items-center gap-4">

              <div className="rounded-2xl bg-blue-500/20 p-4">

                <Plus />

              </div>

              <div>

                <h2 className="text-3xl font-black">

                  {
                    editId
                      ? "Edit Jadwal"
                      : "Tambah Jadwal"
                  }

                </h2>

                <p className="text-slate-400">

                  Tambahkan jadwal kuliah terbaru.

                </p>

              </div>

            </div>



            <form
              onSubmit={handleSubmit}
              className="grid gap-5 md:grid-cols-2"
            >

              <input
                type="text"
                placeholder="Mata Kuliah"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-slate-500 focus:border-blue-500"
                value={matkul}
                onChange={(e) =>
                  setMatkul(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Hari"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-slate-500 focus:border-blue-500"
                value={hari}
                onChange={(e) =>
                  setHari(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Jam"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-slate-500 focus:border-blue-500"
                value={jam}
                onChange={(e) =>
                  setJam(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Ruangan"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-slate-500 focus:border-blue-500"
                value={ruangan}
                onChange={(e) =>
                  setRuangan(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Dosen"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-slate-500 focus:border-blue-500 md:col-span-2"
                value={dosen}
                onChange={(e) =>
                  setDosen(
                    e.target.value
                  )
                }
              />



              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-bold transition hover:scale-105 disabled:opacity-50 md:col-span-2"
              >

                {
                  loading
                    ? "Loading..."
                    : editId
                    ? "Update Jadwal"
                    : "Tambah Jadwal"
                }

              </button>

            </form>

          </div>
        )}



        {/* CARDS */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {jadwal.map((item) => (

            <div
              key={item.id}
              className="rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-2xl transition hover:border-blue-500/40 hover:scale-[1.02]"
            >

              <div className="mb-5 flex items-center justify-between">

                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4">

                  <GraduationCap />

                </div>

                <div className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-300">

                  {item.hari}

                </div>

              </div>



              <h2 className="text-3xl font-black">

                {item.matkul}

              </h2>



              <div className="mt-6 space-y-4 text-slate-300">

                <div className="flex items-center gap-3">

                  <Clock3 size={18} />

                  <span>

                    {item.jam}

                  </span>

                </div>



                <div className="flex items-center gap-3">

                  <MapPin size={18} />

                  <span>

                    {item.ruangan}

                  </span>

                </div>



                <div className="flex items-center gap-3">

                  <User size={18} />

                  <span>

                    {item.dosen}

                  </span>

                </div>

              </div>



              {canManage && (

                <div className="mt-7 flex gap-4">

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="flex-1 rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:scale-105"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="flex-1 rounded-2xl bg-red-500 px-5 py-3 font-semibold transition hover:scale-105"
                  >

                    Delete

                  </button>

                </div>
              )}

            </div>
          ))}

        </div>

      </main>

    </div>
  );
}