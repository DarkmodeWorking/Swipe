'use client';

import { Plus, SquarePlayIcon, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 md:px-10 py-2 border-b bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-14">
        {/* Left Logo Section */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <SquarePlayIcon className="text-primary" />
          <h1 className="font-bold text-xl">Swipe</h1>
        </Link>

        {/* Search - visible only on md+ */}
        <div className="hidden md:block w-1/2">
          <Input type="text" placeholder="Search" />
        </div>

        {/* Right buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/upload">
            <Button>
              <Plus className="mr-1" /> Create
            </Button>
          </Link>

          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="secondary">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <ModeToggle />
        </div>

        {/* Hamburger Icon - Mobile only */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col space-y-2 mt-2 md:hidden">
          <Input type="text" placeholder="Search" />
          <Link href="/upload">
            <Button className="w-full">
              <Plus className="mr-1" /> Create
            </Button>
          </Link>

          <div className='flex justify-between'>
            <SignedOut>
            <SignInButton>
              <Button variant="secondary" className="w-full">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="secondary" className="w-full">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <ModeToggle />
          </div>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
