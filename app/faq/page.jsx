import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import FAQItem from "@/components/faq/FAQItem";

const faqs = [
  {
    question: "How does EloStack simplify the hiring process?",
    answer:
      "EloStack conducts and manages technical interviews, allowing companies to browse through a pool of pre-evaluated candidates and select those who meet their specific requirements. This makes the hiring process more efficient and cost-effective.",
  },
  {
    question: "What makes EloStack different from other job platforms?",
    answer:
      "Unlike traditional job platforms, EloStack focuses specifically on software engineering jobs and addresses the inefficiencies in the hiring process by managing the technical interviews ourselves.",
  },
  {
    question: "How can candidates prepare for technical interviews on EloStack?",
    answer:
      "Candidates can prepare for technical interviews on EloStack by practicing coding problems, reviewing computer science fundamentals, and familiarizing themselves with common interview questions in software engineering.",
  },
  {
    question: "What types of companies use EloStack for hiring?",
    answer:
      "A wide range of companies, from startups to large enterprises, use EloStack to streamline their hiring process for software engineering roles. Our platform caters to industries across the technology sector.",
  },
  {
    question: "How does EloStack simplify the hiring process?",
    answer:
      "EloStack conducts and manages technical interviews, allowing companies to browse through a pool of pre-evaluated candidates and select those who meet their specific requirements. This makes the hiring process more efficient and cost-effective.",
  },
  {
    question: "What makes EloStack different from other job platforms?",
    answer:
      "Unlike traditional job platforms, EloStack focuses specifically on software engineering jobs and addresses the inefficiencies in the hiring process by managing the technical interviews ourselves.",
  },
  {
    question: "How can candidates prepare for technical interviews on EloStack?",
    answer:
      "Candidates can prepare for technical interviews on EloStack by practicing coding problems, reviewing computer science fundamentals, and familiarizing themselves with common interview questions in software engineering.",
  },
  {
    question: "What types of companies use EloStack for hiring?",
    answer:
      "A wide range of companies, from startups to large enterprises, use EloStack to streamline their hiring process for software engineering roles. Our platform caters to industries across the technology sector.",
  },
  // Add more FAQs as needed
];

const Page = () => {
  return (
    <main>
      <NavBar />
      <div className="w-full px-4 py-12 mt-[1rem] mx-auto max-w-7xl">
        <h2 className="mb-8 text-5xl font-extrabold text-center text-blueprimary">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-[9rem]">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
