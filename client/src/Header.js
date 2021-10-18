import React from "react";

const Header = () => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "20px",
        }}
      >
        <img
          src="https://raw.githubusercontent.com/shug-op/handandbrain-chess/master/client/public/hnb_512_transparent.png"
          width="40"
          height="40"
        />
        <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
          trollchess
        </a>
      </div>
    </>
  );
};

export default Header;
