import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import {
  BodyCompEntryId,
  IBodyCompEntry,
  INewBodyCompEntry,
} from "./body-comp-entry.dao";

export const MOCK_NEW_BODY_COMP_ENTRY: INewBodyCompEntry = {
  abSkinfold: 18,
  chestSkinfold: 12,
  date: "2025-05-30",
  neckCircumferenceInMm: 330,
  thighSkinfold: 14,
  userEmail: "user@email.com" as EmailAddress,
  weightInG: 75000,
};

export const MOCK_BODY_COMP_ENTRY: IBodyCompEntry = {
  ...MOCK_NEW_BODY_COMP_ENTRY,
  id: 1 as BodyCompEntryId,
};
