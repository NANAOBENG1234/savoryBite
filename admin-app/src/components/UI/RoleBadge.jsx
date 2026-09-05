import React from "react";

const ROLE_CLASS = {
  admin: "badge-available",
  staff: "badge-preparing",
  customer: "badge-confirmed",
};

function RoleBadge({ role }) {
  return (
    <span className={`badge ${ROLE_CLASS[role] || "badge-confirmed"}`} style={{ textTransform: "capitalize" }}>
      {role || "customer"}
    </span>
  );
}

export default RoleBadge;