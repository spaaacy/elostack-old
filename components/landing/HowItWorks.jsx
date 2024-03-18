"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FaUserCircle, FaMicrophone, FaBriefcase } from 'react-icons/fa';

const HowItWorks = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const steps = [
        {
            title: 'Create Your Profile',
            description: 'Sign up and tell us about your skills and preferences. This is your first step towards your dream job.',
            aos: 'fade-right',
            icon: <FaUserCircle className="text-4xl text-purple-500" />,
            image: '/profileEX.png', // Add your placeholder image path here
        },
        {
            title: 'Interview with Us',
            description: 'Request and complete a technical interview. Our experts will assess your skills in a fair and unbiased manner.',
            aos: 'fade-left',
            delay: 100,
            icon: <FaMicrophone className="text-4xl text-blue-500" />,
            image: '/profileEX.png', // Add your placeholder image path here
        },
        {
            title: 'Get Matched & Apply',
            description: 'We showcase your profile to potential employers. Apply to jobs on our platform and get recommendations based on your skills and preferences.',
            aos: 'fade-right',
            delay: 200,
            icon: <FaBriefcase className="text-4xl text-red-500" />,
            image: '/profileEX.png', // Add your placeholder image path here
        },
    ];

    const getAOSDirection = (index) => {
      return index % 2 === 0 ? 'fade-right' : 'fade-left';
  };


  return (
    <section className="text-white body-font bg-[#0f0f1c] w-screen ">
        <div className="container mx-auto">
            <div className="text-center mb-32">
                
            </div>
            <div className="flex flex-wrap">
                {steps.map((step, index) => (
                    <div className="w-full mb-8 flex flex-col md:flex-row md:justify-center items-center md:items-stretch text-center md:text-left" key={index} data-aos={getAOSDirection(index)} data-aos-delay="200">
                        <img src={step.image} alt={step.title} className={`w-full md:w-1/2 object-cover ${index % 2 === 0 ? '' : 'md:order-2'}`} style={{ minHeight: '50vh' }} />
                        <div className={`w-full md:w-1/2 p-8 flex flex-col justify-center items-center md:items-start ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`} style={{ minHeight: '50vh' }}>
                            <div className="flex items-center space-x-3 mb-4">
                                {step.icon}
                                <h2 className="text-3xl font-semibold text-white">{step.title}</h2>
                            </div>
                            <p className="text-xl leading-relaxed text-gray-300">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

};

export default HowItWorks;
