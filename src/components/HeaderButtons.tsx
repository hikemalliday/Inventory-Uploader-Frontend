import { useState } from "react";
import UploadFileModal from "./modals/UploadFileModal";
import SearchFiltersModal from "./modals/SearchFiltersModal";
import OptionsModal from "./modals/OptionsModal";
import SignInModal from "./modals/SignInModal";
import { AiOutlineMenu } from "react-icons/all";
import { AiOutlineClose } from "react-icons/all";
import "../css/HeaderButtons.css";
import "../css/App.css";
import HamburgerMenu from "./HamburgerMenu";

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
  usernameNotFound: boolean;
  setUsernameNotFound: (boolean: boolean) => void;
  invalidPassword: boolean;
  setInvalidPassword: (boolean: boolean) => void;
  usernameSignIn: string;
  setUsernameSignIn: (username: string) => void;
  passwordSignIn: string;
  setPasswordSignIn: (password: string) => void;
}

type InventoryItem = {
  charName: string;
  itemSlot: number;
  itemName: string;
  itemId: number;
  itemCount: number;
  itemSlots: number;
};

export const HeaderButtons = ({
  inventoryDb,
  loggedIn,
  uploadFile,
  deleteChar,
  logIn,
  logOut,
  selectedCharName,
  setSelectedCharName,
  itemSearch,
  itemName,
  usernameNotFound,
  setUsernameNotFound,
  invalidPassword,
  setInvalidPassword,
  usernameSignIn,
  setUsernameSignIn,
  passwordSignIn,
  setPasswordSignIn,
}: Props) => {
  const [isUploadFileModalOpen, setUploadFileModal] = useState<boolean>(false);
  const [isSearchFiltersModalOpen, setSearchFiltersModal] =
    useState<boolean>(false);
  const [isOptionsModalOpen, setOptionsModal] = useState<boolean>(false);
  const [isSignInModalOpen, setSignInModal] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setHamburgerMenu] = useState<boolean>(false);

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

  const openSignInModal = () => {
    setSignInModal(true);
  };

  const closeSignInModal = () => {
    setSignInModal(false);
    setUsernameNotFound(false);
    setInvalidPassword(false);
    setUsernameSignIn("");
    setPasswordSignIn("");
  };

  const toggleHamburgerMenu = () => {
    setHamburgerMenu(!isHamburgerMenuOpen);
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
      <SignInModal
        isSignInModalOpen={isSignInModalOpen}
        loggedIn={loggedIn}
        logIn={logIn}
        closeSignInModal={closeSignInModal}
        usernameNotFound={usernameNotFound}
        invalidPassword={invalidPassword}
        setUsernameNotFound={setUsernameNotFound}
        setInvalidPassword={setInvalidPassword}
        usernameSignIn={usernameSignIn}
        setUsernameSignIn={setUsernameSignIn}
        passwordSignIn={passwordSignIn}
        setPasswordSignIn={setPasswordSignIn}
      />

      <div className="flex mt-6 whitespace-nowrap">
        {loggedIn && !isHamburgerMenuOpen ? (
          <>
            <div
              className="upload-file-button hyperlink mr-2"
              onClick={openUploadFileModal}
            >
              Upload File
            </div>
            <div className="button-pipe">|</div>
            <div
              className="search-filters-button ml-2 mr-2 hyperlink"
              onClick={openSearchFiltersModal}
            >
              Search Filters
            </div>
            <div className="button-pipe">|</div>
            <div
              className="options-button ml-2 mr-2 hyperlink"
              onClick={openOptionsModal}
            >
              Options
            </div>
            <div className="button-pipe">|</div>
            <div
              className="sign-out-button ml-2 mr-2 hyperlink"
              onClick={logOut}
            >
              Sign Out
            </div>

            <AiOutlineMenu
              onClick={toggleHamburgerMenu}
              className="hamburger-menu-icon mr-6 hyperlink"
            />
          </>
        ) : null}
        {isHamburgerMenuOpen && loggedIn ? (
          <AiOutlineClose
            onClick={toggleHamburgerMenu}
            className="mr-6 hyperlink"
          />
        ) : null}

        {!loggedIn ? (
          <div
            className="sign-in-button ml-2 mr-2 hyperlink"
            onClick={openSignInModal}
          >
            Sign In
          </div>
        ) : null}

        {isHamburgerMenuOpen ? (
          <HamburgerMenu
            inventoryDb={inventoryDb}
            loggedIn={loggedIn}
            uploadFile={uploadFile}
            deleteChar={deleteChar}
            logIn={logIn}
            logOut={logOut}
            selectedCharName={selectedCharName}
            setSelectedCharName={setSelectedCharName}
            itemSearch={itemSearch}
            itemName={itemName}
            isHamburgerMenuOpen={isHamburgerMenuOpen}
          />
        ) : null}
      </div>
    </>
  );
};

export default HeaderButtons;
