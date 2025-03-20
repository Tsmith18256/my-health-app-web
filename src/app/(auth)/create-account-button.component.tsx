import { SignUpButton } from '@clerk/nextjs';

export const CreateAccountButton = () => {
  return (
    <div className="bg-orange-400 active:bg-orange-600 border-3 font-semibold p-4 rounded-lg text-2xl text-black w-full">
      <SignUpButton />
    </div>
  );
}
