"use server";

export const saveOnboardingInformation = async (formData: FormData) => {
  const birthday = formData.get('birthday');
  const sex = formData.get('sex');
  const height = formData.get('height');

  console.log('----------');
  console.log('Submitting onboarding information');
  console.log('Birthday:');
  console.log(birthday);
  console.log();
  console.log('Sex:');
  console.log(sex);
  console.log();
  console.log('Height:');
  console.log(height);
};
