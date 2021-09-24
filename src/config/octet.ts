import { env } from './env'

const config = {
  headers: {
    Authorization: `Bearer ${env.octet.token}`,
  }
} 

export default config