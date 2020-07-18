import React from "react"
import { Link } from "react-router-dom"
import { db } from "../../components/app/App"

// Components
import Layout from "../../components/layout"
import { Card } from "react-bootstrap"

export default class Pools extends React.Component {
    constructor() {
        super()

        this.state = {
            pools: [],
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")
        let app = this
        const uid = localStorage.getItem("UID")

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
                    pools,
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error)
            })
    }

    render() {
        return (
            <Layout title="Mining Pools" subTitle="Together or solo?">
                {this.state.pools.map((pool) => (
                    <Card body>
                        <Link
                            to={`/pools/view?pool=${pool.name}&currency=${pool.currency}&address=${pool.address}`}
                        >
                            {pool.name} - {pool.currency}
                        </Link>
                    </Card>
                ))}
            </Layout>
        )
    }
}
