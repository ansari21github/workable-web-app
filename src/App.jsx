
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {Route , Routes} from "react-router-dom"
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import JobsApplied from "./pages/JobsApplied";
import BookmarkedJobs from './pages/BookmarkedJobs';
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Register/>} />
    <Route path="/jobs" element={<Jobs/>} />
   <Route path="/job/:id" element={<JobDetail/>} />
   <Route path="/jobs-applied" element={<JobsApplied/>} />
   <Route path="/bookmarked-jobs" element={<BookmarkedJobs/>} />
   <Route path="*" element={<PageNotFound />} />
   </Routes>
   </> 
  )
}

export default App;
