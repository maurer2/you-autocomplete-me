import Link from 'next/link'
import type { WithNavbarProps } from './types'

export default function WithNavbar({ children }: WithNavbarProps) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        {' '}
        <Link href="/create">Create</Link>
      </nav>
      {children}
    </>
  )
}
