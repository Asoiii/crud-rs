const dataWilayah = [
  {
    provinsi: "Jawa Barat",
    kabupaten: [
      {
        nama: "Bandung",
        kecamatan: [
          {
            nama: "Coblong",
            kelurahan: ["Dago", "Ciumbuleuit"],
          },
          {
            nama: "Cicendo",
            kelurahan: ["Arjuna", "Husen"],
          },
        ],
      },
      {
        nama: "Bogor",
        kecamatan: [
          {
            nama: "Cibinong",
            kelurahan: ["Pondok Rajeg", "Karadenan"],
          },
        ],
      },
    ],
  },
  {
    provinsi: "Jawa Tengah",
    kabupaten: [
      {
        nama: "Semarang",
        kecamatan: [
          {
            nama: "Candisari",
            kelurahan: ["Gajahmungkur", "Kedungmundu"],
          },
        ],
      },
    ],
  },
];
export default dataWilayah;

export const dataPasien = [
  {
    id: 1,
    noRekamMedis: "123456789",
    nama: "Dwi ",
    jenisKelamin: "Laki-laki",
    tglLahir: "2022-01-01",
    umur: 20,
    noTelp: "08123456789",
  },
  {
    id: 2,
    noRekamMedis: "123456789",
    nama: "Alisa",
    jenisKelamin: "Perempuan",
    tglLahir: "2001-02-05",
    umur: 23,
    noTelp: "08123456789",
  },
  {
    id: 3,
    noRekamMedis: "123456789",
    nama: "Iwan",
    jenisKelamin: "Laki-laki",
    tglLahir: "2022-05-03",
    umur: 20,
    noTelp: "08123456789",
  },
];

export const dataBayi = [
  {
    id: 1,
    noRekamMedis: "13212312",
    kelas: "VVIP ",
    ruang: "VVIP 809",
    nama: `FATIMAH ZAHRO`,
    dokter: "maya munigar apandi spjp.dr",
  },
  {
    id: 2,
    noRekamMedis: "99212314",
    kelas: "kelas 1 ",
    ruang: "ODC 327",
    nama: `ANNA RINA FRIDYANTI`,
    dokter: "Kencana shinta Moser,SpOG,dr",
  },
  {
    id: 3,
    noRekamMedis: "87357123",
    kelas: "ISOLASI",
    ruang: "ISOLASI 817",
    nama: "VIRA HANDAYANI",
    dokter: "Yuhana Fitra,Sp.PD.dr",
  },
];
