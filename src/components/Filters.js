import React, { useState } from "react";
import "../styles/Filters.css";
// Chakra Components
import {
    Heading,
    Select,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
} from "@chakra-ui/react";

/*
Filter by 
-time
-entry topic (log name)
-author
*/
const Filters = ({
    setFiltering,
    setTime,
    setAuthor,
    setEntryT,
    setLogE,
    setTags,
}) => {
    // States
    const [collapseFilters, setCollapseFilters] = useState(false);

    return (
        <div className="filters">
            <Heading as="h2" size="md" className="filterText">
                FILTER BY:
                <Button
                    size="sm"
                    colorScheme="blackAlpha"
                    variant="outline"
                    ml={2}
                    onClick={() => {
                        setCollapseFilters((prev) => !prev);
                    }}
                >
                    <span className="material-icons material-icons-outlined">
                        {collapseFilters ? "expand_more" : "expand_less"}
                    </span>
                </Button>
            </Heading>

            {!collapseFilters && (
                <>
                    <div className="attributes">
                        <div className="time">
                            <Select
                                placeholder="Time"
                                onChange={(e) => {
                                    setTime(e.target.value);
                                }}
                            >
                                <option value="newestfirst">
                                    Newest First
                                </option>
                                <option value="oldestfirst">
                                    Oldest First
                                </option>
                            </Select>
                        </div>
                        <div className="author">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={
                                        <span className="material-icons material-icons-outlined">
                                            person
                                        </span>
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Author"
                                    onChange={(e) => {
                                        setAuthor(e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </div>
                        <div className="entryTopic">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={
                                        <span className="material-icons material-icons-outlined">
                                            title
                                        </span>
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Entry Topic"
                                    onChange={(e) => {
                                        setEntryT(e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </div>
                        <div className="entryTopic">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={
                                        <span className="material-icons material-icons-outlined">
                                            manage_search
                                        </span>
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Log Entry"
                                    onChange={(e) => {
                                        setLogE(e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </div>
                        <div className="tags">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={
                                        <span className="material-icons material-icons-outlined">
                                            tag
                                        </span>
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Tags"
                                    onChange={(e) => {
                                        setTags(e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <Button
                        colorScheme="blackAlpha"
                        variant="outline"
                        mt={2}
                        onClick={() => setFiltering((prev) => !prev)}
                    >
                        <span className="material-icons material-icons-outlined">
                            sort
                        </span>
                        Filter
                    </Button>
                </>
            )}
        </div>
    );
};

export default Filters;
