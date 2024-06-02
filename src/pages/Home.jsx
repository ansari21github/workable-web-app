import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../components/User";
import MySvg from "../components/MySvg";
import { MdNavigateNext } from "react-icons/md";
import { RiFacebookFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoApple } from "react-icons/io5";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
function Home() {
  // State variables to manage SVG colors, scroll state, dropdown and mobile menu visibility
  
  const [svgColor1, setSvgColor1] = useState("white");
  const [svgColor2, setSvgColor2] = useState("white");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

 // useEffect hook to add scroll event listener and update state based on scroll position

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setSvgColor1("#333E49");
        setSvgColor2("#00756A");
        setIsScrolled(true);
      } else {
        setSvgColor1("white");
        setSvgColor2("white");
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

// Toggle functions to handle dropdown and mobile menu visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
       {/* Header Section */}
       {/* Navigation bar with sticky behavior */}
      <div
        className={`flex flex-col py-6 px-5 xl:px-28 sticky top-0 transition-colors duration-300 ${
          isScrolled ? "bg-white" : "bg-gren"
        }`}
      >
        <div className="flex justify-between items-center">
          <MySvg color1={svgColor1} color2={svgColor2} />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-7 mt-2 items-center">
            <div
              className={`text-[16px] font-bold cursor-pointer hover-underline ${
                isScrolled ? "text-word" : "text-white"
              }`}
            >
              Product
            </div>
            <div
              className={`text-[16px] font-bold cursor-pointer hover-underline ${
                isScrolled ? "text-word" : "text-white"
              }`}
            >
              Pricing
            </div>
            <div
              className={`text-[16px] font-bold cursor-pointer hover-underline ${
                isScrolled ? "text-word" : "text-white"
              }`}
            >
              Customers
            </div>
              {/* Resources dropdown */}
            <div className="flex cursor-pointer ">
              <div
                onClick={toggleDropdown}
                className={`text-[16px] font-bold hover-underline ${
                  isScrolled ? "text-word" : "text-white"
                }`}
              >
                Resources
              </div>
              <div
                className={`text-[26px] font-bold ${
                  isScrolled ? "text-word" : "text-white"
                }`}
              >
                <RiArrowDropDownLine />
              </div>
            </div>
            {/* User component */}
            <User isScrolled={isScrolled} />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className={`text-[25px] font-bold ${
                isScrolled ? "text-gren" : "text-white"
              }`}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col  mt-2 gap-4">
            <div
              className={`text-[16px] font-bold cursor-pointer hover-underline ${
                isScrolled ? "text-word" : "text-white"
              }`}
            >
              Product
            </div>
            <div
              className={`text-[16px] font-bold cursor-pointer hover-underline ${
                isScrolled ? "text-word" : "text-white"
              }`}
            >
              Pricing
            </div>
            <div
              className={`text-[16px] font-bold cursor-pointer hover-underline ${
                isScrolled ? "text-word" : "text-white"
              }`}
            >
              Customers
            </div>
            <div className="flex cursor-pointer hover-underline">
              <div
                onClick={toggleDropdown}
                className={`text-[16px] font-bold ${
                  isScrolled ? "text-word" : "text-white"
                }`}
              >
                Resources
              </div>
              <div
                className={`text-[26px] font-bold ${
                  isScrolled ? "text-word" : "text-white"
                }`}
              >
                <RiArrowDropDownLine />
              </div>
            </div>
            <User isScrolled={isScrolled} />
          </div>
        )}

        {/* Resources Dropdown */}
        {isDropdownOpen && (
          <div className="fixed top-0 left-0 w-full h-auto z-10 bg-white mt-20">
            <div className="flex flex-col gap-2 px-5 xl:px-28">
              <div className="flex flex-col md:flex-row justify-between gap-10 py-10 px-5 xl:px-28">
                <div className="flex flex-col gap-4">
                  <div className="text-[12px] text-gray-500 font-bold">
                    FOR EMPLOYERS
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Free Tools for Managers
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Create interview questions and evaluate candidates with
                      the power of AI
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Tutorials
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Get more done faster with our 200+ tutorials and
                      actionable plans
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Templates
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Pick your template - job description, email, policy, etc.
                      - and get to what matters
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Events
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Connect with experts in our live events - full of topical,
                      hands-on insights
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-gray-200"></div>
                <div className="flex flex-col gap-3">
                  <div className="text-[12px] text-gray-500 font-bold">
                    FOR JOBSEEKERS
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      <Link to="/jobs">Search for jobs</Link>
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Find jobs at companies that are hiring now
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Career Center
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Resources to help grow your career
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-500 font-bold mt-4">
                    FOR COMMUNITIES
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Branded Job Boards
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Create a custom job board for your community
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-gray-200"></div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div>
                      <img src="/assets/emailbox.webp" className="w-25 h-25" />
                    </div>
                    <div className="text-[16px] text-word font-bold hover:text-gren">
                      Stay on top with HR insights and guidance
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Subscribe to our newsletter and have the latest tips,
                      tricks, and insights delivered straight to your inbox!
                    </div>
                  </div>
                  <div className="border border-gren px-3 py-2 w-20 rounded-lg">
                    <p className="text-[10px] font-bold text-gren">SUBSCRIBE</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 bg-drop px-5 xl:px-28 py-4">
                <div className="flex gap-2">
                  <div className="text-gren mt-1">
                    <IoMdHelpCircleOutline />
                  </div>
                  <div className="text-word">Help Center</div>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="flex gap-2">
                  <div className="text-gren mt-1">
                    <RiContactsBookUploadFill />
                  </div>
                  <div className="text-word">Workable Academy</div>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="flex gap-2">
                  <div className="text-gren mt-1">
                    <MdOutlineHeadsetMic />
                  </div>
                  <div className="text-word">Contact Support</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
{/* Banner Section */}
      <div className="border-b border-gray-400 "></div>

      <div className="flex flex-col lg:flex-row-reverse bg-gren px-5 xl:px-28 py-32">
        <div className="w-full lg:w-1/2">
          <img
            src="/assets/game.webp"
            className="h-auto w-full lg:w-828"
            alt="Game"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 mt-7 lg:mt-0 gap-3">
          <div className="text-[21px] font-bold text-pich w-full lg:w-96">
            HIRING PLATFORM | HR SOFTWARE
          </div>
          <div className="text-[40px] text-left font-bold text-white w-full lg:w-96">
            A better way to recruit and manage successful teams
          </div>
          <div className="text-[20px] text-white w-full lg:w-96">
            Find, hire, onboard, and manage the right person for every job.
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row my-10 mt-28 gap-4 px-5 xl:px-28 items-center">
        <div className="hidden md:flex justify-center md:justify-start">
          <img
            src="/assets/animated-left.png"
            className="w-32 h-32"
            alt="Animated Left"
          />
        </div>

        {/* More Sections */}
        <div className="text-word font-bold text-[24px] md:text-[38px] w-full text-left md:text-center px-8">
          Manage your entire process,
          <br className="hidden md:block" />
          from sourcing to employee onboarding
          <br className="hidden md:block" />
          and management
        </div>
        <div className="hidden md:flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src="/assets/animated-right.png"
            className="w-32 h-32"
            alt="Animated Right"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 xl:px-28">
        <div className="flex justify-center">
          <div className="bg-light text-word px-5 py-1 font-bold rounded-lg text-[18px]">
            Workable Recruiting
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-2">
          <div className="flex flex-col mt-7 gap-2">
            <div>
              <img src="/assets/source.webp" alt="Source & Attract" />
            </div>
            <div className="text-[18px] text-gray-400 font-bold text-center">
              SOURCE & ATTRACT
            </div>
            <div className="text-[32px] font-bold text-word text-center">
              Find and attract candidates
            </div>
            <div className="text-[18px] text-word text-center">
              Fill your pipeline quickly with one-click job posting to 200+
              sites, AI-powered sourcing, employee referrals and more.
            </div>
            <div className="flex justify-center">
              <div className="text-[13px] text-gren font-bold hover:underline cursor-pointer">
                LEARN MORE
              </div>
              <div className="text-gren bold-icon">
                <MdNavigateNext size="20" />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 gap-2">
            <div>
              <img src="/assets/evaluate.webp" alt="Evaluate & Collaborate" />
            </div>
            <div className="text-[18px] text-gray-400 font-bold text-center">
              EVALUATE & COLLABORATE
            </div>
            <div className="text-[32px] font-bold text-word text-center">
              Move the right
              <br />
              applicants forward
            </div>
            <div className="text-[18px] text-word text-center">
              Collaborate with hiring teams to evaluate applicants, gather
              feedback and decide who's best, all in one recruiting system.
            </div>
            <div className="flex justify-center">
              <div className="text-[13px] text-gren font-bold hover:underline cursor-pointer">
                LEARN MORE
              </div>
              <div className="text-gren bold-icon">
                <MdNavigateNext size="20" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <img src="/assets/automate.webp" alt="Automate & Hire" />
            </div>
            <div className="text-[18px] text-gray-400 font-bold text-center">
              AUTOMATE & HIRE
            </div>
            <div className="text-[32px] font-bold text-word text-center">
              Make the best hire,
              <br />
              in half the time
            </div>
            <div className="text-[18px] text-word text-center">
              Move faster on a recruiting platform that automates process and
              manual tasks, like scheduling interviews and getting approvals.
            </div>
            <div className="flex justify-center">
              <div className="text-[13px] text-gren font-bold hover:underline cursor-pointer">
                LEARN MORE
              </div>
              <div className="text-gren bold-icon">
                <MdNavigateNext size="20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 xl:px-28 mt-24">
        <div className="flex justify-center">
          <div className="bg-light text-word px-5 py-1 font-bold rounded-lg text-[18px]">
            Workable HR
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:px-5 lg:px-28 gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <div>
              <img src="/assets/onboard.webp" alt="Onboard & Manage" />
            </div>
            <div className="text-[18px] text-gray-400 font-bold text-center">
              ONBOARD & MANAGE
            </div>
            <div className="text-[32px] font-bold text-word text-center">
              Help great hires become great employees
            </div>
            <div className="text-[18px] text-word text-center">
              Create custom onboarding experiences, have new hires e-sign
              documents, and store all employee info in one place.
            </div>
            <div className="flex justify-center">
              <div className="text-[13px] text-gren font-bold hover:underline cursor-pointer">
                LEARN MORE
              </div>
              <div className="text-gren bold-icon">
                <MdNavigateNext size="20" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <img src="/assets/track.webp" alt="Track & Perform" />
            </div>
            <div className="text-[18px] text-gray-400 font-bold text-center">
              TRACK & PERFORM
            </div>
            <div className="text-[32px] font-bold text-word text-center">
              Track HR processes and help employees perform
            </div>
            <div className="text-[18px] text-word text-center">
              Set custom policies to automatically track time off and improve
              employee performance with custom reviews (coming soon).
            </div>
            <div className="flex justify-center">
              <div className="text-[13px] text-gren font-bold hover:underline cursor-pointer">
                LEARN MORE
              </div>
              <div className="text-gren bold-icon">
                <MdNavigateNext size="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Footer Section */}
      <div className="flex flex-col py-5 mt-24 px-5 xl:px-28 gap-3 bg-custom-purp">
        <div className="flex flex-col md:flex-row md:gap-5 justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-lg text-white font-bold">PRODUCT</div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Source & attract
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Evaluate & collaborate
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Automate & hire
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Onboard & manage
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Track & perform
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Reduce time to hire
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Modernize the candidate experience
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Improve DEI
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Ensure compliance
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              All features
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg text-white font-bold">PLATFORM</div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Pricing
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Post a job for free
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Accelerate hiring with AI
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Why Workable
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Help center
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Partners & integrations
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Become a partner
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Developer API
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Security
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Real-time customer satisfaction
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg text-white font-bold">
              EMPLOYER RESOURCES
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Job descriptions
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Applicant tracking
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Interview questions
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Hiring resources
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Hiring templates
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Hiring tutorials
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Free Tools for Managers
            </div>
            <div className="flex flex-col mt-2 gap-2">
              <div className="text-lg text-white font-bold">
                JOBSEEKER RESOURCES
              </div>
              <div className="text-md text-white hover:underline cursor-pointer">
                <Link to="/jobs">Search for jobs</Link>
              </div>
              <div className="text-md text-white hover:underline cursor-pointer">
                Career center
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg text-white font-bold">WORKABLE</div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Work with us
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Backstage
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Press
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              Contact us
            </div>
            <div className="text-md text-white hover:underline cursor-pointer">
              About
            </div>
          </div>
        </div>
        <div className="xl:px-26 mt-4">
          <div className="border-b border-gray-500 my-5"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between px-5 xl:px-26 gap-3 md:gap-0">
          <div className="flex flex-col gap-2">
            <div className="text-md text-white">Americas: +1 857 990 9675</div>
            <div className="text-md text-white">
              Europe & Rest of World: +44 203 826 8149
            </div>
          </div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <div className="text-white">
              <FaLinkedinIn size={26} />
            </div>
            <div className="text-white">
              <RiFacebookFill size={26} />
            </div>
            <div className="text-white">
              <FaYoutube size={26} />
            </div>
            <div className="text-white">
              <RiInstagramFill size={26} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex border border-white rounded-lg px-5 gap-2">
              <div className="text-white mt-3">
                <IoLogoApple size={28} />
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-white text-[10px]">Download on</div>
                <div className="text-white">App Store</div>
              </div>
            </div>
            <div className="flex border border-white rounded-lg px-4 gap-2">
              <div className="text-white mt-3">
                <IoLogoGooglePlaystore size={28} />
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-white text-[10px]">Download on</div>
                <div className="text-white">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-3 md:gap-28 bg-foot py-6 px-5 xl:px-28">
        <div className="text-[15px] text-word mb-3 md:mb-0">
          © Workable Technology Limited 2012-2024
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Terms
          </div>
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Privacy
          </div>
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Cookie Settings
          </div>
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Cookie Policy
          </div>
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Do not sell/share my personal information
          </div>
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Accessibility
          </div>
          <div className="text-[14px] text-word cursor-pointer hover:underline">
            Status
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
