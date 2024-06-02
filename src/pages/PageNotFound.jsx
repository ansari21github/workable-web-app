import React from 'react'
import { Link } from "react-router-dom";
import User from "../components/User";
import Footer from '../components/Footer';
function PageNotFound() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between py-2 bg-custom-blue px-5 xl:px-28">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              className="h-16 w-42 p-2 mx-auto"
              alt="Workable Logo"
            />
          </Link>
        </div>
        <div className="mt-5">
          <User /> {/* User component */}
        </div>
      </div>
      <img src='/assets/404.jpg' alt="Page not found" className="w-[60%] mx-auto" />
      <Footer />
    </div>
  )
}

export default PageNotFound
