import React from "react"
import ReportsView from "./reports"

const protectedRoutes = [
    {
        name: "reports",
        exact: true,
        path: "/reports",
        main: (props) => <ReportsView {...props} />,
        public: false,
    },
]

export default protectedRoutes
