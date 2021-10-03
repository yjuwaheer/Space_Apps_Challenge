// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Authentication
import { AuthProvider } from "./contexts/AuthContext";
// Components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
// Chakra Provider
import { ChakraProvider } from "@chakra-ui/react";
// Toast
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <Router>
                    <AuthProvider>
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />

                            {/* Protected Routes */}
                            <Route path="/home" exact component={Home} />
                        </Switch>
                    </AuthProvider>
                </Router>

                {/* Toast notification container */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </ChakraProvider>
    );
}

export default App;
