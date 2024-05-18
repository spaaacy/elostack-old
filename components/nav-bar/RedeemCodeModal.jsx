import { useState } from "react";

const RedeemCodeModal = ({ setIsOpen, session, successCallback }) => {
  const [codeField, setCodeField] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/referral/redeem", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
      body: JSON.stringify({ referralCode: codeField, userId: session.data.session.user.id }),
    });
    if (response.status === 200) {
      successCallback();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative bg-gray-800 flex flex-col justify-center w-full max-w-md mx-auto rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-purple-400">Your Referral Code</h2>
        <input
          value={codeField}
          onChange={(e) => setCodeField(e.target.value)}
          className="w-32 text-center text-white mb-6 mx-auto bg-gray-700 px-4 py-2 rounded-lg text-2xl border-dashed border-2 font-bold font-mono border-purple-500"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
            type="submit"
          >
            Redeem
          </button>
        </div>
      </form>
    </div>
  );
};

export default RedeemCodeModal;
