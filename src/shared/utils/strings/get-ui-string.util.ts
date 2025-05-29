import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * Gets the UI string that goes with the given key. If the string has tokens in
 * the value, the second parameter will be required with a mapping of tokens to
 * values to inject.
 */
export const getUiString = <TKey extends UiStringKey>(
  key: TKey,
  ...[tokens]: TokensParam<TKey>
): string => {
  if (!tokens) {
    return key;
  }

  return Object.keys(tokens).reduce<string>((acc, tokenKey) => {
    // An object could be passed in that has more keys than just the tokens.
    // This check skips those extra keys.
    if (tokenKey in tokens) {
      const safeKey = tokenKey as keyof typeof tokens;

      return acc.replace(`{${tokenKey}}`, tokens[safeKey]);
    }

    return acc;
  }, key);
};

/**
 * All the keys available for looking up UI values.
 */
export const UiStringKey = {
  ButtonLabelCreate: "Create",
  ButtonLabelSave: "Save",
  ColumnHeaderAb: "Ab",
  ColumnHeaderBodyFat: "Body fat",
  ColumnHeaderChest: "Chest",
  ColumnHeaderLast7Days: "Last 7 days",
  ColumnHeaderNeck: "Neck",
  ColumnHeaderThigh: "Thigh",
  ColumnHeaderWaist: "Waist",
  ColumnHeaderWeight: "Weight",
  FormLabelAb: "Ab (mm)",
  FormLabelChest: "Chest (mm)",
  FormLabelNeck: "Neck ({unit})",
  FormLabelThigh: "Thigh (mm)",
  FormLabelWaist: "Waist ({unit})",
  FormLabelWeight: "Weight ({unit})",
  LabelDate: "Date",
  PageHeadingNewBodyCompEntry: "New entry",
  PageHeadingEditBodyCompEntry: "Edit entry",
  SectionHeadingAdvanced: "Advanced",
  SectionHeadingMeasuringTape: "Measuring tape",
} as const;
type UiStringKey = ObjectValues<typeof UiStringKey>;

/*
 * Helper types to generate the tokens param and make it optional.
 */

type TokensParam<TString extends UiStringKey> =
  GetTokens<TString>[0] extends string ? [TokensRecord<TString>] : [];

type TokensRecord<TString extends UiStringKey> = Record<
  GetTokens<TString>[number],
  string
>;

type GetTokens<
  T extends string,
  TAcc extends string[] = [],
> = T extends `${string}{${infer Token}}${infer B}`
  ? GetTokens<B, [...TAcc, Token]>
  : TAcc;
