import dayjs, { Dayjs } from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export const convertToJakartaTZ = (utcDate: string): string => {
  const jakartaDate = dayjs.utc(utcDate).tz("Asia/Jakarta")
  return jakartaDate.format()
}

export const dateTimeUtcTrue = (date: string): string => {
  const utcTrue = dayjs(date).utc(true).toISOString()
  return utcTrue
}

export const parseDate = (str: string) => {
  return str ? dayjs(str) : null
}
