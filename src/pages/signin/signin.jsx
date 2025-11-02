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
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-white relative overflow-hidden">

     

      
      <div className="relative z-10 max-w-md w-full bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
        <h1 className="text-3xl font-extrabold text-green-400 mb-3">TradeSmart</h1>
        <p className="text-gray-300 mb-6 text-sm">
          Invest smartly in <span className="text-green-400 font-medium">Stocks</span>,{" "}
          <span className="text-yellow-400 font-medium">Derivatives</span>,{" "}
          <span className="text-blue-400 font-medium">Commodities</span>, and{" "}
          <span className="text-pink-400 font-medium">Mutual Funds</span>.
        </p>

       
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="flex items-center justify-center gap-3 w-full px-5 py-3 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                className="w-5 h-5 bg-white rounded-full p-0.5"
              />
              Continue with Google
            </>
          )}
        </button>

       
        <p className="text-gray-400 text-xs mt-6">
          Secure login with your Google account.
          <br />We never post or share your data.
        </p>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-500/10 via-transparent to-transparent">
        <svg
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          className="w-full h-full opacity-40"
        >
          <path
            d="M0,50 C150,90 350,10 500,50 L500,00 L0,0 Z"
            fill="url(#grad)"
          />
          
        </svg>
      </div>
    </div>
  );
}
