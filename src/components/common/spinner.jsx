import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-150 backdrop-blur-md">
          <img
            src="/logos/ZM LOGO.webp"
            alt="Loading Logo"
            className="w-40 h-auto animate-bounce"
          />
        </div>
    </>
  )
}

export default LoadingSpinner