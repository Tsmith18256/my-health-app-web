import { Button } from '@/components/button/button.component';

export default function LoginPage() {
  return (
    <main className='flex flex-col h-screen items-center p-8 text-center'>
      <div className='flex flex-col justify-center grow'>
        <h1 className='text-5xl'>Fitness</h1>
        <h1 className='text-5xl'>App</h1>
      </div>

      <footer className='flex flex-col items-center mb-12 w-full'>
        <Button>Sign up</Button>

        <div className='flex flex-col items-center mt-6'>
          <span>Already have an account?</span>

          <div className='w-40'>
            <Button>Login</Button>
          </div>
        </div>
      </footer>
    </main>
  );
}
