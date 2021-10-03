import React from "react";
import "../styles/Nav.css";
// Chakra components
import { Image, Button, Tooltip } from "@chakra-ui/react";
// Chakra Modal
import {
    useDisclosure,
} from "@chakra-ui/react";
import AddModal from "./AddModal";
// Auth
import { useAuth } from "../contexts/AuthContext";
// Routes
import { Link, useHistory } from "react-router-dom";
// Notification toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Nav = () => {
    // Auth
    const { logout } = useAuth();

    // Routes
    const history = useHistory();

    // Chakra modal hooks
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Handling logout functionality
    const handleLogOut = async () => {
        try {
            await logout();
            history.push("/");
        } catch (error) {
            toast.error("Failed to Log Out.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <AddModal isOpen={isOpen} onClose={onClose} />
            {/* Navbar */}
            <div className="nav">
                <Link to="/home" className="logo">
                    <Image
                        boxSize="40px"
                        objectFit="cover"
                        src="Logo.png"
                        alt="Logo"
                        className="logoImage"
                    />
                    <div className="logoText">Space Log</div>
                </Link>
                <div className="right">
                    <Tooltip
                        hasArrow
                        label="New Log"
                        bg="gray.300"
                        color="gray.600"
                    >
                        <Button
                            className="add"
                            colorScheme="blackAlpha"
                            variant="solid"
                            onClick={onOpen}
                        >
                            <span className="material-icons material-icons-outlined">
                                add
                            </span>
                        </Button>
                    </Tooltip>

                    <Button
                        className="account"
                        colorScheme="gray"
                        variant="outline"
                    >
                        <span className="material-icons material-icons-outlined">
                            account_circle
                        </span>
                    </Button>

                    <Button
                        className="logout"
                        colorScheme="red"
                        variant="ghost"
                        onClick={handleLogOut}
                    >
                        <span className="material-icons material-icons-outlined">
                            logout
                        </span>
                        Log Out
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Nav;
