"use client";
import React from "react";
import Head from "next/head";

interface FeedbackDetail {
  area: string;
  score: number;
  comments: string;
}

interface InterviewFeedback {
  candidateName: string;
  jobTitle: string;
  overallScore: number;
  feedbackDetails: FeedbackDetail[];
}

const FeedbackPage: React.FC = () => {
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
        },
        {
          area: "Coding",
          score: 90,
          comments:
            "Strong coding skills, with minor areas for improvement in optimization.",
        },
        {
          area: "Communication",
          score: 88,
          comments:
            "Very clear communicator, though sometimes overlooks technical details.",
        },
        {
          area: "Problem-solving",
          score: 94,
          comments: "Outstanding problem-solving abilities.",
        },
      ],
    },

    // Additional feedback entries can be added here
  ];

  return (
    <>
      <Head>
        <title>Feedback | EloStack</title>
      </Head>
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen pt-10 pb-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-12 text-white">
            Interview Feedback
          </h1>
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl overflow-hidden mb-10"
            >
              <div className="p-6">
                <h2 className="text-3xl font-semibold mb-3">
                  {feedback.candidateName} - {feedback.jobTitle}
                </h2>
                <p className="text-xl text-blue-700 mb-5">
                  Overall Score: {feedback.overallScore}%
                </p>
                {/* Feedback Details Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                          Area
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                          Score
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                          Comments
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {feedback.feedbackDetails.map((detail, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-4 px-6">{detail.area}</td>
                          <td className="py-4 px-6">{detail.score}%</td>
                          <td className="py-4 px-6 italic">
                            {detail.comments}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Video Playback Section */}
                <div className="px-6 pb-6 mt-10">
                  <video controls className="custom-video-size">
                    <source src={feedback.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
