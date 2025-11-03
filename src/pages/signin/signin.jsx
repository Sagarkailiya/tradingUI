import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in:", user);

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      toast.success(`Welcome ${user.displayName}`);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Logo/Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-semibold text-purple-600">TS</span>
            </div>
          </div>

          {/* User ID */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">TradeSmart</h2>
            <button className="text-blue-500 text-sm hover:underline">
              Change user
            </button>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                Sign in with Google
              </>
            )}
          </button>

          {/* Footer Link */}
          <div className="text-center">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              Forgot user ID or password?
            </a>
          </div>
        </div>

       

        
      </div>
    </div>
  );
}