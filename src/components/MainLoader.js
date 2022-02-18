import React from "react";

const MainLoader = () => {
  const renderSubLogo = (text) =>
    text.split("").map((letter, index) => <span key={index}>{letter}</span>);

  return (
    <div className="MainLoader">
      <div className="logo">
        <h3>AmanAtg</h3>
        <p>{renderSubLogo("DELTA")}</p>
        <p>{renderSubLogo("EXCHANGE")}</p>
      </div>
      <p className="loading"> Loading...</p>
    </div>
  );
};

export default MainLoader;
