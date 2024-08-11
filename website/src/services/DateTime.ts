import { DateTime } from "luxon";

export function formatDateTime(dateTime: string) {
  return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
}
