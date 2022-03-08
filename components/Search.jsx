import React, { useState, useRef, useMemo } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { gql, useLazyQuery } from "@apollo/client";

const GET_CHARATERS = gql`
  query getCharacters($name: String) {
    characters(filter: { name: $name }) {
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

const AutocompleteItem = ({ id, name, image }) => {
  return (
    <li key={id}>
      <div className="hover:bg-blue-300 flex gap-4 p-4">
        <img
          width="50"
          height="50"
          src={image}
          alt="tailwind logo"
          className="w-12 h-12 object-contain"
        />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
        </div>
      </div>
    </li>
  );
};
export default function Search(props) {
  const [autocompleteState, setAutoCompleteSate] = useState({
    collections: [],
    isOpen: false,
  });
  const [getCharacters, { data: characters }] = useLazyQuery(GET_CHARATERS);

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Search a Character",
        onStateChange: ({ state }) => setAutoCompleteSate(state),
        getSources: () => [
          {
            sourceId: "character-by-id",
            getItems: async ({ query }) => {
              if (!!query) {
                await getCharacters({ variables: { name: query } });
                return characters
                  ? characters.characters
                    ? characters.characters?.results
                    : []
                  : [];
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} className="flex justify-center mb-20" {...formProps}>
      <div className="flex relative p-1 bg-gradient-to-tr from-green-400 to-cyan-400 rounded-full w-2/6">
        <input
          ref={inputRef}
          className="flex-1 p-2 pl-4 rounded-full w-full"
          {...inputProps}
        />

        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10 w-full"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}
