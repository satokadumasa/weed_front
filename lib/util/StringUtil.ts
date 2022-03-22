import { parseISO, format } from 'date-fns'

export const useReplaceLnToBr = (str: string) => {
  str = str.replace(/\r/g, '')
  str = str.replace(/\n/g, '<br />')
  return str
}

export const FormatDate =(dateString: string) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString} >{format(date, 'yyyy.MM.dd')}</time>
}
