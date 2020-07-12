import React from "react"
import Home from "./home"
import Pools from "./pools"
import PoolsView from "./pools/view"

const protectedRoutes = [
    {
        name: "home",
        exact: true,
        path: "/home",
        main: (props) => <Home {...props} />,
        public: false,
    },
    {
        name: "pools",
        exact: true,
        path: "/pools",
        main: (props) => <Pools {...props} />,
        public: false,
    },
    {
        name: "pools.view",
        exact: true,
        path: "/pools/view",
        main: (props) => <PoolsView {...props} />,
        public: false,
    },
]

export default protectedRoutes
