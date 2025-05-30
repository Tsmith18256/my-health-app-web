import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";

export interface IBodyCompEntryWithLast7Days extends IBodyCompEntry {
  /**
   * The 7-day average weight at the time of this body comp entry.
   */
  last7DaysWeightInG: number;
}
