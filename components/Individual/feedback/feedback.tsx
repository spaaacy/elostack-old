"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";

// Define your interfaces for TypeScript
interface FeedbackDetail {
  area: string;
  score: number;
  comments: string;
  critiques: string[]; // Include critique points
}

interface InterviewFeedback {
  candidateName: string;
  jobTitle: string;
  overallScore: number;
  feedbackDetails: FeedbackDetail[];
  videoUrl: string; // Ensure you have a videoUrl property
}

// Your main React component
const FeedbackPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Mock feedback data
  const feedbackData: InterviewFeedback[] = [
    {
      candidateName: "Jordan Doe",
      jobTitle: "Software Engineer",
      overallScore: 92,
      feedbackDetails: [
        {
          area: "System Design",
          score: 95,
          comments: "Shows excellent understanding of system architecture.",
          critiques: [
            "Needs to consider scalability more deeply.",
            "Review newer database technologies.",
          ],
        },
        {
          area: "System Design",
          score: 95,
          comments: "Shows excellent understanding of system architecture.",
          critiques: [
            "Needs to consider scalability more deeply.",
            "Review newer database technologies.",
          ],
        },
        {
          area: "System Design",
          score: 95,
          comments: "Shows excellent understanding of system architecture.",
          critiques: [
            "Needs to consider scalability more deeply.",
            "Review newer database technologies.",
          ],
        },
        {
          area: "System Design",
          score: 95,
          comments: "Shows excellent understanding of system architecture.",
          critiques: [
            "Needs to consider scalability more deeply.",
            "Review newer database technologies.",
          ],
        },
        {
          area: "System Design",
          score: 95,
          comments: "Shows excellent understanding of system architecture.",
          critiques: [
            "Needs to consider scalability more deeply.",
            "Review newer database technologies.",
          ],
        },
        // Repeat the structure for additional feedback details as needed
      ],
      videoUrl: "path_to_video.mp4", // Example video URL
    },
    // Add more feedback entries if needed
  ];

  return (
    <>
      <Head>
        <title>Feedback | EloStack</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css"
        />
      </Head>
      <div className="min-h-screen bg-gray-100 pt-10 pb-20 px-4 md:px-0 animate-fadeIn bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <div className="max-w-7xl mx-auto">
          <h1
            data-aos="fade-down"
            className="text-5xl font-bold text-center mb-12 text-blueprimary"
          >
            Interview Feedback
          </h1>
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay="5"
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
            >
              <div className="p-6">
                <h2 className="text-3xl font-semibold mb-4">
                  {feedback.candidateName} - {feedback.jobTitle}
                </h2>
                <p className="text-xl font-semibold text-blueprimary mb-6">
                  Overall Score: {feedback.overallScore}%
                </p>
                <div className="flex justify-center">
                  <video
                    controls
                    className="max-w-full h-auto rounded-lg shadow-md"
                    style={{ maxWidth: "1250px", width: "100%" }}
                  >
                    <source src={feedback.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex justify-center">
                  <h2 className="text-4xl font-semibold mb-4 text-blueprimary mt-[2.5rem] text-center mr-[3rem]">
                    Score Card
                  </h2>
                </div>
                <div className="mb-8 mt-[2rem]">
                  {feedback.feedbackDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      data-aos="fade-up"
                      data-aos-delay={`${idx * 100}`}
                      className="bg-gray-50 hover:shadow-xl rounded-lg p-4 shadow-inner mb-4"
                    >
                      <h3 className="text-xl font-semibold">{detail.area}</h3>
                      <p className="text-md text-blueprimary font-semibold">
                        Score: {detail.score}%
                      </p>
                      <p className="italic">{detail.comments}</p>
                      <ul className="list-disc pl-5 mt-2">
                        {detail.critiques.map((critique, critiqueIndex) => (
                          <li key={critiqueIndex} className="text-sm">
                            {critique}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
