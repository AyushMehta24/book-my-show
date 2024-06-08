// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        contact: '1234567890',
        role: 'user',
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password456',
        contact: '0987654321',
        role: 'owner',
      },
    ],
  })

  // Seed Theaters
  await prisma.theaters.createMany({
    data: [
      {
        name: 'Cinema One',
        address: '123 Movie St',
      },
      {
        name: 'Cinema Two',
        address: '456 Film Ave',
      },
    ],
  })

  // Seed Screens
  await prisma.screens.createMany({
    data: [
      {
        theater_id: 'theater1', // Ensure these IDs are correct
      },
      {
        theater_id: 'theater2', // Ensure these IDs are correct
      },
    ],
  })

  // Seed Seat Types
  await prisma.seat_types.createMany({
    data: [
      {
        type: 'VIP',
        fair: 20.0,
      },
      {
        type: 'Regular',
        fair: 10.0,
      },
    ],
  })

  // Seed Seats
  await prisma.seats.createMany({
    data: [
      {
        screen_id: 'screen1', // Ensure these IDs are correct
        seatTypeId: 'seatType1', // Ensure these IDs are correct
      },
      {
        screen_id: 'screen2', // Ensure these IDs are correct
        seatTypeId: 'seatType2', // Ensure these IDs are correct
      },
    ],
  })

  // Seed Movie Details
  await prisma.movie_details.createMany({
    data: [
      {
        name: 'Inception',
        description: 'A mind-bending thriller',
        date: '2024-06-07',
        start_time: '19:00',
        screen_id: 'screen1', // Ensure these IDs are correct
      },
      {
        name: 'The Matrix',
        description: 'A sci-fi classic',
        date: '2024-06-08',
        start_time: '21:00',
        screen_id: 'screen2', // Ensure these IDs are correct
      },
    ],
  })

  // Seed Event Details
  await prisma.event_details.createMany({
    data: [
      {
        name: 'Concert',
        description: 'Live music concert',
        date: '2024-06-10',
        start_time: '18:00',
        address: '789 Music Rd',
        fair: 50.0,
      },
    ],
  })

  // Seed Bookings
  await prisma.bookings.createMany({
    data: [
      {
        user_id: 'user1', // Ensure these IDs are correct
        event_id: 'event1', // Ensure these IDs are correct
        event_type: 'event',
      },
    ],
  })

  // Seed Tickets
  await prisma.tickets.createMany({
    data: [
      {
        booking_id: 'booking1', // Ensure these IDs are correct
        seat_id: 'seat1', // Ensure these IDs are correct
      },
    ],
  })

  // Seed Payments
  await prisma.payments.createMany({
    data: [
      {
        booking_id: 'booking1', // Ensure these IDs are correct
        fair: 50.0,
        status: true,
      },
    ],
  })

  console.log('Seed data inserted successfully')
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
