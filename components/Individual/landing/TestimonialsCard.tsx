"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";


// Define the Testimonial type
type Testimonial = {
  id: number;
  name: string;
  title: string;
  review: string;
  rating: number;
};

// Array of filler testimonials
const fillerTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO of ExampleCorp",
    review: "This product has revolutionized our workflow!",
    rating: 5,
  },
  {
    id: 2,
    name: "Alice Johnson",
    title: "Marketing Director",
    review: "Incredible results! Our team has never been more productive.",
    rating: 4,
  },
  {
    id: 3,
    name: "John Doe",
    title: "CEO of ExampleCorp",
    review: "This product has revolutionized our workflow!",
    rating: 5,
  },
  {
    id: 4,
    name: "Alice Johnson",
    title: "Marketing Director",
    review: "Incredible results! Our team has never been more productive.",
    rating: 4,
  },
  {
    id: 5,
    name: "John Doe",
    title: "CEO of ExampleCorp",
    review: "This product has revolutionized our workflow!",
    rating: 5,
  },
  {
    id: 6,
    name: "Alice Johnson",
    title: "Marketing Director",
    review: "Incredible results! Our team has never been more productive.",
    rating: 4,
  },
  // ... add more filler testimonials as needed
];

const TestimonialCard: React.FC = () => {
  const sliderRef = React.useRef<Slider | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: true,
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToNext = () => sliderRef.current?.slickNext();
  const goToPrevious = () => sliderRef.current?.slickPrev();

  // Define the renderStars function
  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={
            i < rating
              ? "fas fa-star text-yellow-500"
              : "far fa-star text-gray-300"
          }
        ></i>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="testimonial-slider-container" data-aos="zoom-in">
      <h2 className="text-center text-5xl mt-[5rem] mb-16 font-semibold">
        What our clients say
      </h2>
      <Slider ref={sliderRef} {...settings}>
        {fillerTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4">
            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-4">
              <div className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={`https://i.pravatar.cc/150?img=${testimonial.id}`}
                    alt={`${testimonial.name}'s profile`}
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 text-base">{testimonial.review}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button
        onClick={goToPrevious}
        aria-label="Previous"
        className="control-btn left-0"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={goToNext}
        aria-label="Next"
        className="control-btn right-0"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default TestimonialCard;
