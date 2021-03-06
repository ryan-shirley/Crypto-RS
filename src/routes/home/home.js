import React from "react"
import { Link } from "react-router-dom"
// import { db } from "../../components/app/App"

// Components
import Layout from "../../components/layout"
import { Card } from "react-bootstrap"

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                name: localStorage.getItem("displayName"),
                uid: localStorage.getItem("UID"),
                HiveOSToken: "",
            },
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")
        // let app = this
        // const { uid } = this.state.user

        // // Retrieve HiveOS Token
        // var docRef = db.collection("Users").doc(uid)
        // docRef
        //     .get()
        //     .then(function (doc) {
        //         if (doc.exists) {
        //             app.setState({
        //                 user: {
        //                     ...app.state.user,
        //                     HiveOSToken: doc.data().HiveOSToken,
        //                 },
        //             })
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log("Error getting document:", error)
        //     })
    }

    render() {
        return (
            <>
                <Layout
                    title={"Welcome " + this.state.user.name}
                    subTitle="The future of crypto"
                    classSlug="home"
                >
                    <Card body>
                        <Link to="/pools">Pools</Link>
                    </Card>
                </Layout>
            </>
        )
    }
}
