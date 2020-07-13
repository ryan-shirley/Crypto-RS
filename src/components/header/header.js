import React, { useContext } from "react"
import routes from "../../routes/routes"
import { AuthContext } from "../app/App"
import * as firebase from "firebase"
import { withRouter, Link } from "react-router-dom"

const Header = ({ history }) => {
    const Auth = useContext(AuthContext)
    const { isLoggedIn } = Auth

    const signOut = async () => {
        console.log("Logging user out")

        await firebase.auth().signOut()

        localStorage.removeItem("UID")
        localStorage.removeItem("displayName")

        history.push("/")
    }

    return (
        <ul className="nav">
            {!isLoggedIn && routes.map((route, i) => (
                <li key={i}>
                    <Link to={route.path}>{route.name}</Link>
                </li>
            ))}
            {isLoggedIn && (
                <li>
                    <Link to="/home">Home</Link>
                </li>
            )}
            <li onClick={signOut}>Logout</li>
        </ul>
    )
}

export default withRouter(Header)
