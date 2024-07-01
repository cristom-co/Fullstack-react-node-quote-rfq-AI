import { useEffect } from "react";
import { getQuotes } from "../services/quoteServices";
import QouteSend from "./QuoteSend";
import useRootStore from "../store/store";

const QuoteList = () => {
  const { listQuotes, updateListQuoutes } = useRootStore();

  const fetchQuotes = async () => {
    try {
      const quotes = await getQuotes();
      updateListQuoutes(quotes.data.qoutes);
    } catch (error) {
      //set error
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Quotes List</h1>
      <div>
        {listQuotes.length > 0 ? (
          <>
            {listQuotes
              .map((quote, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 border rounded-lg shadow-md"
                >
                  <div className="text-xl font-semibold mb-2">
                    Quote #{index + 1}
                  </div>
                  <div className="text-gray-700">Client: {quote.client}</div>
                  <div className="text-gray-700">Email: {quote.email}</div>
                  <div className="text-gray-700">
                    Phone: {quote.phoneNumber}
                  </div>
                  <div className="text-gray-700">Total: {quote.total}</div>
                  <div className="mt-4">
                    <QouteSend quote={quote} />
                  </div>
                </div>
              ))}
          </>
        ) : (
          <div className="text-gray-500">No quotes found</div>
        )}
      </div>
    </>
  );
};

export default QuoteList;
