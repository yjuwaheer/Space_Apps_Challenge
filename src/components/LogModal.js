import React, { useState, useEffect } from "react";
import "../styles/LogModal.css";
// Firebase Config
import { db, storage, serverTimestamp } from "../FirebaseConfig";
// Firebase Firestore Library
import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
// Firebase Storage Library
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Chakra Components
import {
    Button,
    InputGroup,
    Input,
    InputRightElement,
    Textarea,
    Text,
    Divider,
    Box,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
// Auth
import { useAuth } from "../contexts/AuthContext";
// Taglist Compoment
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
// Toast
import { toast } from "react-toastify";

const LogModal = ({ isOpen, onClose, currentLog }) => {
    // States
    const [newFields, setNewFields] = useState([]);
    const [entryTopic, setEntryTopic] = useState("");
    const [logEntry, setLogEntry] = useState("");
    const [tags, setTags] = useState([]);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [linkLogs, setLinkLogs] = useState("");
    const [newFieldName, setNewFieldName] = useState("");
    const [newFieldText, setNewFieldText] = useState("");

    const [logData, setLogData] = useState("");
    const [loading, setLoading] = useState(false);

    // useEffect to fetch current log data
    useEffect(() => {
        const getLogData = async () => {
            const docRef = doc(db, "logs", currentLog);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLogData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };

        getLogData();
    }, [currentLog]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
            }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Log</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <>
                        <Text fontSize="md" mb={1}>
                            <span className="compulsory"> * </span>Entry Topic:
                        </Text>
                        <Input
                            variant="filled"
                            placeholder="Entry Topic"
                            mb={3}
                            defaultValue={logData.entryTopic}
                        />
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            <span className="compulsory"> * </span>Log Entry:
                        </Text>
                        <Textarea
                            placeholder="Log Entry"
                            variant="filled"
                            size="md"
                            resize="vertical"
                            mb={3}
                            defaultValue={logData.logEntry}
                        />
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            Tags:
                        </Text>
                        <Box mb={3}>
                            {/* <ReactTagInput
                                readOnly={true}
                                tags={logData !== "" && logData.tags}
                                mb={3}
                            /> */}
                            {/* {logData.tags != null && } */}
                        </Box>
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            Additional Notes:
                        </Text>
                        <Textarea
                            placeholder="Time tags, hardware used etc..."
                            variant="filled"
                            size="md"
                            resize="vertical"
                            mb={3}
                            defaultValue={logData.additionalNotes}
                        />
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            Link Existing Logs:
                        </Text>
                        <Input
                            variant="filled"
                            placeholder="Link Existing Logs"
                            mb={3}
                            defaultValue={logData.linkLogs}
                        />
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            Supporting Files:
                        </Text>
                        <Box mb={3}>
                            {logData.supportingFiles && logData.supportingFiles.map((file) => (
                                <a key={file.fileName} href={file.url} style={{color: "blue"}}>{file.fileName}</a>
                            ))}
                        </Box>
                    </>
                    {/* Additional fields if added by user */}
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="red"
                        variant="outline"
                        mr={3}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LogModal;
