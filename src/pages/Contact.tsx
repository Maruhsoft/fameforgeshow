import React from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, XCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('sending');

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      setFormStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-400">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-6 text-gray-300">
            <p>
              Whether you're a fan, aspiring contestant, or business partner, we're here to help.
              Fill out the form and we'll get back to you as soon as possible.
            </p>
            <div>
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p>123 Entertainment Ave</p>
              <p>Los Angeles, CA 90028</p>
            </div>
          </div>
        </div>

        <div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
                formStatus === 'sending'
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {formStatus === 'sending' ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-green-400"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Message sent successfully!</span>
              </motion.div>
            )}

            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-400"
              >
                <XCircle className="h-5 w-5" />
                <span>Error sending message. Please try again.</span>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;