import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import FAQItem from "@/components/faq/FAQItem";

const faqs = [
  {
    question: "How can EloStack help my company?",
    answer:
      "Simply make a request for an interview for a candidate, and we will take care of doing a technical interview for the candidate, saving your engineers time and energy. These interviews will then be accessible for viewing along with a breakdown and feedback for a fee of $50/interivew.",
  },

  {
    question: "What is EloStack exactly?",
    answer:
      "EloStack is first-and-foremost a job listing website dedicated to software engineers. All candidates on our site are pre-vetted using technical interviews, which are accessible to companies looking for engineers.",
  },
  {
    question: "What if I am unsatisfied with the interview?",
    answer: "We provide a money-back gurantee to all businesses if you are truly unsatisfied with the overall outcome.",
  },
  {
    question: "How much do you charge?",
    answer:
      "New businesses get access to the first two interviews for free. Each successive interview will incur $50. We provide a money-back gurantee if you are unsatisfied with the interviews.",
  },
  {
    question: "Can I make a specific requests for my interviews?",
    answer: "Yes. When creating an interview request, you will be able to make specify criterias to include.",
  },
];

const Page = () => {
  return (
    <main>
      <NavBar />
      <div className="w-full px-4 py-12 mt-[1rem] mx-auto max-w-7xl">
        <h2 className="mb-8 text-5xl font-extrabold text-center text-blueprimary" data-aos="zoom-in">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-[9rem]">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
