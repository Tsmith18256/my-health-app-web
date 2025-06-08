import { expect, it } from "vitest";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { usePreferredUnitUtils } from "@/shared/hooks/use-preferred-unit-utils/use-preferred-unit-utils.hook";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { UserSettingsProvider } from "@/shared/state/user-settings/user-settings.state";
import { ReactNode } from "react";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { Sex } from "@/shared/utils/validation/validate-sex.util";

it("returns correct units (imperial)", () => {
  const { result } = renderHook(usePreferredUnitUtils, {
    wrapper: createSettingsProvider(MeasurementSystem.Imperial),
  });

  expect(result.current.bodyweightUnit).toBe(WeightUnit.Pounds);
  expect(result.current.circumferenceUnit).toBe(LengthUnit.Inches);
});

it("returns correct units (metric)", () => {
  const { result } = renderHook(usePreferredUnitUtils, {
    wrapper: createSettingsProvider(MeasurementSystem.Metric),
  });

  expect(result.current.bodyweightUnit).toBe(WeightUnit.Kilograms);
  expect(result.current.circumferenceUnit).toBe(LengthUnit.Centimeters);
});

it("converts bodyweight from grams correctly", () => {
  const { result } = renderHook(usePreferredUnitUtils, {
    wrapper: createSettingsProvider(MeasurementSystem.Imperial),
  });

  const { convertBodyweightFromGrams } = result.current;
  const converted = convertBodyweightFromGrams(79650);

  expect(converted).toBeCloseTo(175.6);
});

it("converts bodyweight to grams correctly", () => {
  const { result } = renderHook(usePreferredUnitUtils, {
    wrapper: createSettingsProvider(MeasurementSystem.Imperial),
  });

  const { convertBodyweightToGrams } = result.current;
  const converted = convertBodyweightToGrams(115.8);

  expect(converted).toBeCloseTo(52526.0);
});

it("converts circumference from millimetres correctly", () => {
  const { result } = renderHook(usePreferredUnitUtils, {
    wrapper: createSettingsProvider(MeasurementSystem.Imperial),
  });

  const { convertCircumferenceFromMillimetres } = result.current;
  const converted = convertCircumferenceFromMillimetres(867);

  expect(converted).toBeCloseTo(34.13);
});

it("converts circumference to millimetres correctly", () => {
  const { result } = renderHook(usePreferredUnitUtils, {
    wrapper: createSettingsProvider(MeasurementSystem.Imperial),
  });

  const { convertCircumferenceToMillimetres } = result.current;
  const converted = convertCircumferenceToMillimetres(14.9);

  expect(converted).toBeCloseTo(378.46);
});

const createSettingsProvider = (measurementSystem: MeasurementSystem) => {
  return function SettingsProvider({ children }: { children: ReactNode }) {
    return (
      <UserSettingsProvider
        initialValues={{
          birthday: "1970-01-01",
          heightInMm: 1700,
          lengthSystem: measurementSystem,
          sex: Sex.Female,
          weightSystem: measurementSystem,
        }}
      >
        {children}
      </UserSettingsProvider>
    );
  };
};
