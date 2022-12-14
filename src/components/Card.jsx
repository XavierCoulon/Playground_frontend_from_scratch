import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

function Card({ book }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    () => axios.delete(`http://localhost:5000/api/v1/book/${book.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["books"]);
      },
    }
  );

  return (
    <div className="flex flex-col w-80 rounded overflow-hidden shadow-lg">
      <img className="" src={book.picture} alt={book.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {book.author.name}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {book.category.name}
        </span>
        <span
          onClick={() => mutate()}
          className="cursor-pointer inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          🗑️
        </span>
      </div>
    </div>
  );
}

export default Card;
