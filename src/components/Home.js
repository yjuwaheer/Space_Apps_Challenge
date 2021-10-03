import React from "react";
// Chakra components
import { Divider } from "@chakra-ui/react";
// Components
import Nav from "./Nav";
import Filters from "./Filters";
import LogTable from "./LogTable";

const Home = () => {
    return (
        <div className="home">
            <Nav />
            <Filters />
            <Divider />
            <LogTable />
        </div>
    );
};

export default Home;
