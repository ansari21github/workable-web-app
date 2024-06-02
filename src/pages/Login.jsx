

import React from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider, db } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import Footer from "../components/Footer";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem('token', result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      if (result.user) {
        await setDoc(doc(db, 'Users', result.user?.uid), {
          email: result.user.email,
          firstName: result.user.displayName,
          photo: result.user.photoURL,
          lastName: '',
        });
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

// Validation section

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }
    return errors;
  };

  return (
    // Header section
    <div className="flex flex-col min-h-screen">
      <div className="py-2 bg-custom-blue">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              className="h-16 w-42 p-2 mx-auto"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="flex flex-col w-full max-w-md mx-4 my-14 md:mx-auto">
          <h1 className="text-2xl text-center font-semibold mb-4">
            <Link to="/signup" className="hover:text-custom-blue">Create an account</Link> or log in
          </h1>
          <div className="my-4 mx-2 flex flex-col bg-white shadow-xl border-2 border-gray-100 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="border border-gray-400 py-2 px-2 rounded-md bg-white placeholder-gray-500 focus:outline-none"
                />
                <p className="text-red-600">{formErrors?.email}</p>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "password" : "text"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full border border-gray-400 bg-white rounded-md py-2 px-2 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 py-2 rounded-md"
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
              <p className="text-red-600">{formErrors.password}</p>
              <button
                type="submit"
                className="mt-4 rounded-lg py-3 font-bold text-sm text-white bg-gren hover:bg-blur"
              >
                Sign In
              </button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm font-bold text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleSignInWithGoogle}
              className="w-full rounded-lg border border-gray-500 font-bold text-lg text-gray-500 hover:text-gray-400 bg-white py-2 flex justify-center items-center gap-4"
            >
              <FcGoogle className="text-xl" />
              <p className="text-sm">Continue with Google</p>
            </button>
          </div>
          <div className="mt-4 text-center px-2 text-sm">
            <p>
              By signing up and using the services, you confirm that you have
              accepted our
              <span className="text-gren cursor-pointer hover:underline"> Terms and Conditions </span>
              and have read our
              <span className="text-gren cursor-pointer hover:underline"> Privacy Policy </span>.
            </p>
          </div>
        </div>
      </div>
      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default Login;
