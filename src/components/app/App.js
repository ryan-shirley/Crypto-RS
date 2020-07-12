import React, { useState, useEffect } from "react"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import routes from "../../routes/routes.js"
import Header from "../header"
import "./styles.css"

import NoMatch404 from "../../routes/404"

import protectedRoutes from "../../routes/protectedRoutes"
import * as firebase from "firebase"
import config from "../../config"

import ProtectedRouteHoc from "../../routes/ProtectedRouteHoc"

firebase.initializeApp(config.firebaseConfig)

/**
 * App() Main used for routing and general layout
 */
function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isBusy, setBusy] = useState(true)

    function readSession() {
        const user = window.sessionStorage.getItem(
            `firebase:authUser:${config.firebaseConfig.apiKey}:[DEFAULT]`
        )
        if (user) setLoggedIn(true)

        setBusy(false)
    }
    useEffect(() => {
        readSession()
    }, [])

    if (isBusy) {
        return ""
    } else {
        return (
            <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
                Is logged in? {JSON.stringify(isLoggedIn)}
                <div className="App">
                    <Router>
                        <Header isLoggedIn={isLoggedIn} />

                        <Switch>
                            {protectedRoutes.map((route) => (
                                <ProtectedRouteHoc
                                    key={route.path}
                                    isLoggedIn={isLoggedIn}
                                    path={route.path}
                                    component={route.main}
                                    exact={route.exact}
                                    public={route.public}
                                />
                            ))}
                            {routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.main}
                                />
                            ))}
                            <Route component={NoMatch404} />
                        </Switch>
                    </Router>
                </div>
            </AuthContext.Provider>
        )
    }
}

export default App
export const AuthContext = React.createContext(null)
