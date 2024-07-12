import type { INewBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.types';
import type { Dayjs } from 'dayjs';

export type IFormattedBodyCompEntry = {
  [K in keyof INewBodyCompEntry as DropUnit<K>]: Formatted<INewBodyCompEntry[K]>;
} & { bodyFat?: string };

type DropUnit<T extends string> = T extends `${infer R}In${string}` ? R : T;

type Formatted<T extends Dayjs | number | undefined> = T extends undefined ? string | undefined : string;
