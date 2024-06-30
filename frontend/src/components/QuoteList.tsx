import { useState, useEffect } from "react";
import { getQuotes } from "../services/quoteServices";
import { IQuotes } from "../types/mainTypes";
import QouteSend from "./QuoteSend";

const QuoteList = () => {
  const [quotes, setQuotes] = useState<IQuotes[]>([]);

  const fetchQuotes = async () => {
    try {
      const quotes = await getQuotes();
      setQuotes(quotes.data.qoutes);
    } catch (error) {
      //set error
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <h1>Quotes List</h1>
      <div>
        {quotes.length > 0 ? (
          <>
            {quotes.map((quote, index) => (
              <div key={index}>
                <div>Qoute #{index + 1}</div>
                <div>{quote.email}</div>
                <div>{quote.phoneNumber}</div>
                <div>{quote.deliveryDate}</div>
                <div>{quote.deliveryLocation}</div>
                <div>
                  <QouteSend />
                </div>
              </div>
            ))}
          </>
        ) : (
          "No quotes found"
        )}
      </div>
    </>
  );
};

export default QuoteList;
