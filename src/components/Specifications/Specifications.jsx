/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Specifications = ({ specifications }) => {
  console.log(specifications);
  const routeMap = {
    Author: "book/author",
    // Category: "books-in-category",
    // Publisher: "books-by-publisher",
  };

  return (
    <div className=" w-auto text-gray-700 mb-5 px-3 md:px-0">
      <div className="specifications-table w-full ">
        {specifications && specifications.length > 0 ? (
          <table className="table-auto w-full border">
            <thead className="bg-zinc-700 text-white sm:text-xl">
              <tr className="">
                <th className="text-left p-2 sm:w-[25%]">Specification</th>
                <th className="text-left p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((spec, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"} // Even: white, Odd: gray
                >
                  <td className="p-2 text-gray-700 border-r font-semibold ">
                    {spec.name}
                  </td>
                  <td className="p-2">
                    {routeMap[spec.name] ? (
                      <p>{spec.description}</p>
                    ) : (
                      spec.description
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No specifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Specifications;
