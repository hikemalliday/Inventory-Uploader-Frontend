import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../css/Modal.css";

interface Props {
  isSignInModalOpen: boolean;
  loggedIn: boolean;
  logIn: (payload: string[]) => void;
  closeSignInModal: () => void;
  usernameNotFound: boolean;
  invalidPassword: boolean;
  setUsernameNotFound: (boolean: boolean) => void;
  setInvalidPassword: (boolean: boolean) => void;
  usernameSignIn: string;
  setUsernameSignIn: (username: string) => void;
  passwordSignIn: string;
  setPasswordSignIn: (password: string) => void;
}

const container = document.getElementById("portal");

export const SignInModal = ({
  isSignInModalOpen,
  closeSignInModal,
  logIn,
  loggedIn,
  usernameNotFound,
  invalidPassword,
  setUsernameNotFound,
  setInvalidPassword,
  usernameSignIn,
  setUsernameSignIn,
  passwordSignIn,
  setPasswordSignIn,
}: Props) => {
  if (!isSignInModalOpen) return null;

  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameSignIn === "" || passwordSignIn === "") {
      setInvalidInput(true);
      return;
    }
    logIn([usernameSignIn, passwordSignIn]);
    setInvalidInput(false);
    setUsernameNotFound(false);
    setInvalidPassword(false);
  };

  return isSignInModalOpen && !loggedIn
    ? ReactDOM.createPortal(
        <>
          <div className="modal-background" onClick={closeSignInModal} />
          <div className="modal-container">
            <div className="whitespace-nowrap text-center   mt-5 hyperlink">
              SIGN IN:
            </div>

            {invalidInput === true ? (
              <>
                <div className="text-red-500">
                  Please fill in required fields
                </div>
              </>
            ) : null}
            {usernameNotFound === true ? (
              <>
                <div className="text-red-500">Username not found</div>
              </>
            ) : null}
            {invalidPassword === true ? (
              <>
                <div className="text-red-500">Invalid password</div>
              </>
            ) : null}

            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsernameSignIn(e.target.value)}
                className="mt-8 input-field"
              />

              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPasswordSignIn(e.target.value)}
                className="mt-4 input-field"
              />
              <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded">
                SUBMIT
              </button>
            </form>
          </div>
        </>,
        container as HTMLElement
      )
    : null;
};

export default SignInModal;
