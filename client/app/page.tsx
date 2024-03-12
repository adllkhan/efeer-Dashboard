import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col w-full min-h-screen justify-center items-center'>
      <div className='title'>
        <p className='text-6xl font-ubuntu inline-block text-black dark:text-white'>
          ef<p className='inline-block text-primary'>ee</p>r
          <p className='ml-4 font-sans font-extralight text-6xl inline-block bg-clip-text text-transparent bg-gradient-to-r dark:from-white dark:via-white dark:to-gray/50'>
            Dashboard
          </p>
        </p>
      </div>
      <p></p>
      <section>
        <p className='mt-4 max-w-3xl text-sm text-center text-neutral-500'>
          A dashboard that boasts specialized functionalities, including the
          ability to deliver reports in real-time through Telegram, as well as a
          feature for creating comprehensive reports.
        </p>
      </section>
      <div className='mt-6 grid grid-cols-3 gap-2'>
        <Link
          href='/dashboard'
          className={buttonVariants({ variant: 'default' })}>
          Dashboard
        </Link>
        <Link
          href='/agents'
          className={buttonVariants({ variant: 'secondary' })}>
          Agents
        </Link>
        <Link
          href='/settings'
          className={buttonVariants({ variant: 'secondary' })}>
          Settings
        </Link>
      </div>
    </main>
  );
}
