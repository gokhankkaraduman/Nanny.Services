import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RiUserHeartLine, RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine, RiUserLine, RiPhoneLine, RiUserAddLine } from 'react-icons/ri';
import { GoogleLogin } from '@react-oauth/google';
import { RegisterSchema } from '../../utils/validation';
import { handleGoogleAuth } from '../../utils/googleAuth';
import Header from '../../components/Header/Header.jsx';
import style from './RegisterPage.module.css';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const googleRegisterRef = useRef(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    try {
      const result = await handleGoogleAuth(credentialResponse, 'register');
      
      if (result.success) {
        console.log('Registration successful:', result.data);
        // Redirect to dashboard or home page
        navigate('/dashboard');
      } else {
        console.error('Registration failed:', result.error);
        // You can show an error message to user here
        alert(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    setIsGoogleLoading(false);
    console.error('Google registration error:', error);
    alert('Google registration failed. Please try again.');
  };

  const handleCustomGoogleClick = () => {
    // Trigger the hidden Google OAuth button
    if (googleRegisterRef.current) {
      const googleButton = googleRegisterRef.current.querySelector('div[role="button"]');
      if (googleButton) {
        googleButton.click();
      }
    }
  };

  return (
    <>
      <div className={style.registerPage}>
        <Header />
        <div className={style.registerContainer}>
          <div className={style.registerCard}>
            <Formik
              initialValues={{ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', terms: false }}
              validationSchema={RegisterSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log('Form submitted:', values);
                setTimeout(() => { setSubmitting(false); }, 1000);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={style.registerForm}>
                  <h2 className={style.formTitle}>
                    <RiUserAddLine />
                    Create Account
                  </h2>
                  <p className={style.formSubtitle}>Join us! Please fill in your details to create your account.</p>

                  {/* Name Group */}
                  <div className={style.nameGroup}>
                    {/* First Name Input */}
                    <div className={style.inputGroup}>
                      <div className={style.inputWrapper}>
                        <RiUserLine className={style.inputIcon} />
                        <Field type="text" name="firstName" placeholder="First Name" className={`${style.input} ${errors.firstName && touched.firstName ? style.inputError : ''}`} />
                      </div>
                      <ErrorMessage name="firstName" component="div" className={style.errorMessage} />
                    </div>
                    {/* Last Name Input */}
                    <div className={style.inputGroup}>
                      <div className={style.inputWrapper}>
                        <RiUserLine className={style.inputIcon} />
                        <Field type="text" name="lastName" placeholder="Last Name" className={`${style.input} ${errors.lastName && touched.lastName ? style.inputError : ''}`} />
                      </div>
                      <ErrorMessage name="lastName" component="div" className={style.errorMessage} />
                    </div>
                  </div>

                  {/* Email & Phone Group */}
                  <div className={style.emailPhoneGroup}>
                    {/* Email Input */}
                    <div className={style.inputGroup}>
                      <div className={style.inputWrapper}>
                        <RiMailLine className={style.inputIcon} />
                        <Field type="email" name="email" placeholder="Email Address" className={`${style.input} ${errors.email && touched.email ? style.inputError : ''}`} />
                      </div>
                      <ErrorMessage name="email" component="div" className={style.errorMessage} />
                    </div>
                    {/* Phone Input */}
                    <div className={style.inputGroup}>
                      <div className={style.inputWrapper}>
                        <RiPhoneLine className={style.inputIcon} />
                        <Field type="tel" name="phone" placeholder="Phone Number" className={`${style.input} ${errors.phone && touched.phone ? style.inputError : ''}`} />
                      </div>
                      <ErrorMessage name="phone" component="div" className={style.errorMessage} />
                    </div>
                  </div>

                  {/* Password Group */}
                  <div className={style.passwordGroup}>
                    {/* Password Input */}
                    <div className={style.inputGroup}>
                      <div className={style.inputWrapper}>
                        <RiLockLine className={style.inputIcon} />
                        <Field type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className={`${style.input} ${errors.password && touched.password ? style.inputError : ''}`} />
                        <button type="button" className={style.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                        </button>
                      </div>
                      <ErrorMessage name="password" component="div" className={style.errorMessage} />
                    </div>
                    {/* Confirm Password Input */}
                    <div className={style.inputGroup}>
                      <div className={style.inputWrapper}>
                        <RiLockLine className={style.inputIcon} />
                        <Field type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" className={`${style.input} ${errors.confirmPassword && touched.confirmPassword ? style.inputError : ''}`} />
                        <button type="button" className={style.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                        </button>
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className={style.errorMessage} />
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className={style.termsCheckbox}>
                    <label>
                      <Field type="checkbox" name="terms" />
                      <span>
                        I agree to the{' '}
                        <Link to="/terms" className={style.termsLink}>Terms of Service</Link> and{' '}
                        <Link to="/privacy" className={style.termsLink}>Privacy Policy</Link>
                      </span>
                    </label>
                    <ErrorMessage name="terms" component="div" className={style.errorMessage} />
                  </div>

                  {/* Submit Button, Divider, Social Register Group */}
                  <div className={style.buttonGroup}>
                    <button type="submit" className={style.submitButton} disabled={isSubmitting}>
                      <RiUserAddLine />
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <div className={style.divider}>or</div>
                    <button 
                      type="button" 
                      className={style.googleButton}
                      onClick={handleCustomGoogleClick}
                      disabled={isGoogleLoading}
                    >
                      <div className={style.googleIcon}></div>
                      <span>{isGoogleLoading ? 'Creating account...' : 'Sign up with Google'}</span>
                    </button>
                    {/* Hidden Google OAuth Button */}
                    <div ref={googleRegisterRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        theme="outline"
                        size="large"
                        text="signup_with"
                        shape="rectangular"
                        width="100%"
                      />
                    </div>
                  </div>

                  {/* Login Link */}
                  <div className={style.loginSection}>
                    <p>Already have an account? <Link to="/login" className={style.loginLink}>Sign in</Link></p>
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
