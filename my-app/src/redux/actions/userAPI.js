import { FETCH_APIS } from './types'

export const userAPI = (data) => {
  return { type: FETCH_APIS, data: data }
}
