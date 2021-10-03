import React from "react";
import Nav from "./Nav";
import Filters from "./Filters";
import LogTable from "./LogTable";

const Home = () => {
    return (
        <div className="home">
            <Nav />
            <Filters />
            <LogTable />
        </div>
    );
};

export default Home;
