/* eslint-disable perfectionist/sort-imports */
import 'dotenv/config';
import type { Prisma } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { hash } from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const firstNames = [
  'Ahmad',
  'Budi',
  'Citra',
  'Dewi',
  'Eko',
  'Fitri',
  'Gilang',
  'Hana',
  'Irfan',
  'Joko',
  'Kartika',
  'Lukman',
  'Maya',
  'Nanda',
  'Oka',
  'Putri',
  'Qori',
  'Rizky',
  'Sari',
  'Teguh',
  'Umi',
  'Vina',
  'Wahyu',
  'Xena',
  'Yuda',
  'Zahra',
  'Agus',
  'Bunga',
  'Cahyo',
  'Dian',
  'Endah',
  'Fajar',
  'Gita',
  'Hendra',
  'Indah',
  'Jati',
  'Kurnia',
  'Lestari',
  'Murti',
  'Novi',
  'Olivia',
  'Pram',
  'Ratna',
  'Sandi',
  'Tari',
  'Untung',
  'Vero',
  'Wulan',
  'Yoga',
  'Zainab',
  'Adi',
  'Bayu',
  'Cindy',
  'Doni',
  'Erna',
  'Farid',
  'Galuh',
  'Hesti',
  'Ipul',
  'Januar',
  'Kiki',
  'Lina',
  'Miko',
  'Nina',
  'Opik',
  'Pia',
  'Rama',
  'Sinta',
  'Tomi',
  'Ujang',
  'Vivi',
  'Wawan',
  'Yanti',
  'Zul',
  'Ani',
  'Beni',
  'Cici',
  'Dodi',
  'Euis',
  'Fani',
  'Gugun',
  'Hary',
  'Intan',
  'Jaja',
  'Kemas',
  'Leni',
  'Maman',
  'Neneng',
  'Oni',
  'Puji',
  'Roni',
  'Santi',
  'Tuti',
  'Udin',
  'Vani',
  'Winda',
  'Yani',
  'Zaki',
];

const lastNames = [
  'Pratama',
  'Wijaya',
  'Kusuma',
  'Putra',
  'Sari',
  'Dewi',
  'Utami',
  'Handayani',
  'Gunawan',
  'Wibowo',
  'Hidayat',
  'Ningsih',
  'Santoso',
  'Lestari',
  'Saputra',
  'Permadi',
  'Anggraini',
  'Nugroho',
  'Wulandari',
  'Hartono',
  'Purnomo',
  'Susanti',
  'Haryanto',
  'Rahmawati',
  'Setiawan',
  'Astuti',
  'Mulyana',
  'Fitriani',
  'Suryadi',
  'Maryati',
  'Budiman',
  'Pertiwi',
  'Nasution',
  'Rachman',
  'Fauzi',
  'Yulianti',
  'Iskandar',
  'Hasanah',
  'Pamungkas',
  'Maulana',
  'Siregar',
  'Kurniawan',
  'Novianti',
  'Sitorus',
  'Marpaung',
  'Sinaga',
  'Manurung',
  'Situmorang',
  'Simanjuntak',
  'Sianturi',
];

const titleWords = [
  'Workshop',
  'Seminar',
  'Pelatihan',
  'Lomba',
  'Kompetisi',
  'Diskusi',
  'Webinar',
  'Kuliah Umum',
  'Bootcamp',
  'Hackathon',
  'Expo',
  'Pameran',
  'Festival',
  'Roadshow',
  'Kampanye',
  'Bakti Sosial',
  'Pengabdian',
  'Studi Banding',
  'Kunjungan',
  'Rapat',
  'Musyawarah',
  'Konser',
  'Pentas Seni',
  'Olahraga',
  'Turnamen',
  'Bedah Buku',
  'Diskusi Panel',
  'Focus Group',
  'Ekspedisi',
  'Lokakarya',
];

