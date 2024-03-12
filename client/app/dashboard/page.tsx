'use client'

import { Navbar } from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/DatePickerWithRange';
import { Alerts } from '@/components/Alerts'


export default function Dashboard() {
  return (
    <div className='w-full min-h-screen flex'>
      <Navbar page='dashboard' />
      <div className='w-full min-h-screen flex flex-col'>
        <header className='p-5 flex items-center justify-between w-full h-max border-b border-secondary'>
          <form className='flex space-x-3 w-max items-center'>
            <Input
              type='text'
              className='max-w-max border-secondary bg-secondary focus:border-primary'
              placeholder='Search...'
            />
            <DatePickerWithRange className='bg-secondary' />
            <Button type='submit' className='h-8'>
              Search
            </Button>
          </form>
          <div className='rounded-lg py-2 bg-secondary border-secondary min-w-max w-1/4 h-max'>
            <div className='flex justify-around items-center'>
              <div className='flex flex-col items-center'>
                <p className='text-xs'>Agents</p>
                <p className='font-ubuntu text-lg'>312</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-xs'>Offline</p>
                <p className='font-ubuntu text-lg text-red-400'>3</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-xs'>Connected</p>
                <p className='font-ubuntu text-lg text-primary'>299</p>
              </div>
            </div>
          </div>
          <Button variant={'secondary'} className='w-max'>
            Reload
          </Button>
        </header>
        <main className='m-4'>
          <Alerts />
        </main>
      </div>
    </div>
  );
}
