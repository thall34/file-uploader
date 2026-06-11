import { prisma } from './lib/prisma.js';

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'Tyler',
            password: '123',
            folders: {
                create: {
                    name: 'new folder',
                    files: {
                        create: {
                            fileName: 'new file',
                            path: 'new_file',
                            size: 2000,
                        }
                    }
                }
            }
        },
        include: {
            folders: true,
        }
    })
    console.log('Created user: ', user);

    const allUsers = await prisma.user.findMany({
        include: {
            folders: true,
        }
    })

    console.log('All users: ', JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });