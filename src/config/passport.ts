import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStatic } from 'passport'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || '',
}

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.id },
        })
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (error) {
        console.error(error)
        return done(error, false)
      }
    }),
  )
}
