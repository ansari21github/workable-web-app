

import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { ImLocation } from "react-icons/im";

function SearchBar({ jobCriteria, handleChange, fetchJobsCustom }) {
  const search = async () => {
    await fetchJobsCustom(jobCriteria);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row px-2 xl:px-28 gap-4 mb-4">
        <div className="flex items-center border border-gray-400 rounded-md px-2 md:px-5 w-full md:w-auto">
          <IoSearch className="text-[21px] mt-1 text-gray-500 font-semibold" />
          <input
            type="text"
            placeholder="Search by job title or keyword"
            name="title"
            value={jobCriteria.title}
            onChange={handleChange}
            className="py-2 px-3 w-full md:w-64 lg:w-96 bg-white placeholder-gray-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center border border-gray-400 rounded-md px-2 w-full md:w-auto">
          <ImLocation className="text-[18px] mt-1 text-gray-500 font-semibold" />
          <input
            type="text"
            placeholder="City or country"
            name="location"
            value={jobCriteria.location}
            onChange={handleChange}
            className="py-2 px-3 w-full md:w-64 lg:w-96 bg-white placeholder-gray-500 focus:outline-none"
          />
        </div>
        <button
          onClick={search}
          className="bg-gren hover:bg-blur px-4 py-2 text-white rounded-md text-[14px] mx-2 font-semibold"
        >
          Search jobs
        </button>
      </div>

      <div className="xl:px-28">
        <div className="border-b border-gray-200 my-5"></div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 px-2 xl:px-28">
        <select
          name="type"
          value={jobCriteria.type}
          onChange={handleChange}
          className="w-full md:w-64 py-3 pl-2 border border-gray-400 text-gray-500 rounded-md focus:outline-none"
        >
          <option value="" disabled hidden>
            Job Type
          </option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <select
          name="mode"
          value={jobCriteria.mode}
          onChange={handleChange}
          className="w-full md:w-64 py-3 pl-2 border border-gray-400 text-gray-500 rounded-md focus:outline-none"
        >
          <option value="" disabled hidden>
            OnSite/Remote/Hybrid
          </option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          name="experience"
          value={jobCriteria.experience}
          onChange={handleChange}
          className="w-full md:w-64 py-3 pl-2 border border-gray-400 text-gray-500 rounded-md focus:outline-none"
        >
          <option value="" disabled hidden>
            Experience
          </option>
          <option value="Fresher">Fresher</option>
          <option value="Junior Level">Junior Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>
    </>
  );
}

export default SearchBar;

