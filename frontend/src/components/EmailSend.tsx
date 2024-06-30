import React, { useState } from "react";
import { SendEmail } from "../services/quoteServices";

const EmailSend: React.FC<{ body: string }> = ({ body }) => {
  const [message, setMessage] = useState<string>();

  const fetchSendEmail = async () => {
    try {
      const response = await SendEmail(body);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message)
    }
    //TODO: update list qoutes
    //TODO: add zustand 
  };

  return (
    <>
      <button onClick={fetchSendEmail}>Send</button>
      <span>{message}</span>
    </>
  );
};

export default EmailSend;
