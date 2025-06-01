import { Plus, SquarePlayIcon } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ModeToggle } from '../mode-toggle'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-14'>
      <div className='flex items-center'>
        <div className='text-primary'>
          <SquarePlayIcon />
        </div>
        <h1 className='font-bold text-xl'>Swipe</h1>
      </div>
      <div className='w-1/2'>
        <Input type='text' placeholder='Search' />
      </div>
      <div className='flex items-center space-x-2'>
        <Link href='/upload'>
          <Button><Plus /> Create</Button>
        </Link>
         <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton>
              <Button variant='secondary'>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant='secondary'>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar