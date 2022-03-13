// import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Header from '@/components/Haeder'
import {Pagination} from '@/components/Pagination'
import LinkButton from '@/components/LinkButton'
import { useAuth } from '@/lib/next-hook-auth'
import { Board } from '@/lib/client'

export async function getServerSideProps(context) {
  const page = context.query.page ? context.query.page : 1
  const url = process.env.NEXT_PUBLIC_API_SERVER + "/boards/?page=" + context.query.page
  const res = await fetch(url)
  const data = await res.json()
  console.log("data:" + JSON.stringify(data))

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      boards: data.boards,
      count: data.count,
      page: page
    },
  }
}

const Index: NextPage<{ boards: Board[], count: integer, page: integer }> = ({
  boards,
  count,
  page
}) => {
  const { currentUser } = useAuth()
  const router = useRouter()
  console.log("count:" + count)

  return (
    <Layout signedin={!!currentUser} loading={!boards} >
      <Header title="Boards" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-8">
          <LinkButton href="/boards/new">New</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {boards?.map((board) => (
            <div
              key={board.id}
              className="flex mb-8 md:flex-row w-full flex-col items-center"
            >
              <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
                <a href={board.link} target="_blank" rel="noreferrer">
                  <h1 className="title-font text-3xl pt-4 pb-4 font-medium text-gray-900">
                    {board.title}
                  </h1>
                </a>
                <p className="mb-4 leading-relaxed">{board.description}</p>
                {currentUser && (
                  <div className="flex flex-row justify-end mt-4 mb-4">
                    <LinkButton href={`/boards/${board.id}/edit`}>
                      Edit
                    </LinkButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination totalCount={count} page={page} url='boards' />
    </Layout>
  )
}

export default Index
