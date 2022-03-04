import React from "react";
import { useState, useEffect } from "react";
import ControlsComponent from "../Components/ControlsComponent";
import TableComponent from "../Components/TableComponent";
import NewEntityDrawer from "../Components/NewEntityDrawer";
import EditEntityDrawer from "../Components/EditEntityDrawer";
import DeleteEntityModal from "../Components/DeleteEntityModal";

const Clients = () => {
  const tableHeader = ["Avatar", "Client Name", "Options"];
  const [podaci, setPodaci] = useState([]);

  const [showEditClient, setShowEditClient] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);


  useEffect(() => {
    fetch("http://localhost:8000/clients")
      .then((response) => {
        if (!response.ok) {
          throw Error("Nešto nije u redu.");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setPodaci(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [podaci]);

  const [filterInputText, setFilterInputText] = useState("");

  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedUser, setSelectedUser] = useState(1); /* userID */


  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setFilterInputText(lowerCase);
  };

  const filteredData = podaci.filter((element) => {
    const nameFilter = element.client_name;
    if (filterInputText === "") {
      return element;
    } else {
      return nameFilter.toLowerCase().includes(filterInputText);
    }
  });

  return (
    <div className="main-content-container">
      <ControlsComponent
        setShowAddEntity={setShowAddClient}
        inputHandler={inputHandler}
      />
      <TableComponent
        source={filteredData}
        header={tableHeader}
        type="clients"
        setShowEditClient={setShowEditClient}
        setSelectedUser={setSelectedUser}
        setShowDeleteUser={setShowDeleteUser}
      />
      <NewEntityDrawer
        source={podaci}
        entityType="clients"
        showAddEntity={showAddClient}
        setShowAddEntity={setShowAddClient}
      />
      <EditEntityDrawer
        userId={selectedUser}
        entityType="clients" 
        showEditEntity={showEditClient}
        setShowEditEntity={setShowEditClient}/>
      <DeleteEntityModal
        entityType="clients"
        showDeleteUser={showDeleteUser}
        setShowDeleteUser={setShowDeleteUser}
        userId={selectedUser}
      />
    </div>
  );
};

export default Clients;
