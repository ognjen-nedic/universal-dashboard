import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TableComponent = ({
  source,
  header,
  type,
  setShowEditUser,
  setShowDeleteUser,
  setShowEditClient,
  setSelectedUser,
}) => {

  const navigate = useNavigate();

  return (
    <table className="entities-table">
      <thead>
        <tr>
          {header.map((element, index) => {
            return <th key={index}>{element}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {type == "users" &&
          source.map((element) => {
            return (
              <tr key={element.id}>
                {element.avatar && <td>
                  <img
                    src={element.avatar.image_path}
                    className="avatar_image"
                  />
                </td>}
                {!element.avatar && 
                  <td>
                    <img src="./images/profile-images/placeholder-image.jpg" 
                    className="avatar_image"/>
                  </td>}
                <td>{element.first_name}</td>
                <td>{element.last_name}</td>
                <td>{element.city}</td>
                <td>{element.role}</td>
                <td>{element.status}</td>
                <td>{element.email}</td>
                <td className="table-options">
                  <img
                    src="../icon/edit.svg"
                    alt=""
                    className="edit-entity-btn"
                    onClick={() => {
                      setShowEditUser(true);
                      setSelectedUser(element.id);
                    }}
                  />
                  <img src="../icon/eye.svg" onClick={() => navigate(`/users/${element.id}`)}/>
                  <img
                    src="../icon/trash.svg"
                    alt=""
                    className="delete-entity-btn"
                    onClick={() => {
                      setShowDeleteUser(true);
                      setSelectedUser(element.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
          {type == "clients" && 
            source.map((element) => {
                return (
                    <tr key={element.id}>
                        {element.avatar && <td> <img src={element.avatar} className="avatar_image" /> </td>}
                        {!element.avatar && <td> <img src="./images/profile-images/placeholder-image-company.png" className="avatar_image" /> </td>}
                        <td>{element.client_name}</td>
                        <td className="table-options">
                            <img src="../icon/clock.svg" alt="" className="edit-time-icon"/>
                            <img src="../icon/edit.svg" alt="" className="edit-client-btn"
                            onClick={() => {
                              setShowEditClient(true);
                              setSelectedUser(element.id);
                            }}/>
                            <img src="../icon/eye.svg" alt=""/>
                            <img src="../icon/full-eye.svg" alt=""/>
                            <img src="../icon/trash.svg" alt="" className="delete-client-btn"
                            onClick={() => {
                              setShowDeleteUser(true);
                              setSelectedUser(element.id);
                            }} />
                            <img src="../icon/dolar.svg" alt="" className="invoice-data-btn"/>
                        </td>
                    </tr>
                )
            })}
      </tbody>
    </table>
  );
};

export default TableComponent;
