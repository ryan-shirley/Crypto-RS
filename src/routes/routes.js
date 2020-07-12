import React from "react"
import Login from "./auth/login"
import Join from "./auth/join"

const routes = [
    { name: "Join", path: "/", exact: true, main: () => <Join /> },
    { name: "Login", path: "/login", exact: true, main: () => <Login /> },
]

export default routes
