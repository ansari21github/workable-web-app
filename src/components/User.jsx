
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store";
import { TbSend } from "react-icons/tb";
import { MdBookmarkBorder } from "react-icons/md";

function User({ isScrolled }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(isLoggedIn(true)); // Set isLoggedIn to true if user is logged in
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      } else {
        dispatch(isLoggedIn(false)); // Set isLoggedIn to false if user is not logged in
        setUserDetails(null); // Clear user details
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const firstName = userDetails?.firstName?.split(" ") ?? "";

  toast.success("Logged in successfully!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  return (
    <>
      {userDetails ? (
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 cursor-pointer"
          >
            {userDetails?.photo ? (
              <img
                src={userDetails?.photo}
                alt="profile"
                className={`w-[40px] h-[40px] rounded-full border-2 ${
                  isScrolled ? "border-word" : "border-white"
                }`}
              />
            ) : (
              <div
                className={`uppercase rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold border-2 ${
                  isScrolled
                    ? "bg-custom-blue text-white border-word"
                    : "bg-custom-blue text-white border-white"
                }`}
              >
                {userDetails?.firstName.charAt(0)}
                {userDetails?.lastName.charAt(0)}
              </div>
            )}
          </div>
          {open && (
            <div className="rounded border-[1px] border-gray-200 bg-white absolute right-0 top-[40px] w-[200px] shadow-lg z-10 mt-3 px-2">
              <div className="cursor-pointer pl-2 flex items-center gap-4 hover:bg-highlight hover:text-word p-4 text-gray-500 text-[14px]">
                <FaRegCircleUser className="text-lg text-gray-500" /> Your
                Profile
              </div>
              <div className="cursor-pointer hover:text-word pl-2 flex items-center gap-4 hover:bg-highlight p-4 text-gray-500 text-[14px]">
                <TbSend className="text-xl text-gray-500" />
                <Link to="/jobs-applied">Jobs Applied</Link>
              </div>
              <div className="cursor-pointer hover:text-word pl-2 flex items-center gap-4 hover:bg-highlight p-4 text-gray-500 text-[14px]">
                <MdBookmarkBorder className="text-xl text-gray-500" />
                <Link to="/bookmarked-jobs">Bookmarked</Link>
              </div>
              <div
                onClick={handleLogout}
                className="cursor-pointer hover:text-word pl-2 flex items-center gap-4 hover:bg-highlight p-4 text-gray-500 text-[14px]"
              >
                <IoLogOutOutline className="text-xl text-gray-500" />
                Sign Out
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`flex text-[15px] font-bold items-center ${isScrolled ? "text-word " : "text-white"}`}>
          <Link to="/login" className="hover:underline">
            Login / Sign up
          </Link>
        </div>
      )}
    </>
  );
}

export default User;
