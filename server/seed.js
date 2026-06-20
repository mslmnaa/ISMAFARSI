const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
    },
  });
  console.log('Admin user seeded:', admin.username);

  // 2. Seed News
  const beritaPath = path.join(__dirname, '../src/data/berita.json');
  if (fs.existsSync(beritaPath)) {
    const beritaData = JSON.parse(fs.readFileSync(beritaPath, 'utf8'));
    for (const news of beritaData.news) {
      await prisma.news.create({
        data: {
          title: news.title,
          category: news.category,
          date: new Date(news.date),
          author: news.author,
          image: news.image,
          excerpt: news.excerpt,
          content: news.content,
        },
      });
    }
    console.log('News seeded');
  }

  // 3. Seed Events
  const eventsPath = path.join(__dirname, '../src/data/events.json');
  if (fs.existsSync(eventsPath)) {
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    for (const event of eventsData.events) {
      await prisma.event.create({
        data: {
          name: event.name,
          category: event.category,
          date: new Date(event.date),
          location: event.location,
          description: event.description,
          status: event.status,
        },
      });
    }
    console.log('Events seeded');
  }

  // 4. Seed Cabinet Members
  const kabinetPath = path.join(__dirname, '../src/data/kabinet.json');
  if (fs.existsSync(kabinetPath)) {
    const kabinetData = JSON.parse(fs.readFileSync(kabinetPath, 'utf8'));
    for (const member of kabinetData.members) {
      await prisma.cabinetMember.create({
        data: {
          name: member.name,
          position: member.position,
          institution: member.institution,
          photo: member.photo,
          description: member.description,
          cabinetName: kabinetData.cabinet || "Pranavritta 2024-2026",
        },
      });
    }
    console.log('Cabinet members seeded');
  }

  // 5. Seed Programs
  const programPath = path.join(__dirname, '../src/data/programKerja.json');
  if (fs.existsSync(programPath)) {
    const programData = JSON.parse(fs.readFileSync(programPath, 'utf8'));
    for (const dept of programData.programs) {
      for (const prog of dept.programs) {
        await prisma.program.create({
          data: {
            department: dept.department,
            name: prog.name,
            goal: prog.goal,
            description: prog.description,
          },
        });
      }
    }
    console.log('Programs seeded');
  }

  // 6. Seed Regions
  const wilayahPath = path.join(__dirname, '../src/data/wilayah.json');
  if (fs.existsSync(wilayahPath)) {
    const wilayahData = JSON.parse(fs.readFileSync(wilayahPath, 'utf8'));
    for (const region of wilayahData.regions) {
      await prisma.region.create({
        data: {
          name: region.name,
          code: region.code,
          description: region.description,
          provinces: JSON.stringify(region.provinces),
          members: region.members,
          universities: region.universities,
          head: region.head,
          email: region.email,
        },
      });
    }
    console.log('Regions seeded');
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
