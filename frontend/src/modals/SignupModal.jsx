import axios from "axios";
import { useState } from "react";

import BarLoader from "react-spinners/BarLoader";
import { signupFailedToast, signupSuccessToast } from "../toasts/toast";
import { useDispatch } from "react-redux";
import { hideSignModal } from "../reducers/authSlice";

export const SignupModal = () => {
  const [loading, setLoading] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
    photo: null,
  });
  const dispatch = useDispatch();

  const handleSignupDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setSignupDetails((prevDetails) => ({ ...prevDetails, photo: file }));
  };

  const handleDataInsert = async (e) => {
    e.preventDefault();

    if (
      signupDetails.username !== "" &&
      signupDetails.email !== "" &&
      signupDetails.password !== "" &&
      signupDetails.photo !== null
    ) {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("username", signupDetails.username);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("photo", signupDetails.photo);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          dispatch(hideSignModal());
          signupSuccessToast(response.data.message); // Show success toast
        } else {
          signupFailedToast(response.data.error); // Show error toast
        }
      } catch (err) {
        console.log("Error during registration:", err.response.data.error);
        signupFailedToast("Registration failed. Please try again."); // Show generic error toast
      } finally {
        setLoading(false);
        setSignupDetails({
          username: "",
          email: "",
          password: "",
          photo: null,
        });
      }
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={(e) => handleDataInsert(e)}>
        <div className="signup-form-heading">
          <h2 className="signup-form-heading-text">
            Create a CITY MOVIE Account
          </h2>
          <button
            type="button"
            className="btn-form-exit"
            onClick={() => dispatch(hideSignModal())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="form-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </button>
        </div>

        <div className="signup-form-body">
          <div className="signup-form-category">
            <label>
              Username: <span>*</span>
            </label>
            <input
              name="username"
              type="text"
              placeholder="Enter Username"
              onChange={(e) => handleSignupDetails(e)}
              value={signupDetails.username}
              required
            />
          </div>

          <div className="signup-form-category">
            <label>
              Email: <span>*</span>
            </label>
            <input
              name="email"
              type="email"
              value={signupDetails.email}
              placeholder="Enter Email"
              onChange={(e) => handleSignupDetails(e)}
              required
            />
          </div>

          <div className="signup-form-category">
            <label>
              Password: <span>*</span>
            </label>
            <input
              name="password"
              value={signupDetails.password}
              type="password"
              onChange={(e) => handleSignupDetails(e)}
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="signup-form-category">
            <label>
              Upload Photo: <span>*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e)}
              required
            />
          </div>

          <button type="submit" className="btn-reg" disabled={loading}>
            {loading ? <BarLoader color="#e6e6e8" /> : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};