const activitySubjects = [
  'Robotik',
  'AI',
  'IoT',
  'Pemrograman',
  'Jaringan',
  'Keamanan Siber',
  'Data Science',
  'Cloud Computing',
  'Embedded System',
  'Mikrokontroler',
  'Elektronika',
  'Mekatronika',
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Blockchain',
  'Augmented Reality',
  'Virtual Reality',
  'Game Development',
  'Mobile Development',
  'Web Development',
  'UI/UX Design',
  '3D Printing',
  'Drone',
  'Otomasi Industri',
  'Sistem Kendali',
  'Pemrosesan Sinyal',
  'Komunikasi Data',
  'Robot Humanoid',
  'Robot Mobile',
];

const tempat = [
  'Lab Komputer A',
  'Lab Elektronika',
  'Aula Kampus',
  'Ruang Seminar',
  'Gedung Serbaguna',
  'Ruang Kelas 101',
  'Ruang Kelas 202',
  'Perpustakaan',
  'Student Center',
  'Lapangan Kampus',
  'Musholla Kampus',
  'Gazebo Kampus',
  'Co-working Space',
  'Ruang Rapat Utama',
  'Auditorium',
];

function randomMarkdown(title: string): string {
  const paragraphs = [
    `## ${title}\n\nKegiatan ini diselenggarakan dalam rangka mengembangkan kemampuan mahasiswa di bidang teknologi dan rekayasa.`,
    `Kegiatan ini bertujuan untuk memberikan wawasan dan pengalaman praktis kepada peserta mengenai perkembangan terbaru di bidang terkait.\n\nPeserta akan mendapatkan materi dari para ahli yang berpengalaman di bidangnya masing-masing.`,
    `### Materi yang Dibahas\n\n1. Pengenalan konsep dasar\n2. Studi kasus dan implementasi\n3. Praktik langsung\n4. Diskusi dan tanya jawab\n5. Evaluasi dan penutup`,
    `### Manfaat\n\nDengan mengikuti kegiatan ini, peserta diharapkan mampu:\n\n- Memahami konsep-konsep fundamental\n- Menerapkan ilmu yang didapat dalam proyek nyata\n- Memperluas jaringan pertemanan dan profesional\n- Mendapatkan sertifikat keikutsertaan`,
    `### Dokumentasi\n\nDokumentasi kegiatan akan tersedia setelah acara selesai. Pantau terus website ELIPS untuk informasi lebih lanjut mengenai kegiatan-kegiatan lainnya.`,
  ];
  return paragraphs.slice(0, 2 + Math.floor(Math.random() * 4)).join('\n\n');
}

const anggotaMessages = [
  'Berkarya dan berinovasi untuk kemajuan bersama',
  'Terus belajar dan berkembang di bidang robotik',
  'Menginspirasi generasi penerus melalui teknologi',
  'Bersama ELIPS, wujudkan mimpi masa depan',
  'Teknologi adalah jembatan menuju perubahan',
  'Kolaborasi adalah kunci kesuksesan',
  'Dari mahasiswa, oleh mahasiswa, untuk mahasiswa',
  'Membangun ekosistem robotik yang berkelanjutan',
  'Belajar, berkarya, dan berbagi ilmu',
  'Robotik bukan hanya hobi, tapi masa depan',
  'Kreativitas tanpa batas dengan teknologi',
  'Sinergi antara teori dan praktik',
  'Berani bermimpi, berani beraksi',
  'Inovasi bermula dari langkah kecil',
  'Mari bersama memajukan teknologi Indonesia',
  'Dengan robot, kita bisa mengubah dunia',
  'Semangat kolaborasi untuk inovasi',
  'Mengukir prestasi melalui karya nyata',
  'Teknologi untuk kemaslahatan umat',
  'Bersatu dalam karya, berprestasi dalam aksi',
];

const visiStatements = [
  'Menjadi pusat pengembangan teknologi robotik yang unggul dan berdaya saing global.',
  'Mewujudkan ekosistem inovasi yang berkelanjutan dan berdampak luas bagi masyarakat.',
  'Menjadi wadah pengembangan potensi mahasiswa di bidang teknologi dan rekayasa.',
  'Menciptakan generasi technopreneur yang kreatif dan inovatif.',
  'Menjadi organisasi yang mampu menghasilkan karya-karya monumental di bidang robotik.',
  'Membangun sumber daya manusia yang unggul dan berkarakter di era digital.',
  'Menjadi katalisator perubahan melalui pengembangan teknologi yang inklusif.',
  'Menginspirasi dan memberdayakan generasi muda untuk berkontribusi dalam kemajuan teknologi.',
];

