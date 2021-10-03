import React from "react";
import "../styles/Filters.css";
// Chakra Components
import {
    Heading,
    Select,
    InputGroup,
    InputLeftElement,
    Input,
} from "@chakra-ui/react";

/*
Filter by 
-time
-entry topic (log name)
-author
*/
const Filters = () => {
    return (
        <div className="filters">
            <Heading as="h2" size="md" className="filterText">
                FILTER BY
            </Heading>
            
            <div className="attributes">
                <div className="time">
                    <Select placeholder="Time">
                        <option value="newestfirst">Newest First</option>
                        <option value="oldestfirst">Oldest First</option>
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
                        <Input type="tel" placeholder="Author" />
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
                        <Input type="tel" placeholder="Entry Topic" />
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
                        <Input type="tel" placeholder="Log Entry" />
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
                        <Input type="tel" placeholder="Tags" />
                    </InputGroup>
                </div>
            </div>
        </div>
    );
};

export default Filters;
