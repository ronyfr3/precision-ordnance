import React, { useState, useEffect } from "react";

const Message = ({ message, color }) => {
  const [msgError, setMsgError] = useState(message);

  useEffect(() => {
    setTimeout(() => {
      setMsgError("");
    }, 3000);
  }, []);

  return (
    <div
      style={{
        backgroundColor: color,
        padding: msgError ? "1rem 2rem" : "",
        color: "#fff",
        fontSize: "1.8rem",
        borderRadius: "3px",
        textAlign: "center",
        marginBottom: "2rem",
        fontWeight: "400",
      }}
    >
      {msgError}
    </div>
  );
};

export default Message;
