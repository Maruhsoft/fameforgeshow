import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing and using Fame Forge, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
          <p className="text-gray-300 mb-4">
            As a user of Fame Forge, you agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not interfere with the proper functioning of the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="text-gray-300">
            All content, features, and functionality of Fame Forge, including but not limited to text, graphics, logos, and video content, are owned by Fame Forge and are protected by international copyright, trademark, and other intellectual property rights laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-300">
            Fame Forge shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
          <p className="text-gray-300">
            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this site.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Terms;