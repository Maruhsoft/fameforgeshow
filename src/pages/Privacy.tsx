import React from 'react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-300 mb-4">
            We collect information that you provide directly to us, including when you:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Create an account</li>
            <li>Participate in contests or promotions</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us for support</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Send you updates and marketing communications</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns and improve our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-gray-300">
            We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as these parties agree to keep this information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <p className="text-gray-300">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about our Privacy Policy, please contact us through our Contact page.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Privacy;