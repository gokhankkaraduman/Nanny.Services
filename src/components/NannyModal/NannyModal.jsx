import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { IoLocationOutline, IoCallOutline, IoPersonOutline, IoCalendarOutline, IoTimeOutline, IoMailOutline, IoChatbubbleOutline, IoSendOutline, IoCalendarClearOutline } from 'react-icons/io5'
import style from './NannyModal.module.css'

const appointmentSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone is required'),
  childAge: Yup.number().min(0, 'Age must be positive').required('Child age is required'),
  childName: Yup.string().required('Child name is required'),
  date: Yup.mixed().required('Date is required'),
  time: Yup.string().required('Time is required'),
  fatherName: Yup.string().required('Father name is required'),
  motherName: Yup.string().required('Mother name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  emergencyContact: Yup.string().required('Emergency contact is required'),
  comment: Yup.string()
})

export default function NannyModal({ nanny, onClose }) {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values)
    // Form gönderildikten sonra modal'ı kapat
    if (onClose) onClose()
  }

  return (
    <div className={style.modalContainer}>
        {/* Close Button */}
        <button className={style.modalCloseButton} onClick={onClose}>×</button>
        
        {/* Modal Header */}
        <div className={style.modalHeader}>
            <h2 className={style.modalTitle}>
                <IoCalendarClearOutline className={style.titleIcon} />
                Make an appointment with a babysitter
            </h2>
            <p className={style.modalDescription}>
                Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.
            </p>
        </div>

        {/* Nanny Info */}
        <div className={style.nannyInfo}>
            <img 
                src={nanny?.avatar_url} 
                alt={nanny?.name} 
                className={style.nannyAvatar}
            />
            <div className={style.nannyDetails}>
                <p>Your nanny</p>
                <h3>{nanny?.name || 'Nanny Name'}</h3>
            </div>
        </div>

        {/* Form Container */}
        <div className={style.formContainer}>
            <Formik
                              initialValues={{
                address: '',
                phone: '',
                childAge: '',
                childName: '',
                date: null,
                time: '',
                fatherName: '',
                motherName: '',
                email: '',
                emergencyContact: '',
                comment: ''
              }}
              validationSchema={appointmentSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Address, Phone, Child Age, Child Name */}
                  <div className={`${style.formRow} ${style.quad}`}>
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoLocationOutline className={style.inputIcon} />
                        <Field 
                          type="text" 
                          name="address" 
                          placeholder="Address" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="address" component="span" className={style.errorMessage} />
                    </div>
                    
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoCallOutline className={style.inputIcon} />
                        <Field 
                          type="tel" 
                          name="phone" 
                          placeholder="Phone" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="phone" component="span" className={style.errorMessage} />
                    </div>

                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoPersonOutline className={style.inputIcon} />
                        <Field 
                          type="number" 
                          name="childAge" 
                          placeholder="Child Age" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="childAge" component="span" className={style.errorMessage} />
                    </div>

                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoPersonOutline className={style.inputIcon} />
                        <Field 
                          type="text" 
                          name="childName" 
                          placeholder="Child Name" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="childName" component="span" className={style.errorMessage} />
                    </div>
                  </div>
                  
                  {/* Date, Time, Father Name, Mother Name */}
                  <div className={`${style.formRow} ${style.quad}`}>
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoCalendarOutline className={style.inputIcon} />
                        <Field name="date">
                          {({ field, form, meta }) => (
                            <>
                              <DatePicker
                                selected={field.value ? new Date(field.value) : null}
                                onChange={(date) => form.setFieldValue(field.name, date)}
                                placeholderText="Select Date"
                                className={style.formField}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                wrapperClassName={style.datePickerWrapper}
                              />
                              {meta.touched && meta.error && (
                                <span className={style.errorMessage}>{meta.error}</span>
                              )}
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                    
                                         <div className={style.formGroup}>
                       <div className={style.inputWrapper}>
                         <IoTimeOutline className={style.inputIcon} />
                         <Field name="time">
                           {({ field, form, meta }) => (
                             <>
                               <DatePicker
                                 selected={field.value ? (() => {
                                   try {
                                     return new Date(`1970-01-01T${field.value}:00`);
                                   } catch {
                                     return null;
                                   }
                                 })() : null}
                                 onChange={(time) => {
                                   if (time) {
                                     const hours = time.getHours().toString().padStart(2, '0');
                                     const minutes = time.getMinutes().toString().padStart(2, '0');
                                     const timeString = `${hours}:${minutes}`;
                                     form.setFieldValue(field.name, timeString);
                                   } else {
                                     form.setFieldValue(field.name, '');
                                   }
                                 }}
                                 showTimeSelect
                                 showTimeSelectOnly
                                 timeIntervals={1}
                                 timeCaption="Time"
                                 dateFormat="HH:mm"
                                 placeholderText="Select Time"
                                 className={style.formField}
                                 wrapperClassName={style.datePickerWrapper}
                                 popperClassName={style.timePickerPopper}
                               />
                               {meta.touched && meta.error && (
                                 <span className={style.errorMessage}>{meta.error}</span>
                               )}
                             </>
                           )}
                         </Field>
                       </div>
                     </div>

                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoPersonOutline className={style.inputIcon} />
                        <Field 
                          type="text" 
                          name="fatherName" 
                          placeholder="Father's Name" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="fatherName" component="span" className={style.errorMessage} />
                    </div>
                    
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoPersonOutline className={style.inputIcon} />
                        <Field 
                          type="text" 
                          name="motherName" 
                          placeholder="Mother's Name" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="motherName" component="span" className={style.errorMessage} />
                    </div>
                  </div>
                  
                  {/* Email and Emergency Contact */}
                  <div className={`${style.formRow} ${style.double}`}>
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoMailOutline className={style.inputIcon} />
                        <Field 
                          type="email" 
                          name="email" 
                          placeholder="Email Address" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="email" component="span" className={style.errorMessage} />
                    </div>
                    
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoCallOutline className={style.inputIcon} />
                        <Field 
                          type="tel" 
                          name="emergencyContact" 
                          placeholder="Emergency Contact" 
                          className={style.formField}
                        />
                      </div>
                      <ErrorMessage name="emergencyContact" component="span" className={style.errorMessage} />
                    </div>
                  </div>
                  
                  {/* Comment */}
                  <div className={`${style.formRow} ${style.single}`}>
                    <div className={style.formGroup}>
                      <div className={style.inputWrapper}>
                        <IoChatbubbleOutline className={style.inputIcon} />
                        <Field 
                          as="textarea" 
                          name="comment" 
                          placeholder="Additional Comments (optional)" 
                          rows="3"
                          className={`${style.formField} ${style.textareaField}`}
                        />
                      </div>
                      <ErrorMessage name="comment" component="span" className={style.errorMessage} />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className={style.submitButtonWrapper}>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={style.submitButton}
                    >
                      <IoSendOutline className={style.buttonIcon} />
                      {isSubmitting ? 'Sending...' : 'Make Appointment'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
        </div>
    </div>
  )
}
