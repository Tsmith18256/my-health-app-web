import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { Sex } from "@/shared/utils/validation/validate-sex.util";

export * from "@/shared/state/user-settings/user-settings.state";

export const useUserSettings = () => {
  return {
    birthday: "2000-01-01",
    emailAddress: "darthvader@empire.com" as EmailAddress,
    heightInMm: 20300,
    lengthSystem: MeasurementSystem.Imperial,
    sex: Sex.Male,
    weightSystem: MeasurementSystem.Imperial,
  };
};
