import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
     <div className="fixed inset-0 bg-mainGreen/70 bg-opacity-50 flex items-center justify-center z-150 backdrop-blur-md">
          <img
            src="/logos/ZM LOGO.webp"
            alt="Loading Logo"
            className="w-60 h-auto animate-pulse"
          />
        </div>
    </>
  )
}

export default LoadingSpinner