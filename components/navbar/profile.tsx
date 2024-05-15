import Link from 'next/link'
import React from 'react'

const profile = () => {
  return (
    <Link href='/profile'>
        <div className="avatar">
            <div className="w-24 rounded">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
    </Link>
  )
}

export default profile
