import EmailSend from "./EmailSend";

const EmailList = () => {

  const emails = [
    "Hi, my name is John Doe, my email is cristhiantombe@gmail.com, My phone number is +573015567050 and I need a quote for 50 pieces aluminum sheets and I need a quote for 100 pieces copper rods. Please ensure delivery by the end of the month to New York.",
    "test test test test",
  ];

  return (
    <>
      <h1>Send Email</h1>
      {emails.map((item,i) => (
        <div key={i}>
            <div>{item}</div>
            <div>
                <EmailSend body={item} />
            </div>
        </div>
      ))}
    </>
  );
};

export default EmailList;
