const BenefitItem = ({ title, description }: { title: string; description: string }) => {
    return (
      <div className="flex flex-col items-center text-center mb-8">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p>{description}</p>
      </div>
    );
  };
  
  const BenefitsSection = () => {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Key Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitItem
              title="Efficient Hiring Process"
              description="EloStack's streamlined process saves companies and candidates countless hours by eliminating the need for multiple, redundant interviews."
            />
            <BenefitItem
              title="Cost-Effective"
              description="Reduce hiring costs with our transparent system, connecting you directly with pre-evaluated candidates suited to your needs."
            />
            <BenefitItem
              title="Transparent Evaluations"
              description="Our comprehensive technical interviews ensure candidates are scored fairly, making the hiring process transparent and merit-based."
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default BenefitsSection;
  