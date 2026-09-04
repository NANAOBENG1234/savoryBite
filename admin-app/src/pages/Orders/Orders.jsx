import React from "react";

function Orders() {
  return (
    <>
      <h1 className="page-title">Orders</h1>
      <p className="page-subtitle">Manage incoming orders and their statuses.</p>
      <div className="card card-pad empty-state" style={{ textAlign: "center" }}>
        <div className="empty-state-icon">🛍️</div>
        <p>Orders module coming in a later milestone.</p>
      </div>
    </>
  );
}

export default Orders;
