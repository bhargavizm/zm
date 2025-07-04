"use client";

import React from 'react';
import { useSelector } from 'react-redux';

const Pavan = () => {
  const resumeData = useSelector((state) => state?.services?.resumeServiceData);
  const { password, resumeUrl, resumeFileName, id } = resumeData || {};

  console.log(resumeData);

  return (
    <div className='mt-20'>
      <h2>Resume Data</h2>
      
      <p><strong>ID:</strong> {id}</p>

      {/* Show iframe if resumeUrl is available */}
      {resumeUrl && (
        <iframe
          src={resumeFileName}
          title="Resume PDF"
          width="100%"
          height="500px"
          style={{ border: '1px solid #ccc', marginBottom: '16px' }}
        />
      )}

      <p><strong>Resume Name:</strong> {resumeFileName}</p>
      <p><strong>Resume URL:</strong> <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Open Resume</a></p>
      <p><strong>Password:</strong> {password}</p>
    </div>
  );
};

export default Pavan;
