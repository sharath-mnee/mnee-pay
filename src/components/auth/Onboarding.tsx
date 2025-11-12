import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, Zap, CircleCheckBig, Database  } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
  const [emailError, setEmailError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [businessError, setBusinessError] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleCreateAccount = async (): Promise<void> => {
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }    
    setStep(2);
  };

  const handleEnterBeta = (): void => {
    navigate('/dashboard');
  };

  const handleBackToEmail = (): void => {
    setStep(3);
    setVerificationCode(['', '', '', '', '', '']);
    setCodeError('');
  };

  const handleProfileSubmit = async (): Promise<void> => {
    if (!fullName.trim()) {
      setNameError('Please enter your full name');
      return;
    }

    if (!businessName.trim()) {
      setBusinessError('Please enter your business name');
      return;
    }
    setStep(4);
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

  const handleVerify = async (): Promise<void> => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setCodeError('Please enter the complete 6-digit code');
      return;
    }
    console.log('Account created successfully!');
    setStep(3)
    alert('Account verified!');
  };

  const handleResend = async (): Promise<void> => {
    setVerificationCode(['', '', '', '', '', '']);
    setCodeError('');
    alert('Verification code resent!');
  };

  const isEmailValid = email && validateEmail(email);
  const isProfileValid = fullName.trim() && businessName.trim();
  const isCodeComplete = verificationCode.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F5F5F5] p-12 flex-col">
        <div className="mb-12">
          <img
          src="/logo.svg"
          alt="Logo"
          className="h-20 w-auto"
        />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Accept every stablecoin.<br />Manage it once.
          </h1>
          <p className="text-gray-600 mb-12">
            MNEE Pay merchant unifies crypto payments, slashes fees, and turns your balance into an earning asset.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Coins size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accept any stablecoin</h3>
              <p className="text-sm text-gray-600">
                Your customers pay with what they have; you receive one unified asset: MNEE
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Zap size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant, low fee-settlement</h3>
              <p className="text-sm text-gray-600">
                Get paid in seconds for a 1%, avoiding 3+% credit card fees
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn while you hold</h3>
              <p className="text-sm text-gray-600">
                Coming soon: MNEE balances generate yield automatically, turning idel funds into income.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Plug and play integration</h3>
              <p className="text-sm text-gray-600">
                Drop in a customized module button and start accepting crypto in minutes - no code, no new rails.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex bg-white items-center justify-center p-4 lg:p-12">
        <div className={`w-full ${step === 4 ? 'max-w-xl' : 'max-w-md'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {step !== 4 && (
              <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Step 1: Email Signup */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Create your merchant account
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Enter your email address to get started with MNEE Pay
                </p>

                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateAccount()}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                <button
                  onClick={handleCreateAccount}
                  disabled={!email}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    isEmailValid
                      ? 'bg-[#D97706] hover:bg-orange-400 text-white'
                      : 'bg-gray-100 cursor-not-allowed text-gray-500'
                  }`}
                >
                  Create account
                </button>

                <p className="text-sm text-gray-600 text-center mt-4">
                  Already have an account?{' '}
                  <a href="/" className="text-gray-900 underline hover:text-orange-400">
                    Sign in
                  </a>
                </p>

                {/* <p className="text-xs text-gray-500 text-center mt-4">
                  By clicking sign up, you agree to our{' '}
                  <a href="#" className="underline">Terms of Service</a> and{' '}
                  <a href="#" className="underline">Privacy Policy</a>.
                </p> */}
              </>
            )}

            {/* Step 4: Beta Welcome */}
            {step === 4 && (
              <>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to the MNEE Pay beta
                  </h2>
                  <p className="text-sm text-gray-600">
                    Your account is being set up and will be ready shortly. You're now part of an exclusive group of merchants revolutionizing payments.
                  </p>
                </div>

                <div className="rounded-lg p-5 mb-6 hover:shadow-sm transition-shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <Database size={30} strokeWidth={1.5} />
                        <h3 className="font-semibold text-gray-900">
                            Support crypto-paying customers
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Tap into the growing market of customers who prefer to pay with cryptocurrency. 
                        Increase your revenue while staying ahead of payment trends.
                    </p>
                </div>

                  <div className="space-y-3 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CircleCheckBig size={20} color='green'/>
                      Instant settlement in your preferred currency
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CircleCheckBig size={20} color='green'/>
                      Lower transaction fees than traditional cards
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CircleCheckBig size={20} color='green'/>
                      24/7 customer support during beta
                    </div>
                  </div>

                <button
                  onClick={handleEnterBeta}
                  className="w-full py-2 rounded-lg font-medium text-white bg-[#D97706] hover:bg-orange-400 transition-colors"
                >
                  Enter the beta
                </button>
              </>
            )}

            {/* Step 3: Profile Completion */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Email verified!
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Your email has been successfully verified.
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Now let's set up your account.
                </p>

                <h3 className="text-base font-medium text-gray-900 mb-4">
                  Complete your profile
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Enter your details to create your RockWallet account
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter first and last name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setNameError('');
                      }}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        nameError ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm`}
                    />
                    {nameError && (
                      <p className="text-red-500 text-xs mt-1">{nameError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Business name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your business name"
                      value={businessName}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                        setBusinessError('');
                      }}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        businessError ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm`}
                    />
                    {businessError && (
                      <p className="text-red-500 text-xs mt-1">{businessError}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleProfileSubmit}
                  disabled={!fullName.trim() || !businessName.trim()}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    isProfileValid
                      ? 'bg-[#D97706] hover:bg-orange-400 text-white'
                      : 'bg-gray-100 cursor-not-allowed text-gray-500'
                  }`}
                >
                  Create account
                </button>
              </>
            )}

            {/* Step 2: Verification Code */}
            {step === 2 && (
              <>
                <button
                  onClick={handleBackToEmail}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to email
                </button>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Enter verification code
                </h2>
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
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    isCodeComplete
                      ? 'bg-[#D97706] hover:bg-orange-400 text-white'
                      : 'bg-gray-100 cursor-not-allowed text-gray-500'
                  }`}
                >
                  Verify
                </button>

                <p className="text-sm text-gray-600 text-center mt-4">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResend}
                    className="text-gray-600 underline hover:text-orange-500"
                  >
                    Resend
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;