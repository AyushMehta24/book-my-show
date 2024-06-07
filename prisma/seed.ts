import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      contact: '1234567890',
      role: 'admin',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'password123',
      contact: '0987654321',
      role: 'user',
    },
  })

  // Create theaters
  const theater1 = await prisma.theaters.create({
    data: {
      name: 'Grand Cinema',
      address: '123 Main St',
      owners: { connect: { id: user1.id } },
    },
  })

  // Create screens
  const screen1 = await prisma.screens.create({
    data: {
      theater: { connect: { id: theater1.id } },
    },
  })

  // Create seats
  const seat1 = await prisma.seats.create({
    data: {
      type: 'VIP',
      screen: { connect: { id: screen1.id } },
      fair: 15.0,
    },
  })

  const seat2 = await prisma.seats.create({
    data: {
      type: 'Regular',
      screen: { connect: { id: screen1.id } },
      fair: 10.0,
    },
  })

  // Create movie details
  const movie1 = await prisma.movie_details.create({
    data: {
      name: 'Inception',
      description: 'A mind-bending thriller',
      date: '2024-06-01',
      start_time: '18:00',
      screen: { connect: { id: screen1.id } },
    },
  })

  // Create event details
  const event1 = await prisma.event_details.create({
    data: {
      name: 'Concert',
      description: 'Live music event',
      date: '2024-06-15',
      start_time: '20:00',
      address: '456 Broadway',
      fair: 50.0,
    },
  })

  // Create bookings for the movie
  const booking1 = await prisma.bookings.create({
    data: {
      user: { connect: { id: user2.id } },
      event_id: movie1.id,
      event_type: 'movie',
      tickets: {
        create: [
          {
            seats: { connect: { id: seat1.id } },
          },
          {
            seats: { connect: { id: seat2.id } },
          },
        ],
      },
      payment: {
        create: {
          fair: 25.0,
          status: true,
        },
      },
    },
  })

  // Create bookings for the event
  const booking2 = await prisma.bookings.create({
    data: {
      user: { connect: { id: user2.id } },
      event_id: event1.id,
      event_type: 'event',
      tickets: {
        create: [
          {
            seats: { connect: { id: seat1.id } }, // Assuming seats are the same for simplicity
          },
          {
            seats: { connect: { id: seat2.id } },
          },
        ],
      },
      payment: {
        create: {
          fair: 100.0,
          status: true,
        },
      },
    },
  })

  console.log({ user1, user2, theater1, screen1, seat1, seat2, movie1, event1, booking1, booking2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
