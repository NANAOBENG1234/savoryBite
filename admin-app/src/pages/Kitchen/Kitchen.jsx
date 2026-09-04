import React from "react";

function Kitchen() {
  return (
    <>
      <h1 className="page-title">Kitchen Display</h1>
      <p className="page-subtitle">Live order preparation queue.</p>
      <div className="card card-pad empty-state" style={{ textAlign: "center" }}>
        <div className="empty-state-icon">👨‍🍳</div>
        <p>Kitchen display coming in a later milestone.</p>
      </div>
    </>
  );
}

export default Kitchen;
