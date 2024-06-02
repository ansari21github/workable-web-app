

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import JobsCard from '../components/JobsCard';
import Footer from '../components/Footer';
import User from "../components/User";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function BookmarkedJobs() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      if (!currentUser) return;
      const jobs = [];
      const bookmarkedJobsRef = collection(doc(db, 'Users', currentUser.uid), 'bookmarkedJobs');
      const querySnapshot = await getDocs(bookmarkedJobsRef);

      querySnapshot.forEach((doc) => {
        jobs.push({
          ...doc.data(),
          id: doc.id,
          postedOn: doc.data().postedOn.toDate(),
        });
      });
      setBookmarkedJobs(jobs);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchBookmarkedJobs();
      } else {
        setCurrentUser(null);
        setBookmarkedJobs([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view your bookmarked jobs.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-custom-blue py-4 px-5 xl:px-28 flex justify-between items-center">
        <div>
          <Link to="/">
            <img 
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              alt="Logo"
              className="h-16 w-42"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className='flex gap-1 text-white font-bold'>
            <Link to="/jobs">Search for jobs </Link>
            <IoSearch className='text-[20px] mt-1'/>
          </div>
          <User />
        </div>
      </div>
      <div className="px-6 xl:px-28 my-5">
        <div className="text-gray-700 text-2xl font-semibold">
          Bookmarked Jobs
        </div>
        <div className="text-gray-500 text-base font-semibold">{bookmarkedJobs.length} results</div>
      </div>
      <div className="px-6 xl:px-28 my-6">
        {bookmarkedJobs.map((job) => (
          <div key={job.id}>
            <JobsCard key={job.id} {...job} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default BookmarkedJobs;
