import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../css/Modal.css";

interface Props {
  openModal: boolean;
  closeModal: () => void;
  signUp: (payload: string[]) => void;
  usernameIsTaken: boolean;
  setUsernameIsTaken: (boolean: boolean) => void;
}

const container = document.getElementById("portal");

export const SignUpModal = ({
  openModal,
  closeModal,
  signUp,
  usernameIsTaken,
  setUsernameIsTaken,
}: Props) => {
  if (!openModal) return null;
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setInvalidInput(true);
      setUsernameIsTaken(false);
      return;
    }
    signUp([username, password]);

    setUsernameIsTaken(false);
    setInvalidInput(false);
  };
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-container">
        <div style={{ textAlign: "center" }}>
          <div>SIGN UP:</div>
          {invalidInput === true ? (
            <div className="text-red-500">
              <>Please enter required fields</>
            </div>
          ) : null}
          {usernameIsTaken === true ? (
            <div className="text-red-500">
              <>Username is taken, please try again</>
            </div>
          ) : null}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-4 input-field"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 input-field"
            />
            <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>,
    container as HTMLElement
  );
};

export default SignUpModal;
