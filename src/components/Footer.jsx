

import React from 'react';

function Footer() {
  return (
    <div className="bg-custom-blue px-4 md:px-20 py-4">
      <div className="flex flex-col items-center md:items-start">
        <img
          src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
          className="h-12 w-auto mb-4"
          alt="Workable Logo"
        />
        <div className="border-b border-gray-500 w-full mb-4"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full text-white text-[15px]">
        <div className="mb-4 md:mb-0">
          © Workable Technology Limited 2012-2024
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hover:underline cursor-pointer">Terms & Conditions</div>
          <div className="hover:underline cursor-pointer">Privacy Policy</div>
          <div className="hover:underline cursor-pointer">Need Help?</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

