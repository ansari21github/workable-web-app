
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import dayjs from 'dayjs';
import User from "../components/User";
import { onAuthStateChanged } from "firebase/auth";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const jobRef = doc(db, 'jobs', id);
      const jobSnap = await getDoc(jobRef);
      if (jobSnap.exists()) {
        setJob({
          ...jobSnap.data(),
          id: jobSnap.id,
          postedOn: jobSnap.data().postedOn.toDate(),
        });
      } else {
        console.log('No such document!');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    fetchJob();
    return () => unsubscribe();
  }, [id]);

  const applyToJob = async () => {
    if (!currentUser) {
      navigate('/login');
      console.log('User not logged in');
      return;
    }

    const userRef = doc(db, 'Users', currentUser.uid);
    const appliedJobRef = doc(userRef, 'appliedJobs', job.id);

    await setDoc(appliedJobRef, {
      ...job,
      appliedOn: new Date(),
    });

    console.log('Job applied successfully');
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(job.postedOn, 'day');

  return (
    <div>
      <div className="flex justify-between py-2 bg-custom-blue px-5 xl:px-28">
        <div className="flex justify-center items-center">
          <img
            src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
            className="h-16 w-42 p-2 mx-auto"
            alt="Logo"
          />
        </div>
        <div className="flex text-[15px] text-white font-semibold items-center gap-8">
          <div className='flex gap-1'>
            <Link to="/jobs">Search for jobs </Link>
            <IoSearch className='text-[20px]' />
          </div>
          <User />
        </div>
      </div>

      <div className='flex flex-col my-12 border border-gray-100 bg-white shadow-md rounded-md mx-5 xl:mx-28 px-7 py-7'>
        <div className=''>
          <img src={`/assets/${job.company}.png`} className='h-20 w-20' alt="Company Logo" />
        </div>
        <div className='mt-5 text-[19px] text-black font-semibold'>
          {job.title}
        </div>
        <div className='flex mt-2 text-[16px] gap-1'>
          <div className='text-gray-500'>at</div>
          <div className='text-gren'>{job.company}</div>
        </div>
        <div className='flex mt-4 gap-2'>
          <div className='text-[16px] text-black font-semibold'>{job.mode}</div>
          <div className='mt-2 text-[10px]'><LuDot /></div>
          <div className='text-[15px]'>{job.location}</div>
          <div className='mt-2 text-[10px]'><LuDot /></div>
          <div className='text-[15px]'>{job.type}</div>
        </div>
        <div className='flex flex-col md:flex-row justify-between mt-3'>
          <div className='text-[14px] text-gray-400 mt-3'>
            Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
          </div>
          <div className='flex space-x-5 mt-3 md:mt-0'>
            <button className='bg-white border border-gren rounded-md font-semibold px-5 py-2'>
              <p className='text-gren'>Share job</p>
            </button>
            <button className='bg-gren rounded-md hover:bg-blur' onClick={applyToJob}>
              <p className='text-white font-semibold px-5 py-2'>Apply now</p>
            </button>
          </div>
        </div>
        <div className="border-b border-gray-200 my-4"></div>
        <div className='mt-7'>
          <div className='text-[18px] text-black font-semibold'>Description</div>
          <div className='mt-4'>
            {job.description}
          </div>
        </div>
        {job.requirements && job.requirements.length > 0 && (
          <div className='mt-7'>
            <div className='text-[18px] text-black font-semibold'>Requirements</div>
            <div className='mt-4'>
              {job.requirements.map((requirement, index) => (
                <div key={index} className='flex gap-1 pl-2'>
                  <div className='text-[40px] font-bold'><LuDot /></div>
                  <div className='mt-2'>{requirement}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='mt-5'>
          <div className='text-[18px] text-black font-semibold'>Salary</div>
          <div className='flex gap-1 mt-2'>
            <div>{job.currency}</div>
            <div>{job.salary}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JobDetail;
