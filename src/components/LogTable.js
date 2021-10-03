import React, { useEffect, useState } from "react";
import "../styles/LogTable.css";
// Firebase Config
import { db } from "../FirebaseConfig";
// Firebase Firestore Library
import {
    collection,
    onSnapshot,
    doc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
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
    // States
    const [logs, setLogs] = useState([]);

    // Get all logs to display
    useEffect(() => {
        const getLogsId = () => {
            onSnapshot(collection(db, "logs"), (snapshot) => {
                // console.log(snapshot.docs);

                snapshot.docChanges().forEach((change) => {
                    // First condition checks that the previously||newly added logs does not have pending writes
                    if (!change.doc.metadata.hasPendingWrites || change.type === "modified") {
                        getLogData(change.doc.id);
                    }
                });
            });
        };

        getLogsId();
    }, []);

    // Fetch all the logs data from firestore
    const getLogData = async (logId) => {
        const docRef = doc(db, "logs", logId);
        const docSnap = await getDoc(docRef);

        setLogs((prev) => [...prev, { id: logId, data: docSnap.data() }]);
    };

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
                        {logs &&
                            logs.map((log) => (
                                <Tr className="tableRow" key={log.id}>
                                    <Td>{log.data.author}</Td>
                                    <Td>{log.data.entryTopic}</Td>
                                    <Td>{log.data.logEntry}</Td>
                                    <Td>
                                        {log.data.tags &&
                                            log.data.tags.map((tag) => (
                                                <Tag
                                                    size="sm"
                                                    variant="solid"
                                                    colorScheme="teal"
                                                    key={tag}
                                                >
                                                    {tag}
                                                </Tag>
                                            ))}
                                    </Td>
                                    <Td>
                                        <div className="dateTime">
                                            {log.data.timestamp &&
                                                log.data.timestamp
                                                    .toDate()
                                                    .toLocaleString()}
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
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
