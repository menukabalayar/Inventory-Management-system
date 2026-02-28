import React from "react";
import Header from "../../components/Header";

export default function MainPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <h2>Welcome {user?.name}</h2>
    </>
  );
}