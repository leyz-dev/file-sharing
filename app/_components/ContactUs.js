import React from "react";
import { Phone, Mail } from "lucide-react";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-red-100 to-white py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-center text-gray-600 mb-8">
          If you have any questions or need assistance, feel free to reach out
          to us!
        </p>

        {/* Contact Information */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center space-x-2">
            <Phone className="text-primary" size={24} />
            <span className="text-lg text-gray-700">+63 (916) 238-8411</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="text-primary" size={24} />
            <span className="text-lg text-gray-700">
              princesairen@gmail.com
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="border border-gray-300 p-2 w-full rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="border border-gray-300 p-2 w-full rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              className="border border-gray-300 p-2 w-full rounded-lg"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
