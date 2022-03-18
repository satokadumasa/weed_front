// import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Header from '@/components/Haeder'

import LinkButton from '@/components/LinkButton'
import { useAuth } from '@/lib/next-hook-auth'
import { useToasts } from 'react-toast-notifications'
import { Board, useBoard, useUpdateBoard } from '@/lib/client'

export async function getServerSideProps(context) {
  const board_id = context.query.id ? context.query.id : 1
  const url = process.env.NEXT_PUBLIC_API_SERVER + "/boards/" + board_id
  const res = await fetch(url)
  const data = await res.json()
  const nl2br = require('react-nl2br')
  if (!data) {
    return {
      notFound: true,
    }
  }
  console.log("----------------------")
  console.log(data)
  console.log("----------------------")
  return {
    props: {
      board: data,
    },
  }
}


const Show: NextPage<{ board: Board }> = ({
  board
}) => {
  const { currentUser, loading } = useAuth(true)
  const { addToast } = useToasts()
  const router = useRouter()
  const update = useUpdateBoard()
  const nl2br = require('react-nl2br')
  console.log("-------------------")
  console.log(board)
  console.log("-------------------")
  const onSubmit = async (board) => {
    try {
      update(Number(router.query.id), board)
      addToast('Saved Successfully', { appearance: 'success' })
      router.push('/boards')
    } catch (e) {
      addToast(e.message, { appearance: 'error' })
    }
  }

  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <Layout signedin={!!currentUser} loading={loading}>
      <Header title="Edit Board" />
      <div className="flex flex-row justify-end m-4">
        <LinkButton href="/boards">Back</LinkButton>
      </div>
      <div className="container">
        <div className="flex w-full flex-wrap md:flex-row flex-col items-center">
          <div className="flex w-full md:flex-grow md:w-1/1 md:pl-16 flex-col text-left">
            {board.title}
          </div>
          <div className="flex w-full md:flex-grow md:w-1/1 md:pl-16 flex-col text-left">
            { nl2br(board.detail) }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Show
