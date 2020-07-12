import React, { useState, useContext } from "react"
import { AuthContext } from "../../../components/app/App"
import * as firebase from "firebase"
import { withRouter, Redirect } from "react-router-dom"

const Join = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setErrors] = useState("")

    const Auth = useContext(AuthContext)
    const { isLoggedIn } = Auth

    const handleForm = (e) => {
        e.preventDefault()

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        if (res.user) {
                            Auth.setLoggedIn(true)

                            const { user } = res,
                                { uid, displayName } = user

                            localStorage.setItem("UID", uid)
                            localStorage.setItem("displayName", displayName)
                        }

                        history.push("/home")
                    })
                    .catch((e) => {
                        setErrors(e.message)
                    })
            })
    }

    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        Auth.setLoggedIn(true)
                        history.push("/home")

                        const { user } = result,
                            { uid, displayName } = user

                        localStorage.setItem("UID", uid)
                        localStorage.setItem("displayName", displayName)
                    })
                    .catch((e) => setErrors(e.message))
            })
    }

    if (isLoggedIn) {
        return <Redirect to="/home" />
    } else {
        return (
            <div>
                <h1>Join</h1>
                <form onSubmit={(e) => handleForm(e)}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        type="password"
                        placeholder="password"
                    />
                    <hr />
                    <button
                        onClick={() => handleGoogleLogin()}
                        className="googleBtn"
                        type="button"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                        />
                        Join With Google
                    </button>

                    <button type="submit">Login</button>

                    <span>{error}</span>
                </form>
            </div>
        )
    }
}

export default withRouter(Join)
