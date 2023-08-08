import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
 await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.com',
    posts: {
      create: {
        title: 'Join us for Prisma Day 2020',
        content: 'https://www.prisma.io/day',
        published: true,
      }
    }
  }
 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })