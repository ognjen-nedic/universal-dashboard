import React from "react";
import TableComponent from "../Components/TableComponent";
import ControlsComponent from "../Components/ControlsComponent";
import NewEntityDrawer from "../Components/NewEntityDrawer";
import EditEntityDrawer from "../Components/EditEntityDrawer";
import DeleteEntityModal from "../Components/DeleteEntityModal";
import { useState, useEffect } from "react";

const Users = ({staticFiltering}) => {
  const entity = "users";

  const tableHeader = [
    "Avatar",
    "First Name",
    "Last Name",
    "City",
    "Role",
    "Status",
    "Email",
    "Options",
  ];
  const [podaci, setPodaci] = useState([]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(1); /* userID */

  useEffect(() => {
    fetch("http://localhost:8000/users")
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
  }, []);

  let [filterInputText, setFilterInputText] = useState("");

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setFilterInputText(lowerCase);
  };

  let filteredData = podaci.filter((element) => {
    const nameFilter =
      element.first_name +
      " " +
      element.last_name +
      " " +
      element.email +
      " " +
      element.city +
      " " +
      element.role +
      " " +
      element.status;
    if (filterInputText === "" && !staticFiltering) {
      return element;
    } else if (element.role && staticFiltering) {
      return element.role.includes(staticFiltering);
    } 
    else {
      return nameFilter.toLowerCase().includes(filterInputText);
    }
  });

  return (
    <div className="main-content-container">
      <ControlsComponent
        setShowAddEntity={setShowAddUser}
        inputHandler={inputHandler}
      />
      <TableComponent
        source={filteredData}
        header={tableHeader}
        type={entity}
        setShowEditUser={setShowEditUser}
        setSelectedUser={setSelectedUser}
        setShowDeleteUser={setShowDeleteUser}
      />
      <NewEntityDrawer
        source={podaci}
        entityType={entity}
        showAddEntity={showAddUser}
        setShowAddEntity={setShowAddUser}
      />
      <EditEntityDrawer
        userId={selectedUser}
        entityType={entity}
        showEditEntity={showEditUser}
        setShowEditEntity={setShowEditUser}
      />
      <DeleteEntityModal
        entityType={entity}
        showDeleteUser={showDeleteUser}
        setShowDeleteUser={setShowDeleteUser}
        userId={selectedUser}
      />
    </div>
  );
};

export default Users;
