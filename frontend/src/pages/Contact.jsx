import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, User, Send, Shield, Star, Heart, Calendar, Stethoscope } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <MessageCircle className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Get in Touch with Our Healthcare Team
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Have questions about appointments, need assistance, or want to provide feedback? 
              Our dedicated support team is here to help you 24/7.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
                    <p className="text-gray-600">Call our dedicated support line</p>
                    <p className="text-blue-600 font-medium mt-1">1-800-DOCTOR (1-800-362-867)</p>
                    <p className="text-sm text-gray-500">Available 24/7 for urgent matters</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
                    <p className="text-gray-600">Send us your questions or feedback</p>
                    <p className="text-blue-600 font-medium mt-1">support@healthcare.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Office Location</h3>
                    <p className="text-gray-600">Visit our headquarters</p>
                    <p className="text-gray-900 font-medium mt-1">123 Wellness Avenue, Suite 500</p>
                    <p className="text-gray-900">San Francisco, CA 94107</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">When our team is available in-office</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-900">Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p className="text-gray-900">Saturday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-900">Sunday: 10:00 AM - 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Reach Out?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Heart className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Book or reschedule appointments</span>
                </li>
                <li className="flex items-start">
                  <Stethoscope className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Find the right specialist for your needs</span>
                </li>
                <li className="flex items-start">
                  <Calendar className="w-5 h-5 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Get help with insurance and billing</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Share feedback to improve our services</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="firstName"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="lastName"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="appointment">Appointment Booking</option>
                  <option value="doctor">Finding a Doctor</option>
                  <option value="billing">Billing & Insurance</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we assist you today? Please include any relevant details about your appointment or health concerns."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  id="consent"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  I consent to receive communications from Healthcare Platform regarding my inquiry
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                <Shield className="w-4 h-4 inline mr-1" />
                Your information is secure and confidential. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
              <AlertTriangleIcon />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900">Medical Emergency?</h3>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">Call 911 immediately</span> for life-threatening conditions. 
                This contact form is for non-emergency inquiries only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom AlertTriangle icon component since we're using Lucide React
const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" x2="12" y1="9" y2="13"></line>
    <line x1="12" x2="12.01" y1="17" y2="17"></line>
  </svg>
);

export default Contact;
