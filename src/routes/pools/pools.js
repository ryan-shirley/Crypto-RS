import React from "react"
import { Link } from "react-router-dom"
import { db } from "../../components/app/App"

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
            <>
                <h1>Mining Pools</h1>
                <p>Together or solo?</p>
                <ul>
                    {this.state.pools.map((pool) => (
                        <li><Link to={`/pools/view?pool=${pool.name}&currency=${pool.currency}&address=${pool.address}`}>{pool.name} - {pool.currency}</Link></li>
                    ))}
                </ul>
            </>
        )
    }
}
