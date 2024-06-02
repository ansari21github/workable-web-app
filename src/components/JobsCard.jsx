

import React, { useState, useEffect } from 'react';
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { CiBookmark } from "react-icons/ci";
import { IoMdBookmark } from "react-icons/io";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";

function JobsCard(props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        checkIfBookmarked(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkIfBookmarked = async (userId) => {
    const bookmarkRef = doc(db, 'Users', userId, 'bookmarkedJobs', props.id);
    const bookmarkSnap = await getDoc(bookmarkRef);
    if (bookmarkSnap.exists()) {
      setBookmarked(true);
    }
  };

  const toggleBookmark = async (event) => {
    event.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      console.log('User not logged in');
      return;
    }

    const bookmarkRef = doc(db, 'Users', currentUser.uid, 'bookmarkedJobs', props.id);

    if (bookmarked) {
      await deleteDoc(bookmarkRef);
    } else {
      await setDoc(bookmarkRef, {
        ...props,
        bookmarkedOn: new Date(),
      });
    }
    setBookmarked(!bookmarked);
  };

  const handleCardClick = () => {
    navigate(`/job/${props.id}`);
  };

  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(props.postedOn, 'day');

  return (
    <div
      className="flex flex-col md:flex-row justify-between w-full gap-4 border border-gray-100 bg-white shadow-md py-7 px-4 rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex gap-5">
        <div>
          <img src={`/assets/${props.company}.png`} className="h-20 w-20" alt={`${props.company} logo`} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[18px] font-semibold text-gren">
            {props.title}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div>at</div>
            <div className="text-gren">{props.company}</div>
            <div className="text-[10px]"><LuDot /></div>
            <div className="font-semibold">{props.mode}</div>
            <div className="text-[10px]"><LuDot /></div>
            <div>{props.location}</div>
            <div className="text-[10px]"><LuDot /></div>
            <div>{props.type}</div>
          </div>
          <div className="text-[13px] text-gray-600">
            Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
          </div>
        </div>
      </div>
      <div className="text-[20px] font-bold text-gray-500" onClick={toggleBookmark}>
        {bookmarked ? <IoMdBookmark /> : <CiBookmark />}
      </div>
    </div>
  );
}

export default JobsCard;

