'use client'

import { useSession } from 'next-auth/react'

export default function Profile() {

  const { data: session } = useSession()
  console.log(session)
  return (
    <div>
      Login sebagai: {session?.user?.name}
    </div>
  )
}