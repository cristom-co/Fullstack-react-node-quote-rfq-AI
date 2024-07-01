import { useState } from "react";
import { IQuotes } from "../types/mainTypes";

const QouteSend: React.FC<{ quote: IQuotes }> = ({ quote }) => {
  const [isOpen, setIsOpen] = useState(false);

  const products = JSON.parse(quote.products);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Details
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-8 rounded-lg md:w-1/2 md:h-2/3 sm:w-11/12 sm:h-2/3 overflow-y-auto">
            <div className="flex border-b-2 mb-4 p-2 ">
              <h2 className="grow text-gray-500">Email</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 grow-0"
              >
                x
              </button>
            </div>
            <div>
              <ul>
                <li>
                  <span className="font-semibold">Client:</span> {quote.client}
                </li>
                <li>
                  <span className="font-semibold">Email:</span> {quote.email}
                </li>
                <li>
                  <span className="font-semibold">Phone:</span>{" "}
                  {quote.phoneNumber}
                </li>
                <li>
                  <span className="font-semibold">Location:</span>{" "}
                  {quote.deliveryLocation}
                </li>
                <li>
                  <span className="font-semibold">Date:</span>{" "}
                  {quote.deliveryDate}
                </li>
              </ul>
            </div>
            <table className="min-w-full bg-white border border-gray-200 my-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Item{" "}
                  </th>
                  <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Unit
                  </th>
                  <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.item}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.unit}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.price}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ml-2">
              <span className="font-bold mr-2">Total:</span>
              <span className="font-bold">{quote.total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QouteSend;
