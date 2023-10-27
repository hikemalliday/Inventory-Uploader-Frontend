import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../css/Modal.css";

interface Props {
  isOptionsModal: boolean;
  inventoryDb: InventoryItem[];
  closeOptionsModal: () => void;
  deleteChar: (charName: string) => void;
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

export const OptionsModal = ({
  isOptionsModal,
  closeOptionsModal,
  deleteChar,
  inventoryDb,
}: Props) => {
  if (!isOptionsModal) return null;

  const [charNames, setCharNames] = useState<string[]>([]);
  const [selectedCharName, setSelectedCharName] = useState<string>("");

  useEffect(() => {
    const uniqueCharNames = new Set();
    inventoryDb.forEach((item) => {
      uniqueCharNames.add(item.charName);
    });
    const sortedCharNames = [...Array.from(uniqueCharNames)].sort();

    setCharNames(sortedCharNames as string[]);
    setSelectedCharName(sortedCharNames[0] as string);
  }, [inventoryDb]);

  const handleCharNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCharName(selectedValue);
  };
  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={closeOptionsModal} />
      <div className="modal-container">
        <div className="whitespace-nowrap text-center  mt-5 hyperlink">
          Delete Character:
        </div>
        <div>
          <select
            className="pulldown-menu mt-6"
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
        <div>
          <button
            className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded"
            onClick={() => deleteChar(selectedCharName)}
          >
            Submit
          </button>
        </div>
      </div>
    </>,
    container as HTMLElement
  );
};

export default OptionsModal;
