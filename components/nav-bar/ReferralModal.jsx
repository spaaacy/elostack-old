const ReferralModal = ({ setIsOpen, referralCode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-gray-800 flex flex-col justify-center w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-400">Your Referral Code</h2>
        <p className="text-sm text-gray-300">
          Share this code to receive a free week of Superuser for yourself and your friend!
        </p>
        <p className="text-white mb-6 mx-auto bg-gray-700 px-4 py-2 rounded-lg text-2xl border-dashed border-2 font-bold font-mono border-purple-500">
          {referralCode}
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
