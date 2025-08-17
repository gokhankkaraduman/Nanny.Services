import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RiUserHeartLine, RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine, RiLoginBoxLine } from 'react-icons/ri';
import { GoogleLogin } from '@react-oauth/google';
import { LoginSchema } from '../../utils/validation';
import { handleGoogleAuth } from '../../utils/googleAuth';
import Header from '../../components/Header/Header.jsx';
import style from './LoginPage.module.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const googleLoginRef = useRef(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    try {
      const result = await handleGoogleAuth(credentialResponse, 'login');
      
      if (result.success) {
        console.log('Login successful:', result.data);
        // Redirect to dashboard or home page
        navigate('/dashboard');
      } else {
        console.error('Login failed:', result.error);
        // You can show an error message to user here
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    setIsGoogleLoading(false);
    const result = handleGoogleError(error, 'login');
    console.error('Google login error:', result.error);
    alert(result.message);
  };

  const handleCustomGoogleClick = () => {
    // Trigger the hidden Google OAuth button
    if (googleLoginRef.current) {
      const googleButton = googleLoginRef.current.querySelector('div[role="button"]');
      if (googleButton) {
        googleButton.click();
      }
    }
  };

  return (
    <>
      <div className={style.loginPage}>
        <Header />
        <div className={style.loginContainer}>
          <div className={style.loginCard}>
            <Formik
              initialValues={{ email: '', password: '', rememberMe: false }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log('Form submitted:', values);
                setTimeout(() => { setSubmitting(false); }, 1000);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={style.loginForm}>
                  <h2 className={style.formTitle}>
                    <RiLoginBoxLine />
                    Sign In
                  </h2>
                  <p className={style.formSubtitle}>Welcome back! Please enter your details.</p>

                  {/* Email Input */}
                  <div className={style.inputGroup}>
                    <div className={style.inputWrapper}>
                      <RiMailLine className={style.inputIcon} />
                      <Field type="email" name="email" placeholder="Enter your email" className={`${style.input} ${errors.email && touched.email ? style.inputError : ''}`} />
                    </div>
                    <ErrorMessage name="email" component="div" className={style.errorMessage} />
                  </div>

                  {/* Password Input */}
                  <div className={style.inputGroup}>
                    <div className={style.inputWrapper}>
                      <RiLockLine className={style.inputIcon} />
                      <Field type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" className={`${style.input} ${errors.password && touched.password ? style.inputError : ''}`} />
                      <button type="button" className={style.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className={style.errorMessage} />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className={style.formOptions}>
                    <label className={style.rememberMe}>
                      <Field type="checkbox" name="rememberMe" />
                      Remember me
                    </label>
                    <Link to="/forgot-password" className={style.forgotPassword}>Forgot password?</Link>
                  </div>

                  {/* Submit Button, Divider, Social Login Group */}
                  <div className={style.buttonGroup}>
                    <button type="submit" className={style.submitButton} disabled={isSubmitting}>
                      <RiLoginBoxLine />
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div className={style.divider}>or</div>
                    <button 
                      type="button" 
                      className={style.googleButton}
                      onClick={handleCustomGoogleClick}
                      disabled={isGoogleLoading}
                    >
                      <div className={style.googleIcon}></div>
                      <span>{isGoogleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                    </button>
                    {/* Hidden Google OAuth Button */}
                    <div ref={googleLoginRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        theme="outline"
                        size="large"
                        text="continue_with"
                        shape="rectangular"
                        width="100%"
                      />
                    </div>
                  </div>

                  {/* Register Link */}
                  <div className={style.registerSection}>
                    <p>Don't have an account? <Link to="/register" className={style.registerLink}>Sign up</Link></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
