import React, { useState, useEffect } from 'react'

const DeleteEntityModal = ({ entityType, showDeleteUser, setShowDeleteUser, userId }) => {
    const [podaci, setPodaci] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/${entityType}/${userId}`)
        .then((response) => {
            if(!response.ok) {
                throw Error('Nešto nije u redu.');
            } else {
                return response.json();
            }
        })
        .then((data) => {
          setPodaci(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [userId]);

    const handleDeleteEntity = () => {
        fetch(`http://localhost:8000/${entityType}/${userId}`, {
            method: 'DELETE',
        })
    }

  return (<>
    <div className={showDeleteUser ? "overlay show" : "overlay"} onClick={() => setShowDeleteUser(false)}></div>
    {entityType == "users" && podaci && <div className={showDeleteUser ? "delete-user-modal show" : "delete-user-modal"}>
        <p>Are you sure you want to delete</p>
        <h2>{podaci.first_name} {podaci.last_name}</h2>
        <div className="delete-user-buttons">
            <button className="blue-btn"
            onClick={() => {
                handleDeleteEntity();
                setShowDeleteUser(false)}}>Yes</button>
            <button className="white-btn"
            onClick={() => setShowDeleteUser(false)}>No</button>
        </div>
    </div>
    }
    {entityType == "clients" && podaci && <div className={showDeleteUser ? "delete-user-modal show" : "delete-user-modal"}>
        <p>Are you sure you want to delete</p>
        <h2>{podaci.client_name}</h2>
        <div className="delete-user-buttons">
            <button className="blue-btn"
            onClick={() => {
                handleDeleteEntity();
                setShowDeleteUser(false)}}>Yes</button>
            <button className="white-btn"
            onClick={() => setShowDeleteUser(false)}>No</button>
        </div>
    </div>
    }</>
  )
}

export default DeleteEntityModal