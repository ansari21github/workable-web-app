
import React from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
        toast.success('Register successfully');
        try {
            await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, 'Users', user?.uid), {
                    email: user.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    photo: '',
                });
            }
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/login');
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
        if (!values.firstName) {
            errors.firstName = 'FirstName is required!';
        }
        if (!values.lastName) {
            errors.lastName = 'LastName is required!';
        }
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
                        Create an account
                    </h1>
                    <div className="my-4 mx-2 flex flex-col bg-white shadow-xl border-2 border-gray-100 rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className="border border-gray-400 py-2 px-2 rounded-md bg-white placeholder-gray-500 focus:outline-none"
                                />
                                <span className="text-red-600 text-sm">
                                    {formErrors.firstName}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className="border border-gray-400 py-2 px-2 rounded-md bg-white placeholder-gray-500 focus:outline-none"
                                />
                                <span className="text-red-600 text-sm">
                                    {formErrors.lastName}
                                </span>
                            </div>
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
                                <p className="text-red-600 text-sm">{formErrors.email}</p>
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
                            <p className="text-red-600 text-sm">{formErrors.password}</p>
                            <div className="px-5 text-gray-600 text-center">Already have an account?
                                <Link to="/login" className="text-custom-blue font-semibold"> Sign in</Link>
                            </div>
                            <button
                                type="submit"
                                className="mt-1 rounded-lg py-3 font-bold text-[15px] text-white bg-gren hover:bg-blur"
                            >
                                Register
                            </button>
                        </form>
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

export default Register;
