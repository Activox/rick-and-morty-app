/* eslint-disable @next/next/no-img-element */
import { gql, useQuery } from "@apollo/client";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomReviews = () => getRandomNumber(5, 100);
const getRandomStars = () => Math.random() + getRandomNumber(3, 4);

const GET_CHARATERS = gql`
  query getCharacters {
    characters(page: 1) {
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
  const { data, error, loading: isLoading } = useQuery(GET_CHARATERS);

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

    return (
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
              <div className="flex justify-between item-center">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-gray-600 font-bold text-sm ml-1">
                    {getRandomStars().toFixed(2)}
                    <span className="text-gray-500 font-normal">
                      {" "}
                      ({getRandomReviews()} reviews)
                    </span>
                  </p>
                </div>
                
              </div>
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
    );
  }

  return isLoading ? (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-gray-50 items-center justify-between hover:border-transparent bg-cyan-300">
      <p className="items-center text-white md:block font-bold ">...Loading</p>
    </div>
  ) : (
    getRenderCharacters()
  );
}
