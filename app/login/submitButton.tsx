'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const SubmitButton = () => {
    const router = useRouter();
  return (
    <div>
        <button className="btn btn-primary">Login</button>
    </div>
  )
}

export default SubmitButton
