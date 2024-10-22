import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Cookies from "universal-cookie";

//Context
import { ApiContext } from "./context/ApiContext";
import { CookieContext } from "./context/CookieContext";

//components
import { Navbar } from "./components/Navbar";

//pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { StartPage } from "./pages/StartPage";
import { FriendsPage } from "./pages/FriendsPage";
import { GroupPage } from "./pages/GroupPage";
import { CalendarPage } from "./pages/CalendarPage";
import { PlanPage } from "./pages/PlanPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CalendarGroupPage } from "./pages/CalendarGroupPage";

function App() {
    // const api = "http://localhost:3000/";
    const api = "https://flaker-s.onrender.com/";
    const cookies = new Cookies();
    const location = useLocation();
    const [auth, setAuth] = useState(false);

    const authenticate = async () => {
        console.log("authenticating");
        fetch(api + "authenticate", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                session: cookies.get("session"),
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setAuth(true);
                    console.log("SUCCESS: User authenticated");
                }
                if (!json.success) {
                    setAuth(false);
                    console.log("ERROR: User not authenticated");
                }
            });
    };

    useEffect(() => {
        authenticate();
    }, [location]);

    return (
        <>
            <CookieContext.Provider value={cookies}>
                <ApiContext.Provider value={api}>
                    <Navbar auth={auth}></Navbar>
                    <Routes>
                        <Route
                            path="/"
                            element={<LandingPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/start"
                            element={<StartPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/login"
                            element={
                                <LoginPage
                                    auth={auth}
                                    authenticate={authenticate}
                                />
                            }
                        ></Route>
                        <Route
                            path="/signup"
                            element={<SignupPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/findfriends"
                            element={<FriendsPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/createGroup"
                            element={<GroupPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/calendarGroup"
                            element={<CalendarGroupPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/plans"
                            element={<PlanPage auth={auth} />}
                        ></Route>
                        <Route
                            path="/profile"
                            element={<ProfilePage auth={auth} />}
                        ></Route>
                    </Routes>
                </ApiContext.Provider>
            </CookieContext.Provider>
        </>
    );
}

export default App;
