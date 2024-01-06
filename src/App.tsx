import { useState, useEffect } from "react";
import axios from "axios";
import "./css/App.css";
import Title from "./components/Title";
import Table from "./components/Table";
import HeaderButtons from "./components/HeaderButtons";
import PleaseLogIn from "./components/PleaseLogIn";
import SearchBar from "./components/SearchBar";
import { SERVER_SIDE_URL, LOCAL_URL, SERVER_SIDE } from "./config.js";

function App() {
  const apiUrl = SERVER_SIDE === true ? SERVER_SIDE_URL : LOCAL_URL;

  type InventoryItem = {
    charName: string;
    itemSlot: number;
    itemName: string;
    itemId: number;
    itemCount: number;
    itemSlots: number;
  };

  const [usernameSignIn, setUsernameSignIn] = useState<string>("");
  const [passwordSignIn, setPasswordSignIn] = useState<string>("");
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [usernameIsTaken, setUsernameIsTaken] = useState<boolean>(false);
  const [usernameNotFound, setUsernameNotFound] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [selectedCharName, setSelectedCharName] = useState<string>("All");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [inventoryDb, setInventoryDb] = useState<InventoryItem[]>([]);
  const [filteredInventoryDb, setFilteredInventoryDb] = useState<
    InventoryItem[]
  >([]);

  const isTokenValid = async () => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      try {
        const res = await axios.get(`${apiUrl}/istokenvalid`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (res.status === 200) {
          console.log("Token is valid");
          setLoggedIn(true);
        } else {
          console.log("Token is invalid");
          setLoggedIn(false);
          logOut();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Token not found in local storage");
    }
  };

  const logIn = async (payload: string[]) => {
    let body = { username: payload[0], password: payload[1] };

    try {
      const res = await axios.post(`${apiUrl}/login`, body);

      if (res.data.loggedIn === true) {
        setLoggedIn(true);

        localStorage.setItem("username", body.username);
        localStorage.setItem("jwtToken", res.data.token);
        setInventoryDb([...res.data.inventory_db]);
        setFilteredInventoryDb([...res.data.inventory_db]);
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.detail === "Username not found") {
        setUsernameNotFound(true);
        return;
      }
      if (err.response.data.detail === "Invalid password") {
        setInvalidPassword(true);
        return;
      }
    }
    setUsernameSignIn("");
    setPasswordSignIn("");
  };

  const logOut = async () => {
    localStorage.removeItem("jwtToken");
    setLoggedIn(false);
    setInventoryDb([]);
    setFilteredInventoryDb([]);
  };

  const signUp = async (payload: string[]) => {
    let body = { username: payload[0], password: payload[1] };

    try {
      await axios.post(`${apiUrl}/signup`, body);

      logIn(payload);
    } catch (err: any) {
      if (err.response.data.detail === "Username is taken") {
        setUsernameIsTaken(true);
      }
    }
  };

  const fetchInventory = async (username: string) => {
    if (localStorage.getItem("username")) {
      try {
        const url = `${apiUrl}/fetchinventory/` + username;
        const res = await axios.get(url);

        setInventoryDb([...res.data.inventory_db]);
        setFilteredInventoryDb([...res.data.inventory_db]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    
    formData.append("file", file);
    const username = localStorage.getItem("username");

    if (username !== null) formData.append("username", username);

    formData.append("filename", file.name);

    try {
      const res = await axios.post(`${apiUrl}/uploadfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.file_uploaded == true) {
        const newInventory = [...inventoryDb, ...res.data.char_inventory];
        setInventoryDb(newInventory);
        setFilteredInventoryDb(newInventory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const itemSearch = (charName: string = "", itemName: string) => {
    if (charName === "All" || !charName) {
      const filteredItems = inventoryDb.filter((item) =>
        item.itemName.toLowerCase().includes(itemName.toLowerCase())
      );
      setFilteredInventoryDb(filteredItems);
    } else {
      const filteredItems = inventoryDb.filter(
        (item) =>
          item.charName === charName &&
          item.itemName.toLowerCase().includes(itemName.toLowerCase())
      );
      setFilteredInventoryDb(filteredItems);
    }
  };

  const deleteChar = async (charName: string) => {
    try {
      let body = {
        username: localStorage.getItem("username"),
        charName: charName,
      };
      const res = await axios.delete(`${apiUrl}/deletechar`, {
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Now we need to filter the local inventoryDb:
      if (res.data.success == true) {
        const newInventory = inventoryDb.filter(
          (item) => item.charName !== charName
        );
        setInventoryDb(newInventory);
        setFilteredInventoryDb(newInventory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const asyncFuncs = async () => {
      await isTokenValid();
      const username = localStorage.getItem("username");
      await fetchInventory(username as string);
    };
    asyncFuncs();
  }, []);

  return (
    <div className="app-container">
      <div className="header-container">
        <div className="title-container">
          <Title fetchInventory={fetchInventory} />
        </div>
        <div className="user-options-container">
          <HeaderButtons
            itemName={itemName}
            itemSearch={itemSearch}
            selectedCharName={selectedCharName}
            setSelectedCharName={setSelectedCharName}
            logIn={logIn}
            logOut={logOut}
            loggedIn={loggedIn}
            inventoryDb={inventoryDb}
            uploadFile={uploadFile}
            deleteChar={deleteChar}
            usernameNotFound={usernameNotFound}
            setUsernameNotFound={setUsernameNotFound}
            invalidPassword={invalidPassword}
            setInvalidPassword={setInvalidPassword}
            usernameSignIn={usernameSignIn}
            setUsernameSignIn={setUsernameSignIn}
            setPasswordSignIn={setPasswordSignIn}
            passwordSignIn={passwordSignIn}
          />
        </div>
      </div>
      <div className="searchbar-container">
        <SearchBar
          itemName={itemName}
          setSearchTerm={setItemName}
          selectedCharName={selectedCharName}
          itemSearch={itemSearch}
        />
      </div>
      <div className="table-container">
        {loggedIn === true ? (
          <Table filteredInventoryDb={filteredInventoryDb} />
        ) : (
          <PleaseLogIn
            signUp={signUp}
            usernameIsTaken={usernameIsTaken}
            setUsernameIsTaken={setUsernameIsTaken}
          />
        )}
      </div>
    </div>
  );
}

export default App;
