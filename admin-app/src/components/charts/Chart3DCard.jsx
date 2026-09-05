import React from "react";

function Chart3DCard({ title, subtitle, icon, children, actions }) {
  return (
    <section className="card chart-card">
      <header className="card-head chart-card-head">
        <div className="chart-card-title">
          {icon && <span className="chart-card-icon">{icon}</span>}
          <div>
            <h3 className="card-title">{title}</h3>
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </header>
      <div className="chart-card-body">{children}</div>
    </section>
  );
}

export default Chart3DCard;