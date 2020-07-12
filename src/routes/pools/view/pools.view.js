import React from "react"
import queryString from "query-string"
import axios from "axios"

export default class PoolsView extends React.Component {
    constructor(props) {
        super(props)

        const { pool, currency, address } = queryString.parse(
            props.location.search
        )

        this.state = {
            pool,
            currency,
            address,
            workers: []
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")

        if(this.state.pool === 'Hiveon') {
            this.getHiveonWorkers(this.state.address, this.state.currency)
        }
    }

    /**
     * getHiveonWorkers() Returns list of workes
     */
    getHiveonWorkers(address, currency) {
        let endpoint = `https://hiveon.net/api/v1/stats/miner/${address.substring(2)}/${currency.toUpperCase()}/workers`

        axios
            .get(endpoint)
            .then(res => {
                this.setState({
                    workers: res.data.workers
                })
            })
            .catch(err => {
                console.log(err.response.message)
            })
    }

    render() {
        return (
            <>
                <h1>Mining Pools</h1>
                <p>Together or solo?</p>
            </>
        )
    }
}
