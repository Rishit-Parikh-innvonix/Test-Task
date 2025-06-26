// utils/date.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts UTC date string to local Date object.
 */
export const formatMessageTime = (date: Date): string => {
  const now = dayjs();
  const msgTime = dayjs(date);

  if (now.isSame(msgTime, 'day')) {
    return msgTime.format('h:mm A'); // same day
  } else if (now.subtract(1, 'day').isSame(msgTime, 'day')) {
    return `Yesterday ${msgTime.format('h:mm A')}`;
  } else {
    return msgTime.format('MMM D, h:mm A'); // e.g., "Jun 24, 9:30 AM"
  }
};