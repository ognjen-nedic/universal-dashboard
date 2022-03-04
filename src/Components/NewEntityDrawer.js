import React from "react";
import { useState } from "react";

const NewEntityDrawer = ({
  source,
  entityType,
  showAddEntity,
  setShowAddEntity,
}) => {
  const [entityValues, setEntityValues] = useState({});

  let roleSelect = [...new Set(source.map((item) => item.role))].sort();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEntityValues((values) => ({ ...values, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/${entityType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entityValues),
    });
  }

  return (
    <>
      <div
        className={showAddEntity ? "overlay show" : "overlay"}
        onClick={() => setShowAddEntity(false)}
      ></div>
      {entityType == "users" && (
        <div
          className={
            showAddEntity ? "new-entity-drawer show" : "new-entity-drawer"
          }
        >
          <h2>New User</h2>
          <form className="new-entity-form" onSubmit={handleSubmit}>
            <button type="button" className="new-entity-form__image">
              Add image
            </button>

            <input
              type="text"
              placeholder="Name"
              name="first_name"
              id="new-first-name"
              value={entityValues.first_name || ""}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              id="new-last-name"
              value={entityValues.last_name || ""}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="E-mail"
              name="email"
              id="new-email"
              value={entityValues.email || ""}
              onChange={handleChange}
            />

            {/* <input type="text" placeholder="Phone"/> */}

            <input
              type="text"
              placeholder="Street"
              name="street"
              id="new-street"
              value={entityValues.street || ""}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="City"
              name="city"
              id="new-city"
              value={entityValues.city || ""}
              onChange={handleChange}
            />

            {/* <input type="text" placeholder="PTT"/> */}

            <input
              type="text"
              placeholder="Country"
              name="country"
              id="new-country"
              value={entityValues.country || ""}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Password"
              name="password"
              id="new-password"
              value={entityValues.password || ""}
              onChange={handleChange}
            />

            {/* <input type="text" placeholder="Role"/> */}

            <select
              name="role"
              value={entityValues.role || ""}
              onChange={handleChange}
            >
              {roleSelect?.map((item, key) => {
                return (
                  <option key={key} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>

            {/* <input type="text" placeholder="Tekući račun"/> */}
            <div style={{ alignSelf: "end" }}>
              <p
                onClick={() => setShowAddEntity(false)}
                className="form-cancel-btn"
              >
                {" "}
                Cancel{" "}
              </p>
              <button
                onClick={() => setShowAddEntity(false)}
                type="submit"
                className="blue-btn"
              >
                Add user
              </button>
            </div>
          </form>
        </div>
      )}
      {entityType == "clients" && (
        <div
          className={
            showAddEntity ? "new-entity-drawer show" : "new-entity-drawer"
          }
        >
          <h2>New Client</h2>
          <form onSubmit={handleSubmit} className="new-entity-form">
            <button type="button" className="new-entity-form__image">
              {" "}
              Add image{" "}
            </button>
            <input
              type="text"
              id="new-client_name"
              name="client_name"
              placeholder="Client Name:"
              value={entityValues.client_name || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              id="new-email"
              name="email"
              placeholder="E-mail:"
              value={entityValues.email || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              id="new-manager"
              name="manager"
              placeholder="Manager:"
              value={entityValues.manager || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              id="new-developers"
              name="developers"
              placeholder="Developers:"
              value={entityValues.developers || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              id="new-billing"
              name="billing"
              placeholder="Billing:"
              value={entityValues.billing || ""}
              onChange={handleChange}
            />
            <input
              type="number"
              id="new-manager-factor"
              name="manager-factor"
              placeholder="Manager factor:"
              value={entityValues["manager-factor"] || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              id="new-payment-method"
              name="payment-method"
              placeholder="Payment method:"
              value={entityValues["payment-method"] || ""}
              onChange={handleChange}
            />
            <input
              type="number"
              id="new-PIB"
              name="pib"
              placeholder="PIB:"
              value={entityValues.pib || ""}
              onChange={handleChange}
            />
            <textarea name="invoice-data" id="new-invoice-data" cols="30" rows="5"
            placeholder="Invoice data:" value={entityValues["invoice-data"] || ""}
            onChange={handleChange}>

            </textarea>
            <div style={{ alignSelf: "end" }}>
              <p
                onClick={() => setShowAddEntity(false)}
                className="form-cancel-btn"
              >
                Cancel
              </p>
              <button
                onClick={() => setShowAddEntity(false)}
                type="submit"
                className="blue-btn"
              >
                Add user
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewEntityDrawer;
