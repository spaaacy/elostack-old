interface TestimonialProps {
  quote: string;
  author: string;
  position?: string;
}

const Testimonial = ({ quote, author, position }: TestimonialProps) => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow">
      <p className="text-center text-lg italic">"{quote}"</p>
      <p className="text-center font-semibold mt-4">{author}</p>
      {position && <p className="text-center text-sm">{position}</p>}
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <div className="py-12 bg-white text-white">
      <div className="max-w-6xl mx-auto px-4 text-black">
        <h2 className="text-3xl font-bold text-center mb-10">
          What People Are Saying
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial
            quote="EloStack made our hiring process incredibly efficient. We found top-notch developers in days, not weeks."
            author="Jane Doe"
            position="CTO, Tech Innovations"
          />
          <Testimonial
            quote="Thanks to EloStack, I landed a job that was a perfect fit for my skills, without the endless interviews."
            author="John Smith"
            position="Senior Software Engineer"
          />
          <Testimonial
            quote="EloStack's transparent evaluation process gave us confidence in our hiring decisions. Truly a game-changer."
            author="Emily Chen"
            position="HR Manager, Startup XYZ"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
