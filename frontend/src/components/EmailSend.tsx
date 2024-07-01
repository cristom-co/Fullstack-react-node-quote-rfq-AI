import React, { useState } from "react";
import { SendEmail, getQuotes } from "../services/quoteServices";
import useRootStore from "../store/store";

const EmailSend: React.FC<{ body: string }> = ({ body }) => {
  const [message, setMessage] = useState<{ message: string, color: string}>();

  const { updateListQuoutes } = useRootStore();

  const fetchSendEmail = async () => {
    SendEmail(body)
      .then(async (res) => {
        setMessage({message: res.data.message, color: "green"});

        const qoutes = await getQuotes();
        updateListQuoutes(qoutes.data.qoutes);
      })
      .catch((error) => {
        setMessage({message: error.response.data.message, color: "red"});
      });
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={fetchSendEmail}
      >
        Send
      </button>
      <span className={`ml-5 text-${message?.color}-500`}>{message?.message}</span>
    </>
  );
};

export default EmailSend;
