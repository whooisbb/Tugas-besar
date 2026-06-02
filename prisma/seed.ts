import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Mahasiswa",
        email: "mahasiswa@gmail.com",
        password: hashedPassword,
        role: "MAHASISWA",
      },

      {
        name: "Ketua Kelas",
        email: "ketua@gmail.com",
        password: hashedPassword,
        role: "KETUA_KELAS",
      },

      {
        name: "Dosen",
        email: "dosen@gmail.com",
        password: hashedPassword,
        role: "DOSEN",
      },
    ],
  });

  console.log("Seeder berhasil");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });