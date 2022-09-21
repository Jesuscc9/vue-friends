import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)

const timeAgoFn = new TimeAgo('en-US')

export const timeAgo = (date) => timeAgoFn.format(new Date(date))
