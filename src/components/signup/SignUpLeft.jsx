import React from 'react'
import Image from 'next/image'
const SignUpLeft = () => {
    return (
        <div className='bg-loginBlue h-screen w-1/2 flex flex-col justify-center items-center text-white rounded-l-2xl'>
            <Image src="logo.svg" alt="logo" width={300} height={300} className="ml-10 m-5" />
            <h1 className='text-2xl font-semibold flex flex-col w-1/2'>Worlds No.1 QR Code Generate and Managing Platform</h1>
            <Image src="/lock.jpg" alt="lock" width={300} height={300} className="m-5" />
            <h4 className='text-md font-thin flex flex-col items-center w-1/2'>Trusted by the World's Top Brands.</h4>
        </div>
    )
}

export default SignUpLeft
