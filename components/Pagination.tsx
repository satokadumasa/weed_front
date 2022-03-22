import Router from 'next/router';
import Link from 'next/link';

export const Pagination = ({ totalCount, page, url }) => {
  console.log("totalCount["+totalCount+"] page["+page+"]")
  const PER_PAGE = 20
  let start = (page - 4) > 0 ? (page - 4) : 1
  const max_page =  Math.ceil(totalCount / PER_PAGE)
  let end = (page - 4) > 0 ? ((Number(page) + 5) < Number(max_page) ? (Number(page) + 5) : Number(max_page)) : 10
  console.log("Pagination start["+start+"] end["+end+"] max_page["+max_page+"]")
  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
  return (
    <div className="flex sm:flex-row sm-12 mb-12 md:flex-row z-100">
      <div className="md:flex-grow sm:flex-wrap w-1/12 w-full pl-2 flex flex-col items-start text-left">
        <Link href={ `/${url}/`}>
          <a>&lsaquo;&lsaquo;</a>
        </Link>
      </div>
      {range(start, Number(page) - 1).map((number, index) => (
        <div className="md:flex-grow sm:flex-wrap w-1/12 w-full pl-2 flex flex-col items-start text-left">
          <Link href={ `/${url}/?page=${number}`}>
            <a>{number}</a>
          </Link>
        </div>
      ))}
      <div className="md:flex-grow sm:flex-wrap w-1/12 w-full pl-2 flex flex-col items-start text-left">
        <b>{page}</b>
      </div>
      {range(Number(page) + 1, end).map((number, index) => (
        <div className="md:flex-grow sm:flex-wrap w-1/12 w-full pl-2 flex flex-col items-start text-left">
          <Link href={ `/${url}/?page=${number}`}>
            <a>{number}</a>
          </Link>
        </div>
      ))}
      <div className="md:flex-grow sm:flex-wrap w-1/12 w-full pl-2 flex flex-col items-start text-left">
        <Link href={ `/${url}/?page=${max_page}`}>
          <a>&rsaquo;&rsaquo;</a>
        </Link>
      </div>
    </div>
  );
};
