import React from "react";
import Group from "./imgs/group.jpg";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-red-300 to-red-100 py-16"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4">
        <div className="flex justify-center">
          <Image
            alt="Our Team"
            className="rounded-lg shadow-lg object-cover w-full h-96 lg:h-auto"
            src={Group}
          />
        </div>

        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 mb-4">
            We are a group of Grade 12 students who created this web application
            to help fellow students store their personal data safely. Our goal
            is to provide a reliable platform for students to securely share
            their files and access important information anytime, anywhere.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            With our application, you can upload your files, keep them organized
            in the cloud, and share them effortlessly with your peers. We
            believe in making data management easier and more secure for
            everyone.
          </p>
          <p className="text-lg text-gray-600">
            Join us as we work towards creating a seamless, secure, and
            user-friendly experience for all students!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
