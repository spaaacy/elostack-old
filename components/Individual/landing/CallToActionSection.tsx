const CallToActionSection = () => {
    return (
      <div className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Hiring Process?</h2>
          <p className="mb-8">Join EloStack today and streamline your technical hiring with our transparent, efficient system.</p>
          <div className="flex justify-center gap-4">
            <a href="/sign-up" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              Sign Up
            </a>
            <a href="/post-job" className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 py-2 px-4 rounded-lg">
              Post a Job
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default CallToActionSection;
  