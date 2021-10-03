import React, { useState } from "react";
// Chakra components
import { Divider } from "@chakra-ui/react";
// Components
import Nav from "./Nav";
import Filters from "./Filters";
import LogTable from "./LogTable";

const Home = () => {
    // Filter States
    const [filtering, setFiltering] = useState(false);
    const [time, setTime] = useState("");
    const [author, setAuthor] = useState("");
    const [entryT, setEntryT] = useState("");
    const [logE, setLogE] = useState("");
    const [tags, setTags] = useState("");

    return (
        <div className="home">
            <Nav />
            <Filters
                time={time}
                author={author}
                entryT={entryT}
                logE={logE}
                tags={tags}
                setFiltering={setFiltering}
                setTime={setTime}
                setAuthor={setAuthor}
                setEntryT={setEntryT}
                setLogE={setLogE}
                setTags={setTags}
            />
            <Divider />
            <LogTable
                filtering={filtering}
                time={time}
                author={author}
                entryT={entryT}
                logE={logE}
                tags={tags}
            />
        </div>
    );
};

export default Home;
