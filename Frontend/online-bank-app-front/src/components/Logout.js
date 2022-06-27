import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigator = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigator("/");
  }, []);
  return <div></div>;
};

export default Logout;
