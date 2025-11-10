import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
  const [emailError, setEmailError] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleLogin = (): void => {
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setStep('verification');
  };

  const handleCodeChange = (index: number, value: string): void => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setCodeError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (): void => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setCodeError('Please enter the complete 6-digit code');
      return;
    }
    console.log('Verifying code:', code);
    alert('Login successful!');
    navigate("/dashboard")
  };

  const handleResend = (): void => {
    setVerificationCode(['', '', '', '', '', '']);
    setCodeError('');
    
    alert('Verification code resent!');
  };

  const handleBackToEmail = (): void => {
    setStep('email');
    setVerificationCode(['', '', '', '', '', '']);
    setCodeError('');
  };

  const isEmailValid = email && validateEmail(email);
  const isCodeComplete = verificationCode.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-20 w-auto"
        />
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {step === 'email' ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Login with your email
            </p>

            <div className="mb-6 shadow-xs">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className={`w-full px-4 py-3 rounded-lg text-[#737373] border ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm placeholder:text-base`}
                />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <button
              onClick={handleLogin}
              disabled={!email}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isEmailValid
                  ? 'bg-[#D97706] hover:bg-orange-600 text-white'
                  : 'bg-[#F5F5F5] cursor-not-allowed text-[#737373] '
              }`}
            >
              Login
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{' '}
              <a href="/signup" className="text-gray-900 underline hover:text-orange-500">
                Sign up
              </a>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={handleBackToEmail}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to email
            </button>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Enter verification code
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              We sent a 6-digit code to your email.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Verification code
              </label>
              <div className="flex gap-2 justify-between mb-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-lg font-semibold rounded-lg border ${
                      codeError ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Enter the 6-digit code sent to your email.
              </p>
              {codeError && (
                <p className="text-red-500 text-xs mt-1">{codeError}</p>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={!isCodeComplete}
              className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                isCodeComplete
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Verify & Sign in
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                className="text-gray-900 underline hover:text-orange-500"
              >
                Resend
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;