import React from "react";
import { useState, useEffect } from "react";

const EditEntityDrawer = ({
  entityType,
  userId,
  showEditEntity,
  setShowEditEntity,
}) => {
  const [podaci, setPodaci] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/${entityType}/${userId}`)
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
  }, [userId]);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/${entityType}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    });
  };

  return (
    <>
      <div
        className={showEditEntity ? "overlay show" : "overlay"}
        onClick={() => setShowEditEntity(false)}
      ></div>
      {entityType == "users" && podaci && (
        <div
          className={
            showEditEntity ? "edit-entity-drawer show" : "edit-entity-drawer"
          }
        >
          <h2>
            {podaci.first_name} {podaci.last_name}
          </h2>

          {/* <p>{podaci.avatar.image_path}</p> */}
          <form className="edit-entity-form">
            {podaci.avatar && (
              <img
                src={podaci.avatar.image_path}
                alt={podaci.avatar.image_alt}
                className="avatar_image"
              />
            )}

            {!podaci.avatar && (
              <img
                src="./images/profile-images/placeholder-image.jpg"
                alt="Placeholder Avatar Picture"
                className="avatar_image"
              />
            )}

            <input
              type="text"
              name="edit-first-name"
              id="edit-first-name"
              value={podaci.first_name}
              onChange={(e) =>
                setPodaci({ ...podaci, first_name: e.target.value })
              }
            />

            <input
              type="text"
              name="edit-last-name"
              id="edit-last-name"
              value={podaci.last_name}
              onChange={(e) =>
                setPodaci({ ...podaci, last_name: e.target.value })
              }
            />

            <input
              type="text"
              name="edit-email"
              id="edit-email"
              value={podaci.email}
              onChange={(e) => setPodaci({ ...podaci, email: e.target.value })}
            />

            <input
              type="text"
              name="edit-street"
              id="edit-street"
              value={podaci.street}
              onChange={(e) => setPodaci({ ...podaci, street: e.target.value })}
            />

            <input
              type="text"
              name="edit-city"
              id="edit-city"
              value={podaci.city}
              onChange={(e) => setPodaci({ ...podaci, city: e.target.value })}
            />

            <input
              type="text"
              name="edit-country"
              id="edit-country"
              value={podaci.country}
              onChange={(e) =>
                setPodaci({ ...podaci, country: e.target.value })
              }
            />

            <input
              type="text"
              name="edit-password"
              id="edit-password"
              value={podaci.password}
              onChange={(e) =>
                setPodaci({ ...podaci, password: e.target.value })
              }
            />

            <input
              type="text"
              name="edit-role"
              id="edit-role"
              value={podaci.role}
              onChange={(e) => setPodaci({ ...podaci, role: e.target.value })}
            />

            <div>
              <p
                className="form-cancel-btn"
                onClick={() => setShowEditEntity(false)}
              >
                {" "}
                Cancel{" "}
              </p>
              <button
                className="blue-btn"
                type="submit"
                onClick={(e) => {
                  handleEdit(e);
                  setShowEditEntity(false);
                }}
              >
                Edit user
              </button>
            </div>
          </form>
        </div>
      )}
      {entityType == "clients" && podaci && (
        <div
          className={
            showEditEntity ? "edit-entity-drawer show" : "edit-entity-drawer"
          }
        >
          <h2>{podaci.client_name}</h2>
          <form className="edit-entity-form">
            {podaci.avatar && (
              <img src={podaci.avatar} className="avatar_image" />
            )}

            {!podaci.avatar && (
              <img
                src="./images/profile-images/placeholder-image-company.png"
                alt="Placeholder Avatar Picture"
                className="avatar_image"
              />
            )}

            <input
              type="text"
              name="client_name"
              id="edit-client-name"
              value={podaci.client_name}
              onChange={(e) =>
                setPodaci({ ...podaci, client_name: e.target.value })
              }
            />
            <input
              type="text"
              name="email"
              id="edit-client-email"
              value={podaci.email}
              onChange={(e) =>
                setPodaci({ ...podaci, email: e.target.value })
              }
            />
            <input
              type="text"
              name="manager"
              id="edit-client-manager"
              value={podaci.manager}
              onChange={(e) =>
                setPodaci({ ...podaci, manager: e.target.value })
              }
            />
            <input
              type="text"
              name="developers"
              id="edit-developers"
              value={podaci.developers}
              onChange={(e) =>
                setPodaci({ ...podaci, developers: e.target.value })
              }
            />
            <input
              type="text"
              name="billing"
              id="edit-billing"
              value={podaci.billing}
              onChange={(e) =>
                setPodaci({ ...podaci, billing: e.target.value })
              }
            />
            <input
              type="number"
              name="manager-factor"
              id="edit-manager-factor"
              value={podaci["manager-factor"]}
              onChange={(e) =>
                setPodaci({ ...podaci, ["manager-factor"]: e.target.value })
              }
            />
            <input
              type="text"
              name="payment-method"
              id="edit-payment-method"
              value={podaci["payment-method"]}
              onChange={(e) =>
                setPodaci({ ...podaci, ["payment-method"]: e.target.value })
              }
            />

            <textarea name="invoice-data" id="edit-invoice-data" cols="30" rows="5"
            placeholder="Invoice data:" value={podaci["invoice-data"] || ""}
            onChange={(e) => setPodaci({...podaci, ["invoice-data"]: e.target.value})}>
            </textarea>


            <div>
              <p
                className="form-cancel-btn"
                onClick={() => setShowEditEntity(false)}
              >
                {" "}
                Cancel{" "}
              </p>
              <button
                className="blue-btn"
                type="submit"
                onClick={(e) => {
                  handleEdit(e);
                  setShowEditEntity(false);
                }}
              >
                Edit user
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditEntityDrawer;
