import type { Dayjs } from 'dayjs'

export type INewBodyCompEntry = Omit<IBodyCompEntry, 'id'>;

export interface IBodyCompEntry {
  id: number;
  date: Dayjs;
  weightInG: number;
  waistCircInMm?: number;
  neckCircInMm?: number;
  chestSkinfoldInMm?: number;
  abSkinfoldInMm?: number;
  thighSkinfoldInMm?: number;
}
