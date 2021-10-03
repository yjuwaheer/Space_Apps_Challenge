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
    getDocs,
    query,
    orderBy,
    where,
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
// Chakra Modal
import { useDisclosure } from "@chakra-ui/react";
import LogModal from "./LogModal";

const LogTable = ({ filtering, time, author, entryT, logE, tags }) => {
    // States
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const [currentLog, setCurrentLog] = useState("dummyiddata");

    // Chakra modal hooks
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Get all logs to display
    useEffect(() => {
        const getLogsId = () => {
            // By default (newest first)
            const que = query(
                collection(db, "logs"),
                orderBy("timestamp", "desc")
            );
            onSnapshot(que, (snapshot) => {
                // console.log(snapshot.docs);

                snapshot.docChanges().forEach((change) => {
                    console.log(change)
                    // First condition checks that the previously||newly added logs does not have pending writes
                    if (
                        !change.doc.metadata.hasPendingWrites &&
                        change.type === "added"
                    ) {
                        getLogData(change.doc.id, "added");
                    }

                    if (change.type === "modified") {
                        getLogData(change.doc.id, "modified");
                    }
                });
            });
        };

        getLogsId();
    }, []);

    // Get all logs to display
    useEffect(() => {
        setLogs([]);
        filterLogs();
    }, [filtering]);

    // Function to handle filter operations
    const filterLogs = async () => {
        const logsRef = collection(db, "logs");

        const authorClause = where("author", "==", author);
        const entryTClause = where("entryTopic", "==", entryT);
        const logEClause = where("logEntry", "==", logE);
        const tagsClause = where("tags", "array-contains-any", [tags]);

        let timeClause = orderBy("timestamp", "desc");
        if (time === "oldestfirst") {
            timeClause = orderBy("timestamp", "asc");
        }

        // Construct query
        let constructedQuery = query(logsRef, timeClause);
        if (author && !entryT && !logE && !tags) {
            constructedQuery = query(logsRef, authorClause, timeClause);
        }

        if (!author && entryT && !logE && !tags) {
            constructedQuery = query(logsRef, entryTClause, timeClause);
        }

        if (!author && !entryT && logE && !tags) {
            constructedQuery = query(logsRef, logEClause, timeClause);
        }

        if (!author && !entryT && !logE && tags) {
            constructedQuery = query(logsRef, tagsClause, timeClause);
        }

        // Get required docs
        let querySnapshot = await getDocs(constructedQuery);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            getLogData(doc.id, "filter");
        });
    };

    // Fetch all the logs data from firestore
    const getLogData = async (logId, eventType) => {
        const docRef = doc(db, "logs", logId);
        const docSnap = await getDoc(docRef);

        if (eventType === "added") {
            return;
        }
        if (eventType === "filter") {
            setLogs((prev) => [...prev, { id: logId, data: docSnap.data() }]);
        }
        if (eventType === "modified") {
            console.log("modified")
            setLogs((prev) => [{ id: logId, data: docSnap.data() }, ...prev]);
        }
    };

    return (
        <>
            <LogModal isOpen={isOpen} onClose={onClose} currentLog={currentLog} />
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
                        {logs.length === 0 && (
                            <Tr className="tableRow">
                                <Td></Td>
                                <Td></Td>
                                <Td>
                                    <Badge colorScheme="blue">
                                        No logs available.
                                    </Badge>
                                </Td>
                                <Td></Td>
                                <Td></Td>
                            </Tr>
                        )}
                        {logs &&
                            logs.map((log) => (
                                <Tr
                                    className="tableRow"
                                    key={log.id}
                                    onClick={() => {
                                        setCurrentLog(log.id);
                                        onOpen();
                                    }}
                                >
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
