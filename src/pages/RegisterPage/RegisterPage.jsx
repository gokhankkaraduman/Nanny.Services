import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiUserHeartLine, RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine, RiUserLine, RiPhoneLine } from 'react-icons/ri';
import style from './RegisterPage.module.css';

// Validation Schema
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Register attempt:', values);
    // Burada kayıt işlemi yapılacak
    setSubmitting(false);
  };

  return (
    <div className={style.registerContainer}>
      <div className={style.registerCard}>
        {/* Logo */}
        <div className={style.logoSection}>
          <div className={style.logoIcon}>
            <RiUserHeartLine />
          </div>
          <h1 className={style.logoTitle}>
            <span className={style.nanny}>Nanny</span>
            <span className={style.services}>Services</span>
          </h1>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ 
            firstName: '', 
            lastName: '', 
            email: '', 
            phone: '', 
            password: '', 
            confirmPassword: '',
            terms: false
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={style.registerForm}>
              <h2 className={style.formTitle}>Create Account</h2>
              <p className={style.formSubtitle}>Join us! Create your new account</p>

              {/* Name Inputs */}
              <div className={style.nameGroup}>
                <div className={style.inputGroup}>
                  <div className={style.inputWrapper}>
                    <div className={style.inputIcon}>
                      <RiUserLine />
                    </div>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className={`${style.input} ${errors.firstName && touched.firstName ? style.inputError : ''}`}
                    />
                  </div>
                  <ErrorMessage name="firstName" component="div" className={style.errorMessage} />
                </div>
                <div className={style.inputGroup}>
                  <div className={style.inputWrapper}>
                    <div className={style.inputIcon}>
                      <RiUserLine />
                    </div>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      className={`${style.input} ${errors.lastName && touched.lastName ? style.inputError : ''}`}
                    />
                  </div>
                  <ErrorMessage name="lastName" component="div" className={style.errorMessage} />
                </div>
              </div>

              {/* Email Input */}
              <div className={style.inputGroup}>
                <div className={style.inputWrapper}>
                  <div className={style.inputIcon}>
                    <RiMailLine />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`${style.input} ${errors.email && touched.email ? style.inputError : ''}`}
                  />
                </div>
                <ErrorMessage name="email" component="div" className={style.errorMessage} />
              </div>

              {/* Phone Input */}
              <div className={style.inputGroup}>
                <div className={style.inputWrapper}>
                  <div className={style.inputIcon}>
                    <RiPhoneLine />
                  </div>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    className={`${style.input} ${errors.phone && touched.phone ? style.inputError : ''}`}
                  />
                </div>
                <ErrorMessage name="phone" component="div" className={style.errorMessage} />
              </div>

              {/* Password Input */}
              <div className={style.inputGroup}>
                <div className={style.inputWrapper}>
                  <div className={style.inputIcon}>
                    <RiLockLine />
                  </div>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create password"
                    className={`${style.input} ${errors.password && touched.password ? style.inputError : ''}`}
                  />
                  <button
                    type="button"
                    className={style.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className={style.errorMessage} />
              </div>

              {/* Confirm Password Input */}
              <div className={style.inputGroup}>
                <div className={style.inputWrapper}>
                  <div className={style.inputIcon}>
                    <RiLockLine />
                  </div>
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className={`${style.input} ${errors.confirmPassword && touched.confirmPassword ? style.inputError : ''}`}
                  />
                  <button
                    type="button"
                    className={style.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className={style.errorMessage} />
              </div>

              {/* Terms */}
              <div className={style.termsCheckbox}>
                <Field
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <label htmlFor="terms">
                  I agree to the <Link to="/terms" className={style.termsLink}>Terms of Service</Link> and{' '}
                  <Link to="/privacy" className={style.termsLink}>Privacy Policy</Link>
                </label>
                <ErrorMessage name="terms" component="div" className={style.errorMessage} />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={style.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

              {/* Divider */}
              <div className={style.divider}>
                <span>or</span>
              </div>

              {/* Social Register */}
              <button type="button" className={style.socialButton}>
                Continue with Google
              </button>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <div className={style.loginSection}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={style.loginLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
