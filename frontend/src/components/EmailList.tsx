import EmailSend from "./EmailSend";

const EmailList = () => {

  const emails = [
    "Hi, my name is Cristhian Tombe, my email is cristhiantombe@gmail.com, My phone number is +573015567050 and I need a quote for 50 pieces aluminum sheets and I need a quote for 100 pieces copper rods. Please ensure delivery by the end of the month to New York.",
    "test test test test",
  ];

  return (
    <>
      <h1  className="text-3xl font-bold mb-4">Send Email</h1>
      {emails.map((item: string,index: number) => (
        <div key={index} className="p-4 mb-4 border rounded-lg shadow-md">
            <div className="text-gray-700">Email Text: {item}</div>
            <div>
                <EmailSend body={item} />
            </div>
        </div>
      ))}
    </>
  );
};

export default EmailList;
