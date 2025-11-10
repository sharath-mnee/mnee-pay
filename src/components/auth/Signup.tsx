import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  const handleGithubSignIn = () => {
    console.log("Redirecting to GitHub OAuth...");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-[#F5F5F5] flex-col justify-between p-10">
        <div className="text-[#D97706] font-semibold text-lg flex items-center gap-2">
          <span className="text-2xl">⌘</span> Acme Inc
        </div>
        <p className="text-[#D97706] text-sm">
          “This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.” - Sofia Davis
        </p>
      </div>

      <div className="relative w-full md:w-1/2 flex justify-center items-center px-8">
        {/* Login Button - top right corner */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-8 text-sm text-gray-500 hover:underline"
        >
          Login
        </button>

        {/* Centered Content */}
        <div className="w-full max-w-sm text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Create an account
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your email below to create your account
          </p>

          <form onSubmit={handleEmailSignIn}>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            />

            <button
              type="submit"
              className="w-full bg-[#D97706] hover:bg-orange-400 text-white rounded-md py-2 font-medium transition-colors"
            >
              Sign In with Email
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs px-3">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGithubSignIn}
            className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.11.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.19.69-3.86-1.38-3.86-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.71.08-.71 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.27-5.23-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.17a11.02 11.02 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.34-5.24 5.62.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.21.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            <span>GitHub</span>
          </button>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
