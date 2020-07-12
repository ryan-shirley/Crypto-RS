import React from "react"
import Home from "./home"

const protectedRoutes = [
    {
        name: "home",
        exact: true,
        path: "/home",
        main: (props) => <Home {...props} />,
        public: false,
    },
]

export default protectedRoutes
