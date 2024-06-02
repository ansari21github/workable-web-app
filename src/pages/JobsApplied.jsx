
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import JobsCard from '../components/JobsCard';
import Footer from '../components/Footer';
import User from "../components/User";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function JobsApplied() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!currentUser) return;
      const jobs = [];
      const appliedJobsRef = collection(doc(db, 'Users', currentUser.uid), 'appliedJobs');
      const querySnapshot = await getDocs(appliedJobsRef);

      querySnapshot.forEach((doc) => {
        jobs.push({
          ...doc.data(),
          id: doc.id,
          postedOn: doc.data().postedOn.toDate(),
        });
      });
      setAppliedJobs(jobs);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchAppliedJobs();
      } else {
        setCurrentUser(null);
        setAppliedJobs([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view your applied jobs.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-custom-blue py-2 px-5 xl:px-28 flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              alt="Logo"
              className="h-16 w-42"
            />
          </Link>
        </div>
        <div className="flex text-[15px] text-white font-semibold items-center gap-8">
          <div className='flex gap-1'>
            <Link to="/jobs">Search for jobs </Link>
            <IoSearch className='text-[20px]' />
          </div>
          <User />
        </div>
      </div>
      <div className="px-6 xl:px-28 my-5">
        <div className="text-gray-700 text-2xl font-semibold">
          Jobs you've applied to
        </div>
        <div className="text-gray-500 text-base font-semibold">{appliedJobs.length} results</div>
      </div>
      <div className="px-6 xl:px-28 my-6">
        {appliedJobs.map((job) => (
          <div key={job.id}>
            <JobsCard key={job.id} {...job} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default JobsApplied;
