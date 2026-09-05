import React from "react";

function UserAvatar({ name, size = 38 }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "linear-gradient(135deg,var(--terracotta-400),var(--terracotta-600))",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: `${Math.round(size * 0.44)}px`,
        flexShrink: 0,
      }}
    >
      {initial}
    </span>
  );
}

export default UserAvatar;