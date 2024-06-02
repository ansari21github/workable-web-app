
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import JobsCard from "../components/JobsCard";
import { Link } from "react-router-dom";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import SearchBar from "../components/SearchBar";
import User from "../components/User";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    location: "",
    mode: "",
    experience: "",
    type: "",
  });

  const handleChange = (e) => {
    setJobCriteria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchJobs = async () => {
    setCustomSearch(false);
    setJobCriteria({
      title: "",
      location: "",
      mode: "",
      experience: "",
      type: "",
    });
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));

    const req = await getDocs(q);
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  const fetchJobsCustom = async (criteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(
      jobsRef,
      where("type", "==", criteria.type),
      where("title", "==", criteria.title),
      where("experience", "==", criteria.experience),
      where("location", "==", criteria.location),
      where("mode", "==", criteria.mode),
      orderBy("postedOn", "desc")
    );
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderHeading = () => {
    const { title, location } = jobCriteria;
    if (!customSearch || (!title && !location)) {
      return (
        <div className="text-gray-700 text-[23px] font-semibold">
          Recent jobs
        </div>
      );
    }
    return (
      <div className="text-gray-700 text-[23px]">
        <span className="font-semibold">{title}</span> jobs near {location}
      </div>
    );
  };

  return (
    <div>
       {/* Header section */}
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
       {/* Search bar section */}
      <div className="shadow-xl p-6 border-b border-gray-200 bg-white sticky top-0">
        <SearchBar
          jobCriteria={jobCriteria}
          handleChange={handleChange}
          fetchJobsCustom={fetchJobsCustom}
        />
        {customSearch && (
          <div className="py-4 px-5 xl:px-28">
            <Link
              onClick={fetchJobs}
              className="hover:underline text-[14px] text-gray-500 font-semibold"
            >
              Clear filters
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col px-5 md:px-10 xl:px-28 my-5">
        {renderHeading()}
        <div className="text-gray-500 text-[17px] font-semibold">
          {jobs.length} results
        </div>
      </div>
   {/* Jobs listing section */}
      <div className="flex flex-col px-5 md:px-10 xl:px-28 my-6 space-y-4">
        {jobs &&
          jobs.map((job) => (
            <div key={job.id}>
              <JobsCard key={job.id} {...job} />
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default Jobs;
