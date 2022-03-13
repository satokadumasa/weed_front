import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import axios from '@/lib/axios'

type Board = {
  id: number
  user_id: number
  title: string
  detil: string
  created_at: datetime
  updated_at: datetime
}

type Props = {
  board?: Board
  onSubmit: (board: Board) => void
  onError: () => void
}

const BoardForm: React.FC<Props> = ({ board, onSubmit, onError }) => {
  const [imageUrl, setImageUrl] = useState(board?.image)
  const [imageKey, setImageKey] = useState(board?.key)
  const { register, handleSubmit, errors } = useForm()
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const {
        data: { signedUrl, key },
      } = await axios.post('/images')
      await axios.put(signedUrl, file, {
        headers: {
          'Access-Control-Allow-Origin': location.href,
          'Content-Type': file.type,
        },
      })
      const res = await axios.get(`/images/${key}`)
      setImageUrl(res.data.signedUrl)
      setImageKey(key)
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        type="hidden"
        name="id"
        id="id"
        className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
        ref={register({ required: false })}
        defaultValue={board?.id}
      />

      <label className="block mb-4">
        <span>タイトル</span>
        <input
          type="text"
          name="title"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={board?.title}
        />
        <small className="mb-2 text-red-600 block">
          {errors.title && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>本文</span>
        <textarea
          name="detil"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          rows={3}
          ref={register({ required: true })}
          defaultValue={board?.detil}
        />
        <small className="mb-2 text-red-600 block">
          {errors.description && <span>This field is required</span>}
        </small>
      </label>
      <input
        type="submit"
        value="Save"
        className="mt-4 px-6 py-2 text-white bg-accent rounded hover:bg-accent-dark"
      />
    </form>
  )
}

export default BoardForm