const misiStatements = [
  'Menyelenggarakan pelatihan dan workshop di bidang teknologi secara berkala.',
  'Mengembangkan proyek-proyek inovatif yang aplikatif dan bermanfaat.',
  'Menjalin kerjasama dengan berbagai pihak untuk mengembangkan kapasitas organisasi.',
  'Menciptakan lingkungan yang kondusif untuk belajar dan berkarya.',
  'Mempersiapkan anggota untuk berkompetisi di tingkat nasional dan internasional.',
  'Mengadakan kegiatan pengabdian masyarakat berbasis teknologi.',
  'Membangun jaringan alumni yang solid dan berkontribusi bagi organisasi.',
  'Mengembangkan budaya riset dan inovasi di kalangan mahasiswa.',
  'Menyediakan akses dan sumber belajar yang memadai bagi seluruh anggota.',
  'Mendorong terciptanya solusi teknologi untuk permasalahan nyata di masyarakat.',
  'Melakukan pendokumentasian dan publikasi seluruh kegiatan secara transparan.',
  'Mengutamakan integritas, profesionalisme, dan kekeluargaan dalam setiap aktivitas.',
  'Mengembangkan sistem kaderisasi yang terstruktur dan berkelanjutan.',
  'Mengoptimalkan pemanfaatan teknologi informasi dalam pengelolaan organisasi.',
  'Menyelenggarakan forum diskusi ilmiah secara rutin untuk pengembangan wawasan.',
];

const sejarahTitles = [
  'Berdirinya ELIPS',
  'Tahun Perdana',
  'Kepengurusan Pertama',
  'Reorganisasi',
  'Era Digital',
  'Kolaborasi Nasional',
  'Lomba Robotik Pertama',
  'Pengabdian Masyarakat',
  'Seminar Nasional',
  'Studi Banding',
  'Pelantikan Pengurus',
  'Rakerda',
  'Dies Natalis',
  'Workshop Regional',
  'Kompetisi Internal',
  'Pameran Teknologi',
  'Peluncuran Program Kerja',
  'Masa Bakti Baru',
  'Penghargaan Prestasi',
  'Ekspedisi Robotik',
  'Festival Teknologi',
  'Bakti Sosial',
  'Bedah Buku',
  'Kuliah Umum',
  'Hackathon',
  'Kunjungan Industri',
  'Magang Bersama',
  'Seminar Karir',
  'Webinar Nasional',
  'Roadshow Kampus',
];

