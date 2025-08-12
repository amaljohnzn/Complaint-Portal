import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const ContactAboutPage = () => {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Contact Us Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-12">Contact Us</h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Phone Card */}
          <a
            href="tel:+1234567890"
            className="flex items-center gap-4 bg-white rounded-lg shadow-md p-6 flex-1 hover:shadow-lg transition-shadow"
          >
            <FaPhoneAlt className="text-blue-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-blue-700 font-medium">+1 (234) 567-890</p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:contact@company.com"
            className="flex items-center gap-4 bg-white rounded-lg shadow-md p-6 flex-1 hover:shadow-lg transition-shadow"
          >
            <FaEnvelope className="text-blue-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-blue-700 font-medium">contact@company.com</p>
            </div>
          </a>

          {/* Location Card */}
          <a
            href="https://goo.gl/maps/your-location"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-lg shadow-md p-6 flex-1 hover:shadow-lg transition-shadow"
          >
            <FaMapMarkerAlt className="text-blue-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-blue-700 font-medium">
                1234 Business Rd, City, State, ZIP
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white py-8 shadow-inner">
        <div className="max-w-5xl mx-auto flex justify-center space-x-12">
          <a
            href="https://linkedin.com/company/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition-colors text-3xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors text-3xl"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors text-3xl"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 transition-colors text-3xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </section>

      {/* About Company Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-8 text-center">
          About Our Company
        </h2>

        <article className="max-w-3xl mx-auto space-y-8 text-center">
          <p className="text-lg leading-relaxed">
            Founded in 2010, our company has been dedicated to delivering
            outstanding complaint management solutions that empower businesses
            and customers alike. Our innovative approach and commitment to
            quality have made us a trusted leader in the industry.
          </p>

          <div className="bg-blue-100 border-l-8 border-blue-600 text-blue-800 px-6 py-4 rounded shadow-md max-w-xl mx-auto">
            <h3 className="font-semibold text-xl mb-2">Our Mission</h3>
            <p>
              To simplify complaint resolution by providing intuitive tools
              that promote transparency, efficiency, and customer satisfaction.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-xl mx-auto text-left">
            <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
              <h4 className="font-semibold mb-2">Integrity</h4>
              <p>We uphold honesty and strong moral principles in everything we do.</p>
            </div>
            <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
              <h4 className="font-semibold mb-2">Innovation</h4>
              <p>Constantly evolving with new ideas and technology to serve better.</p>
            </div>
            <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
              <h4 className="font-semibold mb-2">Customer Focus</h4>
              <p>Putting customers at the heart of every decision and feature.</p>
            </div>
          </div>

         

       
        </article>
      </section>

      {/* Location Display Section */}
      <section className="mt-16 p-6">
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.161999279246!2d76.08764721478174!3d11.819787591721097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5a3a0cc30f981%3A0x1a1df618d60a7f0b!2sMananthavady%2C%20Kerala%20695646!5e0!3m2!1sen!2sin!4v1688392345678!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="shadow-lg"
        ></iframe>
      </section>
    </main>
  );
};

export default ContactAboutPage;
