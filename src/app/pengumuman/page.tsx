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

type Pengumuman = {

  id: string;

  judul: string;

  isi: string;

  author?: {

    name: string;
  };
};

export default function PengumumanPage() {

  const {
    data: session,
  } = useSession();

  const role =
    (session?.user as any)?.role;

  const [pengumuman,
    setPengumuman] =
    useState<Pengumuman[]>([]);



  async function getPengumuman() {

    const res =
      await fetch(
        "/api/pengumuman"
      );

    const data =
      await res.json();

    setPengumuman(data);
  }



  useEffect(() => {

    getPengumuman();

  }, []);




  return (

    <div className="flex min-h-screen bg-[#0f172a] text-white">

      <Sidebar role={role || ""} />



      <main className="flex-1 p-5 md:ml-72 md:p-10">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-sm uppercase tracking-widest text-blue-400">

            Announcement Management

          </p>

          <h1 className="mt-3 text-5xl font-black">

            Pengumuman 

          </h1>

          <p className="mt-3 text-slate-400">

            Semua pengumuman terbaru kelas.

          </p>

        </div>



        {/* LIST */}

        <div className="space-y-6">

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

            </div>
          ))}

        </div>

      </main>

    </div>
  );
}