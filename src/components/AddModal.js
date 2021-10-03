import React, { useState, useEffect } from "react";
import "../styles/AddModal.css";
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

const AddModal = ({ isOpen, onClose }) => {
    // Auth
    const { currentUser } = useAuth();

    // States
    const [newFields, setNewFields] = useState([]);
    const [entryTopic, setEntryTopic] = useState("");
    const [logEntry, setLogEntry] = useState("");
    const [tags, setTags] = useState([]);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [linkLogs, setLinkLogs] = useState("");
    const [newFieldName, setNewFieldName] = useState("");
    const [newFieldText, setNewFieldText] = useState("");

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    // useEffect to get current user name
    useEffect(() => {
        const getUsername = async () => {
            const usersRef = collection(db, "users");
            const que = query(
                usersRef,
                where("email", "==", currentUser.email)
            );

            const querySnapshot = await getDocs(que);
            querySnapshot.forEach((query) => {
                // doc.data() is never undefined for query doc snapshots
                setUsername(query.data().username);
            });
        };
        currentUser && getUsername();
    }, [currentUser]);

    // Function to handle adding new field
    const handleAddNewField = () => {
        let copyNewFields = newFields;
        let alreadyExist = false;

        // Check if new field already exists
        if (copyNewFields.length !== 0) {
            copyNewFields.forEach((field) => {
                if (field.name === newFieldName) {
                    toast.error("Field already exists.", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    alreadyExist = true;
                }
            });
            // Return if field already been created
            if (alreadyExist) {
                return;
            }
        }

        // Check if new fields are empty
        if (!newFieldName || !newFieldText) {
            toast.error("New fields cannot be blank.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        // Update view
        copyNewFields.push({ name: newFieldName, text: newFieldText });
        setNewFields(copyNewFields);

        // Reset new fields
        setNewFieldName("");
        setNewFieldText("");
    };

    // Function to handle the deletion of an user added field
    const handleDeleteAddedField = (fieldName) => {
        let copyNewFields = newFields;

        copyNewFields = copyNewFields.filter(
            (field) => field.name !== fieldName
        );

        setNewFields(copyNewFields);
    };

    // Function to reset the log form completely (When modal is closed / Log recorder)
    const resetFields = () => {
        setNewFields([]);
        setNewFieldName("");
        setNewFieldText("");

        setEntryTopic("");
        setLogEntry("");
        setTags([]);
        setAdditionalNotes("");
        setLinkLogs("");
    };

    // Function to create log entry and save to database after approval from user
    const createLogEntry = async () => {
        // Check mandatory fields
        if (!entryTopic || !logEntry) {
            toast.error("Mandatory fields cannot be left blank.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Set loading to true
        setLoading(true);

        // Save log to firestore
        const docRef = await addDoc(collection(db, "logs"), {
            author: username,
            timestamp: serverTimestamp(),
            entryTopic: entryTopic,
            logEntry: logEntry,
            tags: tags,
            additionalNotes: additionalNotes,
            linkLogs: linkLogs,
            additionalFields: newFields,
        });

        // Files upload if any
        let fileInputRef = document.getElementById("supportingFiles");
        if (fileInputRef.files.length === 0) {
            // "No supporting files."

            toast.success("Log successfully recorded.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            // "Supporting files."
            // console.log(docRef.path.split("/")[1]);
            const filesDownloadUrl = await handleSupportingFiles(
                docRef.path.split("/")[1]
            );
            await updateDocSupportingFiles(
                docRef.path.split("/")[1],
                filesDownloadUrl
            );

            toast.success("Log successfully recorded.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        // Set loading back to false
        setLoading(false);
        resetFields();
    };

    // Function to handle upload of supporting files
    const handleSupportingFiles = async (documentId) => {
        const filesDownloadUrl = [];
        let fileInputRef = document.getElementById("supportingFiles");

        // Cycle through the files
        for (let index = 0; index < fileInputRef.files.length; index++) {
            let fileRef = ref(
                storage,
                `logs/${documentId}/${index}_${fileInputRef.files[index].name}`
            );

            try {
                // console.log("Uploaded supporting file " + index);
                await uploadBytes(fileRef, fileInputRef.files[index]);

                // Gets the download URL for each successful supporting doc uploaded
                let url = await getDownloadURL(fileRef);
                filesDownloadUrl.push({
                    fileName: fileInputRef.files[index].name,
                    url: url,
                });
            } catch (error) {
                toast.error(
                    "Error occurred while uploading supporting files.",
                    {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );
            }
        }

        return filesDownloadUrl;
    };

    // Function to update document to point to supporting files if present
    const updateDocSupportingFiles = async (documentId, filesDownloadUrl) => {
        const docRef = doc(db, "logs", documentId);

        // Set the download urls for the supporting files
        await updateDoc(docRef, {
            supportingFiles: filesDownloadUrl,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                resetFields();
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
                            value={entryTopic}
                            onChange={(e) => setEntryTopic(e.target.value)}
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
                            value={logEntry}
                            onChange={(e) => setLogEntry(e.target.value)}
                        />
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            Tags:
                        </Text>
                        <Box mb={3}>
                            <ReactTagInput
                                tags={tags}
                                onChange={(newTags) => setTags(newTags)}
                                mb={3}
                            />
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
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
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
                            value={linkLogs}
                            onChange={(e) => setLinkLogs(e.target.value)}
                        />
                    </>
                    <>
                        <Text fontSize="md" mb={1}>
                            Supporting Files:
                        </Text>
                        <Input
                            type="file"
                            id="supportingFiles"
                            mb={3}
                            multiple
                        />
                    </>
                    {/* Additional fields if added by user */}
                    {newFields &&
                        newFields.map((newField) => (
                            <div key={newField.name}>
                                <Text fontSize="md" mb={1}>
                                    {newField.name}:
                                </Text>
                                <InputGroup size="md">
                                    <Input
                                        disabled={true}
                                        value={newField.text}
                                        mb={3}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteAddedField(
                                                    newField.name
                                                )
                                            }
                                        >
                                            <span className="material-icons material-icons-outlined">
                                                delete
                                            </span>
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </div>
                        ))}
                    {/* Ask for Additional Fields  */}
                    <Divider orientation="horizontal" />
                    <Input
                        pr="4.5rem"
                        placeholder="New Field Name"
                        mt={5}
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                    />
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            placeholder="New Field Text"
                            value={newFieldText}
                            onChange={(e) => setNewFieldText(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleAddNewField}
                            >
                                <span className="material-icons material-icons-outlined">
                                    add_circle_outline
                                </span>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={3}
                        onClick={() => {
                            resetFields();
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="green"
                        variant="outline"
                        onClick={createLogEntry}
                        isLoading={loading}
                    >
                        Approve
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddModal;
