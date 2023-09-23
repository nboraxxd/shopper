/* eslint-disable no-console */
import { toast } from 'sonner'

export function handleError(error) {
  console.log(error)
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message)
  }
}
