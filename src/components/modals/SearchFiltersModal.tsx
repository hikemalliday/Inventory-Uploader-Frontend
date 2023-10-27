import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../css/Modal.css";

interface Props {
  isSearchFiltersModal: boolean;
  inventoryDb: InventoryItem[];
  selectedCharName: string;
  closeSearchFiltersModal: () => void;
  setSelectedCharName: (charName: string) => void;
  itemSearch: (charName: string, itemName: string) => void;
  itemName: string;
}

type InventoryItem = {
  charName: string;
  itemSlot: number;
  itemName: string;
  itemId: number;
  itemCount: number;
  itemSlots: number;
};

const container = document.getElementById("portal");

export const SearchFiltersModal = ({
  isSearchFiltersModal,
  inventoryDb,
  selectedCharName,
  closeSearchFiltersModal,
  setSelectedCharName,
  itemSearch,
  itemName,
}: Props) => {
  if (!isSearchFiltersModal) return null;

  const [charNames, setCharNames] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCharNames = new Set();
    inventoryDb.forEach((item) => {
      uniqueCharNames.add(item.charName);
    });
    setCharNames(["All", ...Array.from(uniqueCharNames)] as string[]);
  }, [inventoryDb]);

  const handleCharNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCharName(selectedValue);
    itemSearch(selectedValue, itemName);
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={closeSearchFiltersModal} />
      <div className="modal-container">
        <div className="whitespace-nowrap text-center mt-5 hyperlink">
          SELECT CHARACTER:
        </div>
        <select
          className="mt-6 pulldown-menu"
          id="charNameDropdown"
          value={selectedCharName}
          onChange={handleCharNameChange}
        >
          {charNames.map((charName) => (
            <option key={charName} value={charName}>
              {charName}
            </option>
          ))}
        </select>
      </div>
    </>,
    container as HTMLElement
  );
};

export default SearchFiltersModal;
