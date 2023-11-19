import React from "react";

interface Props {
  itemSearch: (charName: string, itemName: string) => void;
  selectedCharName: string;
  itemName: string;
  setSearchTerm: (itemName: string) => void;
}

export const SearchBar = ({
  itemSearch,
  selectedCharName,
  itemName,
  setSearchTerm,
}: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    itemSearch(selectedCharName, itemName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={handleInputChange}
          className=" input-field"
        />
      </form>
    </div>
  );
};

export default SearchBar;
