import argon2 from 'argon2'
import { Request, Response } from 'express'
import generalResponse from '../helper/generalResponse.helper'
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, contact, role, password } = req.body
    const data: { id: string } = await Prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await argon2.hash(password),
        contact: contact,
        role: role,
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, data.id, 'User inserted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await Prisma.user.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        name: true,
        email: true,
        contact: true,
        role: true,
      },
    })
    if (data.length > 0) {
      return generalResponse(res, data, 'All Users', 'success', false, 200)
    } else {
      return generalResponse(res, data, 'There is no Users', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData: Partial<{ name: string; password: string; email: string; contact: string; role: string }> = req.body

    const validId: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    })

    if (validId !== null) {
      const data = await Prisma.user.update({
        where: { id: req.params.id },
        data: userData,
        select: {
          name: true,
          email: true,
          contact: true,
          role: true,
        },
      })
      return generalResponse(res, data, 'User Updated Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'User Not Found', 'success', false, 200)
    }
  } catch (error) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id

    const validId: { id: string } | null = await Prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    })

    if (validId !== null) {
      const deletedUser = await Prisma.$transaction(async (transaction) => {
        const data: { id: string; email: string } = await transaction.user.update({
          where: {
            id: id,
          },
          data: {
            is_deleted: true,
          },
          select: {
            id: true,
            email: true,
          },
        })

        const theater = await transaction.theaters.findMany({
          where: {
            owners: { some: { email: data.email } },
          },
          select: {
            id: true,
          },
        })

        if (theater) {
          theater.forEach(async (element) => {
            await transaction.theaters.update({
              where: {
                id: element.id,
              },
              data: {
                is_deleted: true,
              },
            })
          })

          const screen = await transaction.screens.findMany({
            where: {
              theater: {
                owners: {
                  every: {
                    id: id,
                  },
                },
              },
            },
            select: {
              id: true,
            },
          })

          if (screen) {
            screen.forEach(async (element) => {
              await transaction.screens.update({
                where: {
                  id: element.id,
                },
                data: {
                  is_deleted: true,
                },
              })
            })

            const seats = await transaction.seats.findMany({
              where: {
                screen: {
                  theater: {
                    owners: {
                      every: {
                        id: id,
                      },
                    },
                  },
                },
              },
              select: {
                id: true,
              },
            })

            if (seats) {
              seats.forEach(async (element) => {
                await transaction.seats.update({
                  where: {
                    id: element.id,
                  },
                  data: {
                    is_deleted: true,
                  },
                })
              })
            }
          }
        }

        const movies = await transaction.movie_details.findMany({
          where: {
            screen: {
              theater: {
                owners: { every: { id: id } },
              },
            },
          },
          select: {
            id: true,
          },
        })

        if (movies) {
          movies.forEach(async (element) => {
            await transaction.movie_details.update({
              where: {
                id: element.id,
              },
              data: {
                is_deleted: true,
              },
            })
          })

          const booking = await transaction.bookings.findMany({
            where: {
              user: {
                id: id,
              },
            },
            select: {
              id: true,
            },
          })

          if (booking) {
            const tickets = await transaction.tickets.findMany({
              where: {
                bookings: {
                  user: {
                    id: id,
                  },
                },
              },
            })

            if (tickets) {
              tickets.forEach(async (element) => {
                await transaction.tickets.update({
                  where: {
                    id: element.id,
                  },
                  data: {
                    is_deleted: true,
                  },
                })
              })
            }

            const payments = await transaction.payments.findMany({
              where: {
                bookings: {
                  user: {
                    id: id,
                  },
                },
              },
            })

            if (payments) {
              payments.forEach(async (element) => {
                await transaction.payments.update({
                  where: {
                    id: element.id,
                  },
                  data: {
                    is_deleted: true,
                  },
                })
              })
            }

            booking.forEach(async (element) => {
              await transaction.bookings.update({
                where: {
                  id: element.id,
                },
                data: {
                  is_deleted: true,
                },
              })
            })
          }
        }

        const events = await transaction.event_details.findMany({
          where: {
            owner: {
              id: id,
            },
          },
          select: {
            id: true,
          },
        })

        if (events) {
          events.forEach(async (element) => {
            await transaction.event_details.update({
              where: {
                id: element.id,
              },
              data: {
                is_deleted: true,
              },
            })
          })

          const booking = await transaction.bookings.findMany({
            where: {
              user: {
                id: id,
              },
            },
            select: {
              id: true,
            },
          })

          if (booking) {
            const tickets = await transaction.tickets.findMany({
              where: {
                bookings: {
                  user: {
                    id: id,
                  },
                },
              },
            })

            if (tickets) {
              tickets.forEach(async (element) => {
                await transaction.tickets.update({
                  where: {
                    id: element.id,
                  },
                  data: {
                    is_deleted: true,
                  },
                })
              })
            }

            const payments = await transaction.payments.findMany({
              where: {
                bookings: {
                  user: {
                    id: id,
                  },
                },
              },
            })

            if (payments) {
              payments.forEach(async (element) => {
                await transaction.payments.update({
                  where: {
                    id: element.id,
                  },
                  data: {
                    is_deleted: true,
                  },
                })
              })
            }

            booking.forEach(async (element) => {
              await transaction.bookings.update({
                where: {
                  id: element.id,
                },
                data: {
                  is_deleted: true,
                },
              })
            })
          }
        }

        return data
      })

      return generalResponse(res, deletedUser.id, 'User Deleted Successfully', 'success', false, 200)
    } else {
      return generalResponse(res, '', 'User Not Found', 'success', false, 200)
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

//save

export const createUserWithTheater = async (req: Request, res: Response) => {
  try {
    const { name, email, contact, role, password, theaterName, theaterAddress } = req.body
    const data: { id: string } = await Prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await argon2.hash(password),
        contact: contact,
        role: role,
        theaters: {
          create: {
            name: theaterName,
            address: theaterAddress,
          },
        },
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, data.id, 'User inserted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const createUserWithScreen = async (req: Request, res: Response) => {
  try {
    const { name, email, contact, role, password, theaterName, theaterAddress, numScreen } = req.body
    const numScreens = Number(numScreen)

    const screenData = new Array(numScreens).fill({})
    const data: { id: string } = await Prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await argon2.hash(password),
        contact: contact,
        role: role,
        theaters: {
          create: {
            name: theaterName,
            address: theaterAddress,
            screens: {
              createMany: {
                data: screenData,
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, data.id, 'User inserted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}

export const createUserWithSeat = async (req: Request, res: Response) => {
  try {
    const { name, email, contact, role, password, theaterName, theaterAddress, numSeat, seatTypeId } = req.body
    const numSeats = Number(numSeat)

    const seatData = new Array(numSeats).fill({ seatTypeId: seatTypeId })
    const data: { id: string } = await Prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await argon2.hash(password),
        contact: contact,
        role: role,
        theaters: {
          create: {
            name: theaterName,
            address: theaterAddress,
            screens: {
              create: {
                seats: {
                  createMany: {
                    data: seatData,
                  },
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    })
    return generalResponse(res, data.id, 'User inserted successfully', 'success', false, 200)
  } catch (error: any) {
    return generalResponse(res, error, '', 'error', false, 400)
  }
}
