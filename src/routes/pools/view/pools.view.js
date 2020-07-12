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
            workers: {},
            earnings: {},
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")

        if (this.state.pool === "Hiveon") {
            this.getHiveonWorkers(this.state.address, this.state.currency)
            this.getHiveOnEarnings(this.state.address, this.state.currency)
        }
    }

    /**
     * getHiveonWorkers() Returns list of workes
     */
    getHiveonWorkers(address, currency) {
        let endpoint = `https://hiveon.net/api/v1/stats/miner/${address.substring(
            2
        )}/${currency.toUpperCase()}/workers`

        axios
            .get(endpoint)
            .then((res) => {
                this.setState({
                    workers: res.data.workers,
                })
            })
            .catch((err) => {
                console.log(err.response.message)
            })
    }

    /**
     * getHiveOnEarnings() Returns earnings stats
     */
    getHiveOnEarnings(address, currency) {
        let endpoint = `https://hiveon.net/api/v1/stats/miner/${address.substring(
            2
        )}/${currency.toUpperCase()}/billing`

        axios
            .get(endpoint)
            .then((res) => {
                this.setState({
                    earnings: res.data,
                })
            })
            .catch((err) => {
                console.log(err.response.message)
            })
    }

    /**
     * getHiveOnEarnings() Returns earnings stats
     */
    convertToMH(value) {
        return (value / 1000000).toFixed(2)
    }

    render() {
        let { currency, address, pool, earnings, workers } = this.state,
            {
                expectedReward24H,
                expectedRewardWeek,
                totalPaid,
                totalUnpaid,
            } = earnings

        return (
            <>
                <h1>{pool}</h1>
                <p>{currency}</p>

                <h3>Unpaid balance</h3>
                <div className="row">
                    <div className="col-6">
                        <p>
                            <span className="text-warning">{totalUnpaid}</span>{" "}
                            {currency}
                        </p>
                    </div>
                    <div className="col-6">
                        <p>
                            <span className="text-warning">-</span> EUR
                        </p>
                    </div>
                </div>

                <h3>Expected earnings</h3>
                <div className="row">
                    <div className="col-6">
                        <h4>Day</h4>
                        <p>
                            <span className="text-warning">
                                {expectedReward24H}
                            </span>{" "}
                            {currency}
                        </p>
                    </div>
                    <div className="col-6">
                        <h4>Week</h4>
                        <p>
                            <span className="text-warning">
                                {expectedRewardWeek}
                            </span>{" "}
                            {currency}
                        </p>
                    </div>
                </div>

                <h3>Total paid</h3>
                <div className="row">
                    <div className="col-6">
                        <p>
                            <span className="text-warning">{totalPaid}</span>{" "}
                            {currency}
                        </p>
                    </div>
                    <div className="col-6">
                        <p>
                            <span className="text-warning">-</span> EUR
                        </p>
                    </div>
                </div>

                <h3>Workers</h3>
                {Object.keys(workers).map((workerName) => (
                    <div key={workerName}>
                        <p>{workerName}</p>
                        <p>
                            Online: {workers[workerName].online ? "Yes" : "No"}
                        </p>
                        <p>
                            Real Time Hashrate:{" "}
                            {this.convertToMH(workers[workerName].hashrate)}{" "}
                            MH/s
                        </p>
                        <p>
                            Avg. Hashrate over 24h:{" "}
                            {this.convertToMH(workers[workerName].hashrate24h)}{" "}
                            MH/s
                        </p>
                        <p>
                            Reported Hashrate:{" "}
                            {this.convertToMH(
                                workers[workerName].reportedHashrate
                            )}{" "}
                            MH/s
                        </p>
                        <p>
                            Reported Hashrate over 24h:{" "}
                            {this.convertToMH(
                                workers[workerName].reportedHashrate24h
                            )}{" "}
                            MH/s
                        </p>
                        <p>
                            Valid shares:{" "}
                            {workers[workerName].sharesStatusStats.validCount} -{" "}
                            {workers[
                                workerName
                            ].sharesStatusStats.validRate.toFixed(2)}
                            %
                        </p>
                        <p>
                            Stale shares:{" "}
                            {workers[workerName].sharesStatusStats.staleCount}
                        </p>
                    </div>
                ))}

                <h3>Mining Address</h3>
                <div className="row">
                    <div className="col">
                        <p>{address}</p>
                    </div>
                </div>
            </>
        )
    }
}
