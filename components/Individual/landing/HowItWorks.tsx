const HowItWorksSection = () => {
    return (
      <div className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Companies */}
            <div>
              <h3 className="text-xl font-semibold mb-4">For Companies</h3>
              <ol className="list-decimal list-inside">
                <li className="mb-4">Post your job openings on EloStack and specify your requirements.</li>
                <li className="mb-4">Browse through our pool of pre-evaluated candidates.</li>
                <li>Select the candidates who meet your criteria and connect with them directly.</li>
              </ol>
            </div>
            {/* For Candidates */}
            <div>
              <h3 className="text-xl font-semibold mb-4">For Candidates</h3>
              <ol className="list-decimal list-inside">
                <li className="mb-4">Sign up and complete your technical interviews with EloStack.</li>
                <li className="mb-4">Receive your scores and become part of our candidate pool.</li>
                <li>Get discovered by top companies looking for your skills.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HowItWorksSection;
  