import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import heroImage from '../../assets/hero-book-floating-water.jpg';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (isSignUp) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return newErrors;
  };

  const getErrorMessage = (error) => {
    const errorCode = error.code;
    
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try signing in instead.';
      case 'auth/user-not-found':
        return 'No account found with this email. Try signing up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-In was cancelled. Please try again.';
      case 'auth/popup-blocked':
        return 'Google Sign-In was blocked. Please allow popups and try again.';
      case 'auth/invalid-credential':
        return 'Invalid login credentials. Please check your email and password.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    try {
      console.log('Attempting authentication:', { isSignUp, email: formData.email });
      
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.fullName);
      } else {
        await signIn(formData.email, formData.password);
      }
      
      console.log('Authentication successful, navigating to onboarding');
      navigate('/onboarding');
    } catch (error) {
      console.error('Authentication error:', error);
      const friendlyMessage = getErrorMessage(error);
      setErrors({ general: friendlyMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      console.log('Attempting Google Sign-In');
      await signInWithGoogle();
      console.log('Google Sign-In successful, navigating to onboarding');
      navigate('/onboarding');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      const friendlyMessage = getErrorMessage(error);
      setErrors({ general: friendlyMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Email is required for password reset' });
      return;
    }
    
    try {
      await resetPassword(formData.email);
      setErrors({ general: 'Check your email for a reset link' });
    } catch (error) {
      const friendlyMessage = getErrorMessage(error);
      setErrors({ general: friendlyMessage });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gi-deep/80 via-gi-deep/90 to-gi-deep" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* App Name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light tracking-wider text-gi-white mb-2">
            Genba Ikigai
          </h1>
          <p className="text-gi-horizon text-sm">
            Leading to Serve - A Journey of Continuous Improvement
          </p>
        </div>

        {/* Login Form */}
        <div className="gi-card p-8">
          <h2 className="text-2xl font-light text-gi-white mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>

          {errors.general && (
            <div className="bg-gi-ember/20 border border-gi-ember text-gi-white p-3 rounded-lg mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold"
                />
                {errors.fullName && (
                  <p className="text-gi-ember text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold"
              />
              {errors.email && (
                <p className="text-gi-ember text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gi-mist hover:text-gi-white"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="text-gi-ember text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-gi-water/10 border border-gi-horizon/30 rounded-lg text-gi-white placeholder-gi-mist focus:outline-none focus:border-gi-gold"
                />
                {errors.confirmPassword && (
                  <p className="text-gi-ember text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gi-button-primary disabled:opacity-50"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-gi-horizon hover:text-gi-white text-sm"
              >
                Forgot password?
              </button>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gi-horizon/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gi-mist">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full mt-4 gi-button-secondary disabled:opacity-50"
            >
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
                setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
              }}
              className="text-gi-horizon hover:text-gi-white text-sm"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
