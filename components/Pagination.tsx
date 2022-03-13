import Router from 'next/router';
import Link from 'next/link';

export const Pagination = ({ totalCount, page, url }) => {
  console.log("totalCount["+totalCount+"] page["+page+"]")
  const PER_PAGE = 10
  let start = (page - 4) > 0 ? (page - 4) : 1
  const max_page =  Math.ceil(totalCount / PER_PAGE)
  let end = (page - 4) > 0 ? ((Number(page) + 5) < Number(max_page) ? (Number(page) + 5) : Number(max_page)) : 10
  console.log("Pagination start["+start+"] end["+end+"] max_page["+max_page+"]")
  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
  return (
    <ul>
      <li key={1}>
        <Link href={ `/${url}/`}>
          <a>&lsaquo;&lsaquo;</a>
        </Link>
      </li>
      {range(start, Number(page) - 1).map((number, index) => (
        <li key={index}>
          <Link href={ `/${url}/?page=${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
      <li key={page}>
        <b>{page}</b>
      </li>
      {range(Number(page) + 1, end).map((number, index) => (
        <li key={index}>
          <Link href={ `/${url}/?page=${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
      <li key={totalCount}>
        <Link href={ `/${url}/?page=${max_page}`}>
          <a>&rsaquo;&rsaquo;</a>
        </Link>
      </li>
    </ul>
  );
};
