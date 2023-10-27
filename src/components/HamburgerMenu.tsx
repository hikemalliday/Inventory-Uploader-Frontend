import { useState } from "react";
import UploadFileModal from "./modals/UploadFileModal";
import SearchFiltersModal from "./modals/SearchFiltersModal";
import OptionsModal from "./modals/OptionsModal";

import "../css/HamburgerMenu.css";

type InventoryItem = {
  charName: string;
  itemSlot: number;
  itemName: string;
  itemId: number;
  itemCount: number;
  itemSlots: number;
};

interface Props {
  inventoryDb: InventoryItem[];
  loggedIn: boolean;
  uploadFile: (file: File) => void;
  deleteChar: (charName: string) => void;
  logIn: (payload: string[]) => void;
  logOut: () => void;
  selectedCharName: string;
  setSelectedCharName: (charName: string) => void;
  itemSearch: (charName: string, itemName: string) => void;
  itemName: string;
  isHamburgerMenuOpen: boolean;
}

export const HamburgerMenu = ({
  inventoryDb,
  loggedIn,
  uploadFile,
  deleteChar,
  logOut,
  selectedCharName,
  setSelectedCharName,
  itemSearch,
  itemName,
  isHamburgerMenuOpen,
}: Props) => {
  const [isUploadFileModalOpen, setUploadFileModal] = useState(false);
  const [isSearchFiltersModalOpen, setSearchFiltersModal] = useState(false);
  const [isOptionsModalOpen, setOptionsModal] = useState(false);

  const openUploadFileModal = () => {
    setUploadFileModal(true);
  };

  const closeUploadFileModal = () => {
    setUploadFileModal(false);
  };

  const openSearchFiltersModal = () => {
    setSearchFiltersModal(true);
  };

  const closeSearchFiltersModal = () => {
    setSearchFiltersModal(false);
  };

  const openOptionsModal = () => {
    setOptionsModal(true);
  };

  const closeOptionsModal = () => {
    setOptionsModal(false);
  };

  return (
    <>
      <UploadFileModal
        uploadFile={uploadFile}
        isUploadFileModal={isUploadFileModalOpen}
        closeUploadFileModal={closeUploadFileModal}
      />
      <SearchFiltersModal
        itemName={itemName}
        itemSearch={itemSearch}
        selectedCharName={selectedCharName}
        setSelectedCharName={setSelectedCharName}
        inventoryDb={inventoryDb}
        isSearchFiltersModal={isSearchFiltersModalOpen}
        closeSearchFiltersModal={closeSearchFiltersModal}
      />
      <OptionsModal
        inventoryDb={inventoryDb}
        isOptionsModal={isOptionsModalOpen}
        closeOptionsModal={closeOptionsModal}
        deleteChar={deleteChar}
      />

      <div
        className={`hamburger-menu-container${
          isHamburgerMenuOpen ? "-expanded" : ""
        }`}
      >
        {loggedIn ? (
          <>
            <div className="ml-2 hyperlink" onClick={openUploadFileModal}>
              Upload File
            </div>
            <div
              className="ml-2 mr-2 hyperlink"
              onClick={openSearchFiltersModal}
            >
              Search Filters
            </div>
            <div className="ml-2 mr-2 hyperlink" onClick={openOptionsModal}>
              Options
            </div>
            <div className="ml-2 mr-2 hyperlink" onClick={logOut}>
              Sign Out
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default HamburgerMenu;
