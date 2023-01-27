import React from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = React.useState("");

  return (
    <>
      <Header />
      <Search setSearch={setSearch} />
      <Card search={search} />
      <Footer />
    </>
  );
}

export default App;
