import React from "react";
import "../styles/LogTable.css";
// Chakra Components
import { Badge, Tag } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";

const LogTable = () => {
    return (
        <>
            {/* Log Table */}
            <div className="logTable">
                <Table className="table" variant="simple">
                    <TableCaption>
                        <Badge variant="solid" colorScheme="gray">
                            Space Logs
                        </Badge>
                    </TableCaption>
                    <Thead className="tableHead">
                        <Tr>
                            <Th>Author</Th>
                            <Th>Entry Topic</Th>
                            <Th>Log Entry</Th>
                            <Th>Tags</Th>
                            <Th>Timestamp</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="tableBody">
                        <Tr className="tableRow">
                            <Td>John Doe</Td>
                            <Td>Upgrade</Td>
                            <Td>Installing upgrade at EV1</Td>
                            <Td>
                                <Tag
                                    size="sm"
                                    variant="solid"
                                    colorScheme="teal"
                                >
                                    Upgrade
                                </Tag>
                            </Td>
                            <Td>
                                <div className="date">2 Oct, 2021</div>
                                <div className="date">18:14</div>
                            </Td>
                        </Tr>
                        <Tr className="tableRow">
                            <Td>John Doe</Td>
                            <Td>Upgrade</Td>
                            <Td>Installing upgrade at EV1</Td>
                            <Td>
                                <Tag
                                    size="sm"
                                    variant="solid"
                                    colorScheme="teal"
                                >
                                    Upgrade
                                </Tag>
                            </Td>
                            <Td>
                                <div className="date">2 Oct, 2021</div>
                                <div className="date">18:14</div>
                            </Td>
                        </Tr>
                        <Tr className="tableRow">
                            <Td>John Doe</Td>
                            <Td>Upgrade</Td>
                            <Td>Installing upgrade at EV1</Td>
                            <Td>
                                <Tag
                                    size="sm"
                                    variant="solid"
                                    colorScheme="teal"
                                >
                                    Upgrade
                                </Tag>
                            </Td>
                            <Td>
                                <div className="date">2 Oct, 2021</div>
                                <div className="date">18:14</div>
                            </Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Author</Th>
                            <Th>Entry Topic</Th>
                            <Th>Log Entry</Th>
                            <Th>Tags</Th>
                            <Th>Timestamp</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </div>
        </>
    );
};

export default LogTable;
