import Eqlogo from "../assets/eqlogo.JPG";
import "../css/Title.css";

interface Props {
  fetchInventory: (username: string) => void;
}

export const Title = ({ fetchInventory }: Props) => {
  return (
    <>
      <div
        onClick={() =>
          fetchInventory(localStorage.getItem("username") as string)
        }
        className="title-container"
      >
        <img
          className="mt-6"
          style={{ width: "30px", height: "30px", flex: "0 0 auto" }}
          src={Eqlogo}
          alt="EQ Logo"
        />
        <div className="title-text whitespace-nowrap text-center text-3xl mt-5 hyperlink">
          Inventory Uploader
        </div>
      </div>
    </>
  );
};

export default Title;
