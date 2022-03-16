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
        <div className="flex flex-row justify-end">
          <LinkButton href="/boards/new">New</LinkButton>
        </div>
      )}
      <div className="container">
        <div className="flex flex-wrap">
          {boards?.map((board) => (
            <div
              key={board.id}
              className="flex w-full md:flex-row flex-col items-center"
            >
              <div className="flex w-full md:flex-grow md:w-1/2 md:pl-16 flex-col text-left">
                <a  href={`/boards/${board.id}/show`} rel="noreferrer">
                  {board.title}
                </a>
              </div>
              <div className="flex w-full md:flex-grow md:w-1/4 md:pl-16 flex-col text-right">
                {currentUser && (
                  <div className="flex flex-row justify-end">
                    <LinkButton href={`/boards/${board.id}/edit`}>
                      Edit
                    </LinkButton>
                  </div>
                )}
              </div>
              <div className="flex w-full md:flex-grow md:w-1/4 md:pl-16 flex-col text-right">
                {currentUser && (
                  <div className="flex flex-row justify-end">
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
