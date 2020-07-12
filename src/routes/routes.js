import React from "react"
import Login from "./auth/login"
import Join from "./auth/join"

const routes = [
    { name: "Login", path: "/", exact: true, main: () => <Login /> },
    { name: "Join", path: "/join", exact: true, main: () => <Join /> },
]

export default routes
