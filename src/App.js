import { useEffect, useState } from "react"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"

 import { ACCOUNT_TYPE } from "./utils/constants"
import { getUserDetails } from "./services/operations/profileAPI"
 

//Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import UpdatePassword from "./pages/UpdatePassword"
import ForgotPassword from "./pages/ForgotPassword"
import Dashboard from "./pages/Dashboard"
import NotFoundPage from "./pages/NotFoundPage"
import Profile from "./pages/Profile"
 
 
 
 //components
 import Navbar from "./components/common/Navbar"
 import OpenRoute from "./components/core/Auth/OpenRoute"
 import MyProfile from "./components/core/Dashboard/MyProfile"
 import PrivateRoute from "./components/core/Auth/PrivateRoute"
 import Settings from "./components/core/Dashboard/Settings"
 import PostNewJob from "./components/core/Dashboard/PostNewJob"
 import MyJobs from "./components/core/Dashboard/MyJobs"
 import EditJob from "./components/core/Dashboard/EditJob"
 import AppliedJobs from "./components/core/Dashboard/AppliedJobs"
 import Searchbar from "./components/core/Dashboard/Searchbar"
 import SavedJobs from "./components/core/Dashboard/SavedJobs"
 import Applicants from "./components/core/Dashboard/CreatorJobs/Applicants"
import UpdateProfile from "./components/core/Dashboard/Settings/UpdateProfile"
import Portfolio from "./components/core/Dashboard/Settings/Portfolio"
import DeleteAccount from "./components/core/Dashboard/Settings/DeleteAccount"
import ChangePassword from "./components/core/Dashboard/Settings/ChangePassword"
import Preloader from "./components/common/Preloader"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
     <>
      {
        loading ? <Preloader/> : (
          <div className="flex min-h-screen w-screen flex-col dark:bg-slate-900 dark:text-slate-400">
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>

      {/* Open Route for non logged in user */}
      <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

          {/* Private Route - for Only Logged in User */}
        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
               
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile/>} />
          <Route path="dashboard/Settings" element={<Settings />}/>
          <Route path="dashboard/Settings/update-profile" element={<UpdateProfile />} />
          <Route path="dashboard/Settings/change-password" element={<ChangePassword/>} />
          <Route path="dashboard/Settings/delete-account" element={<DeleteAccount />} />
          


           {/* Route only for Creator */}
          {user?.accountType === ACCOUNT_TYPE.CREATOR && (
            <>
              <Route path="dashboard/post-newjob" element={<PostNewJob/>} />
              <Route path="dashboard/posted-job" element={<MyJobs/>} />
              <Route path="dashboard/posted-job/:jobId" element={<Applicants/>} />
              <Route
                path="dashboard/edit-job/:jobId"
                element={<EditJob/>}
              />
              <Route path="dashboard/posted-job/:jobId/applicant-portfolio/:applicantId" element={<Profile/>}/>
            </>
          )}
           {/* Route only for jobseekeres */}
           {user?.accountType === ACCOUNT_TYPE.JOBSEEKER && (
            <>
              <Route
                path="dashboard/applied-jobs"
                element={<AppliedJobs/>}
              />
              <Route 
                path="dashboard/searchbar"
                element={<Searchbar/>}
              />
              <Route
                path="dashboard/saved-jobs"
                element={<SavedJobs/>}
                />
              <Route 
                path="dashboard/Settings/update-portfolio" 
                element={<Portfolio />} 
                />
              <Route path="dashboard/Settings/update-portfolio/creator-view/:applicantId"
                     element={<Profile/>} 
                />
            </>
          )}

        </Route>

        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
</div>
        )
      }
     </>
  );
}

export default App;
