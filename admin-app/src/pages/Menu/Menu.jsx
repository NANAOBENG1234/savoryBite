import React from "react";

function Menu() {
  return (
    <>
      <h1 className="page-title">Menu</h1>
      <p className="page-subtitle">Manage menu items, categories and availability.</p>
      <div className="card card-pad empty-state" style={{ textAlign: "center" }}>
        <div className="empty-state-icon">🍽️</div>
        <p>Menu CRUD coming in a later milestone.</p>
      </div>
    </>
  );
}

export default Menu;
