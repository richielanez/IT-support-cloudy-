import React from "react";

const StatusBadge = ({ status }) => {
  const cls =
    status === "Open"
      ? "status-pill status-open"
      : status === "Pending"
      ? "status-pill status-pending"
      : "status-pill status-closed";

  return <span className={cls}>{status}</span>;
};

export default StatusBadge;
