import React from "react"
import { Link } from "react-router-dom"

// Setup Firebase - TODO: Setup firebase initialize file like Syntactic
import { db } from "../../components/app/App"

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                name: localStorage.getItem("displayName"),
                uid: localStorage.getItem("UID"),
                HiveOSToken: "",
            },
            pools: []
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")
        let app = this
        const { uid } = this.state.user

        // Retrieve HiveOS Token
        var docRef = db.collection("Users").doc(uid)
        docRef
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    app.setState({
                        user: {
                            ...app.state.user,
                            HiveOSToken: doc.data().HiveOSToken,
                        },
                    })
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error)
            })

        // Pools
        db.collection("Pools")
            .where("userID", "==", uid)
            .get()
            .then(function (querySnapshot) {
                let pools = []
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    pools.push(doc.data())
                })

                app.setState({
                    pools
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error)
            })
    }

    render() {
        return (
            <>
                <h1>Home {this.state.user.name}</h1>
                <Link to="/pools">Pools</Link>
            </>
        )
    }
}
