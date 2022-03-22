import axios from '@/lib/axios'
import useSWR, { mutate } from 'swr'
import customAxios from '@/lib/customAxios'

export type Note = {
  id: number
  user_id: number
  title: string
  overview: string
  detail: string
  created_at: datetime
  updated_at: datetime
}

export const useNotes = (): { notes: Note[]; error: any } => {
  const fetcher = () => axios.get('/notes').then((res) => res.data)
  const { data, error } = useSWR('/notes', fetcher)
  return { notes: data, error }
}

export const useNote = (id: number): { book: Note; error: any } => {
  const fetcher = () =>
    id ? axios.get(`/notes/${id}`).then((res) => res.data) : null
  const { data, error } = useSWR(`/notes/${id}`, fetcher)
  return { book: data, error }
}

export const useCreateNote = () => {
  return async (book: Note) => {
    await axios.post(`/notes/`, book)
    await mutate(`/notes/`)
  }
}

export const useDeleteNote = () => {
  return async (id: number) => {
    await customAxios.delete(`/notes/${id}`)
    await mutate(`/notes/`)
  }
}

export const useUpdateNote = () => {
  return async (id: number, book: Note) => {
    await axios.put(`/notes/${id}`, book)
    await mutate(`/notes/${id}`)
  }
}
