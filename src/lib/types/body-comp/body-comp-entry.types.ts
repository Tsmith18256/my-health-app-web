import type { Dayjs } from 'dayjs'

export interface IBodyCompEntry {
  date: Dayjs;
  weightInG: number;
  waistCircInMm?: number;
  neckCircInMm?: number;
  chestSkinfoldInMm?: number;
  abSkinfoldInMm?: number;
  thighSkinfoldInMm?: number;
}
