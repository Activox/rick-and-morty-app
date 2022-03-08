/* eslint-disable @next/next/no-img-element */
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_CHARATERS = gql`
  query getCharacters($page: Int, $name: String) {
    characters(page: $page, filter: {name: $name}) {
      info {
        pages
        next
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        location {
          name
        }
      }
    }
  }
`;

export default function HomeResults() {
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    loading: isLoading,
  } = useQuery(GET_CHARATERS, { variables: { page: page } });

  if (error)
    return (
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-gray-50 items-center justify-between hover:border-transparent bg-red-400">
        <p className="items-center text-white md:block font-bold ">
          Error Feching Data...
        </p>
      </div>
    );

  function getRenderCharacters() {
    const characters = data.characters;
    const totalOfPages = data.characters.info.pages;
    const totalOfCharacters = data.characters.info.count;

    const countFrom = characters.results[0].id;
    const countTo = characters.results[characters.results.length - 1].id;

    return (
      <div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 ">
            Showing{" "}
            <span className="font-semibold text-gray-900 ">
              {countFrom}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 ">
              {countTo}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 ">
              {totalOfCharacters}
            </span>{" "}
            Entries
          </span>

          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900"
              onClick={() => setPage(page === 1 ? 1 : page - 1)}
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900"
              onClick={() =>
                setPage(page <= totalOfPages ? page + 1 : totalOfPages)
              }
            >
              Next
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap mt-8 items-center justify-center place-content-center gap-8">
          {characters.results.map((character) => (
            <a
              key={character.id}
              className="relative hover:bg-blue-100 transition-colors flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-gray-50 bg-white hover:border-transparent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full md:w-1/3 grid place-items-center p-8">
                <img
                  width="240"
                  height="240"
                  src={character.image}
                  alt="tailwind logo"
                  className="rounded-3xl"
                />
              </div>
              <div className="w-full md:w-80 flex flex-col space-y-2 p-3">
                <h3 className="overflow-hidden overflow-ellipsis font-black text-gray-800  md:text-3xl text-xl">
                  {character.name}
                </h3>
                <ul className="list-disc md:text-lg text-gray-500 text-base">
                  <li>
                    Status: {character.status ? character.status : "unknown"}
                  </li>
                  <li>
                    Specie: {character.species ? character.species : "unknown"}
                  </li>
                  <li>Type: {character.type ? character.type : "unknown"}</li>
                  <li>
                    Gender: {character.gender ? character.gender : "unknown"}
                  </li>
                  <li>
                    Location:{" "}
                    {character.location.name
                      ? character.location.name
                      : "unknown"}
                  </li>
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    getRenderCharacters()
  );
}
