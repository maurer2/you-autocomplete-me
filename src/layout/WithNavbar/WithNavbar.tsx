import Link from 'next/link'
import type { WithNavbarProps } from './types'

export default function WithNavbar({ children }: WithNavbarProps) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        {' '}
        <Link href="/create">Create</Link>
        {' '}
        <Link href="/delete">Delete</Link>
      </nav>
      {children}
    </>
  )
}
