import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiUserHeartLine, RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine } from 'react-icons/ri';
import style from './LoginPage.module.css';
import Header from '../../components/Header/Header';

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Login attempt:', values);
    // Burada login işlemi yapılacak
    setSubmitting(false);
  };

  return (
    <div className={style.loginPage}>
        <Header />
      <div className={style.loginContainer}>
      <div className={style.loginCard}>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={style.loginForm}>
              <h2 className={style.formTitle}>Sign In</h2>
              <p className={style.formSubtitle}>Welcome back! Please sign in to your account</p>

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

              {/* Password Input */}
              <div className={style.inputGroup}>
                <div className={style.inputWrapper}>
                  <div className={style.inputIcon}>
                    <RiLockLine />
                  </div>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className={style.formOptions}>
                <label className={style.rememberMe}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className={style.forgotPassword}>
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={style.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className={style.divider}>
                <span>or</span>
              </div>

              {/* Social Login */}
              <button type="button" className={style.socialButton}>
                Continue with Google
              </button>
            </Form>
          )}
        </Formik>

        {/* Register Link */}
        <div className={style.registerSection}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className={style.registerLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
