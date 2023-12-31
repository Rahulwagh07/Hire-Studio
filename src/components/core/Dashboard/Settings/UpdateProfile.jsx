import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
import UpdateProfilePicture from "./UpdateProfilePicture"
import { ACCOUNT_TYPE } from "../../../../utils/constants"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function UpdateProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className="">
      <UpdateProfilePicture/>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-4  border border-sky-400 section_bg box-shadow rounded-md p-8 sm:px-1 px-12">
          <h2 className="text-lg font-semibold">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style border border-blue-150"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style border border-blue-150"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style border border-blue-150"
                placeholder="select date of birth"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style border border-blue-150"
                {...register("gender", {
                  required: {
                    value: true,}})}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele} className="dark:bg-slate-800">
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style border border-blue-150"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style border border-blue-150"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please write something about you.
                </span>
              )}
            </div>
          </div>

            <div className={user && user.accountType === ACCOUNT_TYPE.CREATOR ? "flex justify-end" : "grid lg:grid-cols-2 "}>
            {
            user && user.accountType === ACCOUNT_TYPE.JOBSEEKER &&
            <div className="flex flex-col">
              <label htmlFor="role">Interested Role</label>
              <select
                name="role"
                id="role"
                className="form-style border border-blue-150 lg:w-[340px]"
                {...register("role", { required: true })}
                defaultValue={user?.additionalDetails?.role}
              >
                <option value="" className="dark:bg-slate-800">Select Interested Role</option>
                <option value="Video Editing" className="dark:bg-slate-800">Video Editing</option>
                <option value="Content Creation and Writing" className="dark:bg-slate-800">Content Creation and Writing</option>
                <option value="Script Writing" className="dark:bg-slate-800">Script Writing</option>  
                <option value="Management and Administation" className="dark:bg-slate-800">Management and Administration</option>
                <option value="SEO and Analytics" className="dark:bg-slate-800">SEO and Analytics</option>  
                <option value="Thumbnail Design" className="dark:bg-slate-800">Thumbnail Design</option>
                <option value="Public Relations(PR)" className="dark:bg-slate-800">Public Relations</option>
              </select>
              {errors.role && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please Select Your Interested Role.
                </span>
              )}
            </div>
           }


          <div className="flex justify-end gap-2 mt-8">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save" />
          </div>
            </div>
        </div>
      </form>
    </div>
  )
}
