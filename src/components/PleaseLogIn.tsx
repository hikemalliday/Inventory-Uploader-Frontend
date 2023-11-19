import { useState } from "react";
import SignUpModal from "./modals/SignUpModal";

interface Props {
  signUp: (payload: string[]) => void;
  usernameIsTaken: boolean;
  setUsernameIsTaken: (boolean: boolean) => void;
}

export const PleaseLogIn = ({
  signUp,
  usernameIsTaken,
  setUsernameIsTaken,
}: Props) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const closeModal = () => {
    setIsSignUpModalOpen(false);
    setUsernameIsTaken(false);
  };
  return (
    <>
      <SignUpModal
        usernameIsTaken={usernameIsTaken}
        setUsernameIsTaken={setUsernameIsTaken}
        openModal={isSignUpModalOpen}
        closeModal={closeModal}
        signUp={signUp}
      />
      <div className="text-center mt-20">
        <div className="text-xl">Please log in!</div>
        <div>
          Don't have an account?
          <div className="text-sm  hyperlink" onClick={openModal}>
            Sign up here
          </div>
        </div>
      </div>
    </>
  );
};

export default PleaseLogIn;
