import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../css/Modal.css";

interface Props {
  isUploadFileModal: boolean;
  closeUploadFileModal: () => void;
  uploadFile: (file: File) => void;
}

const container = document.getElementById("portal");

export const UploadFileModal = ({
  isUploadFileModal,
  closeUploadFileModal,
  uploadFile,
}: Props) => {
  if (!isUploadFileModal) return null;
  const [file, setFile] = useState<File>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    uploadFile(file as File);
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={closeUploadFileModal} />
      <div className="modal-container">
        <div className="whitespace-nowrap text-center mt-5 hyperlink">
          UPLOAD FILE:
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              className="mt-6"
              type="file"
              id="myfile"
              name="myfile"
              onChange={onChange}
            />
          </div>
          <div>
            <button
              className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>,
    container as HTMLElement
  );
};

export default UploadFileModal;