async function seedUsers() {
  const password = await hash('password123', 12);
  const usedEmails = new Set<string>();
  const data: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < 110; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    while (usedEmails.has(email)) {
      email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}_${Math.random().toString(36).slice(2, 5)}@example.com`;
    }
    usedEmails.add(email);

    data.push({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      is_active: Math.random() > 0.1,
      created_at: randomDate(new Date('2023-01-01'), new Date('2025-12-31')),
      updated_at: randomDate(new Date('2024-01-01'), new Date('2026-06-30')),
    });
  }

  await prisma.user.createMany({ data });
  console.log(`  ✓ ${data.length} users seeded`);
}

async function seedActivities() {
  const data: Prisma.ActivityCreateInput[] = [];

  for (let i = 0; i < 110; i++) {
    const subject = activitySubjects[Math.floor(Math.random() * activitySubjects.length)];
    const kata = titleWords[Math.floor(Math.random() * titleWords.length)];
    const tempatAcak = tempat[Math.floor(Math.random() * tempat.length)];
    const title = `${kata} ${subject} ${tempatAcak}`;
    const createdAt = randomDate(new Date('2022-01-01'), new Date('2026-06-30'));

    data.push({
      title,
      description: `Kegiatan ${kata.toLowerCase()} mengenai ${subject} yang diselenggarakan di ${tempatAcak}.`,
      markdown_file: randomMarkdown(title),
      cover_image: Math.random() > 0.4 ? `/uploads/activity_${i + 1}.jpg` : null,
      created_at: createdAt,
      updated_at: Math.random() > 0.3 ? randomDate(createdAt, new Date('2026-07-15')) : null,
    });
  }

  await prisma.activity.createMany({ data });
  console.log(`  ✓ ${data.length} activities seeded`);
}

async function seedMembers() {
  const data: Prisma.MemberCreateInput[] = [];

  for (let i = 0; i < 110; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const isLeader = i < 8;
    const createdAt = randomDate(new Date('2022-01-01'), new Date('2026-06-30'));

    data.push({
      name,
      role: isLeader ? 'ketua' : 'anggota',
      message: anggotaMessages[Math.floor(Math.random() * anggotaMessages.length)],
      cover_image: Math.random() > 0.5 ? `/uploads/member_${i + 1}.jpg` : null,
      is_leader_active: isLeader ? i < 3 : false,
      is_tamat: i > 30 ? Math.random() > 0.6 : false,
      created_at: createdAt,
      updated_at: Math.random() > 0.3 ? randomDate(createdAt, new Date('2026-07-15')) : null,
    });
  }

  await prisma.member.createMany({ data });
  console.log(`  ✓ ${data.length} members seeded`);
}

async function seedSejarah() {
  const data: Prisma.sejarahCreateInput[] = [];

  for (let i = 0; i < 105; i++) {
    const titleBase = sejarahTitles[Math.floor(Math.random() * sejarahTitles.length)];
    const tahun = 2018 + Math.floor(Math.random() * 8);
    const title = `${titleBase} ${tahun}`;
    const createdAt = randomDate(new Date('2022-01-01'), new Date('2026-06-30'));

    data.push({
      title,
      description: `Catatan sejarah mengenai ${titleBase.toLowerCase()} yang terjadi pada tahun ${tahun}. Ini adalah momen penting dalam perjalanan organisasi ELIPS. ${Math.random() > 0.5 ? 'Kegiatan ini diikuti oleh seluruh anggota dan berjalan dengan lancar.' : 'Acara ini mendapat sambutan positif dari berbagai pihak dan menjadi tonggak sejarah baru.'}`,
      created_at: createdAt,
      updated_at: Math.random() > 0.3 ? randomDate(createdAt, new Date('2026-07-15')) : null,
    });
  }

  await prisma.sejarah.createMany({ data });
  console.log(`  ✓ ${data.length} sejarah entries seeded`);
}

async function seedVisiMisi() {
  const data: Prisma.Visi_dan_misiCreateInput[] = [];

  for (let i = 0; i < 100; i++) {
    const tahunMulai = 2018 + Math.floor(Math.random() * 8);
    const tahunAkhir = tahunMulai + 2 + Math.floor(Math.random() * 3);

    data.push({
      visi: visiStatements[Math.floor(Math.random() * visiStatements.length)],
      misi: misiStatements.slice(0, 3 + Math.floor(Math.random() * 5)).join('\n'),
      is_active: i === 0,
      tahun_mulai: tahunMulai,
      tahun_akhir: tahunAkhir,
      created_at: randomDate(new Date('2022-01-01'), new Date('2026-06-30')),
      updated_at:
        Math.random() > 0.3 ? randomDate(new Date('2023-01-01'), new Date('2026-07-15')) : null,
    });
  }

  await prisma.visi_dan_misi.createMany({ data });
  console.log(`  ✓ ${data.length} visi & misi entries seeded`);
}

async function main() {
  console.log('\n🌱 Seeding database...\n');

  console.log('Seeding users...');
  await seedUsers();

  console.log('Seeding activities...');
  await seedActivities();

  console.log('Seeding members...');
  await seedMembers();

  console.log('Seeding sejarah...');
  await seedSejarah();

  console.log('Seeding visi & misi...');
  await seedVisiMisi();

  console.log('\n✅ Seeding complete!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
