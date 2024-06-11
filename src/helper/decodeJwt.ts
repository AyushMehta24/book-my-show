import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
  username: string
  // Add other properties if needed
}

export function decodeJwtToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as JwtPayload
    return decoded
  } catch (error) {
    console.error('Error decoding JWT token:', error)
    return null
  }
}
