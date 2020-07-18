import React from "react"
import queryString from "query-string"
import axios from "axios"

// Components
import Layout from "../../../components/layout"
import { Row, Col } from "react-bootstrap"

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
            stats: {},
            previous24hRewards: "",
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")

        if (this.state.pool === "Hiveon") {
            // this.getHiveonWorkers(this.state.address, this.state.currency)
            this.getHiveOnEarnings(this.state.address, this.state.currency)
            this.getHiveOnStats(this.state.address, this.state.currency)
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
     * getHiveOnStats() Returns stats
     */
    getHiveOnStats(address, currency) {
        let endpoint = `https://hiveon.net/api/v1/stats/miner/${address.substring(
            2
        )}/${currency.toUpperCase()}`

        axios
            .get(endpoint)
            .then((res) => {
                this.setState({
                    stats: res.data,
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
                let previous24hRewards = res.data.earningStats.reduce(
                    (acc, stat) => acc + stat.reward,
                    0
                )

                this.setState({
                    earnings: res.data,
                    previous24hRewards,
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
        let {
                currency,
                pool,
                earnings,
                stats,
                previous24hRewards,
            } = this.state,
            {
                expectedReward24H,
                expectedRewardWeek,
                totalPaid,
                totalUnpaid,
            } = earnings

        return (
            <>
                <Layout title={pool} subTitle={currency} classSlug="pool-view">
                    <h5>Unpaid balance</h5>
                    <Row>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">
                                    {totalUnpaid}
                                </span>{" "}
                                {currency} - {(totalUnpaid * 100).toFixed(0)}%
                            </p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <p>
                                <span className="text-warning">-</span> EUR
                            </p>
                        </Col>
                    </Row>

                    <hr />

                    <h5>Expected earnings</h5>
                    <Row>
                        <Col xs={6}>
                            <h6>Day</h6>
                            <p>
                                <span className="text-warning">
                                    {expectedReward24H}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <h6>Week</h6>
                            <p>
                                <span className="text-warning">
                                    {expectedRewardWeek}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                    </Row>

                    <hr />

                    <h5>Previous 24hr earnings</h5>
                    <Row>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">
                                    {previous24hRewards}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <p>
                                <span className="text-warning">-</span> EUR
                            </p>
                        </Col>
                    </Row>

                    <hr />

                    <h5>Total paid</h5>
                    <Row>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">
                                    {totalPaid}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <p>
                                <span className="text-warning">-</span> EUR
                            </p>
                        </Col>
                    </Row>

                    <hr />

                    <h5>Stats</h5>
                    <Row>
                        <Col xs={6}>
                            <h5 className="text-warning">
                                {this.convertToMH(stats.hashrate)} MH/s
                            </h5>
                            <p>Real Time Hashrate</p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <h5 className="text-warning">
                                {this.convertToMH(stats.hashrate24h)} MH/s
                            </h5>
                            <p>Avg. Hashrate over 24h</p>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col xs={6}>
                            <h5 className="text-warning">
                                {this.convertToMH(stats.reportedHashrate)} MH/s
                            </h5>
                            <p>Reported Hashrate</p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <h5 className="text-warning">
                                {this.convertToMH(stats.reportedHashrate24h)}{" "}
                                MH/s
                            </h5>
                            <p>Reported Hashrate over 24h</p>
                        </Col>
                    </Row>

                    <hr />
                    
                    <Row>
                        <Col xs={6}>
                            <h5 className="text-warning">
                                {stats.sharesStatusStats &&
                                    stats.sharesStatusStats.validCount}{" "}
                                -{" "}
                                {stats.sharesStatusStats &&
                                    stats.sharesStatusStats.validRate.toFixed(
                                        2
                                    )}
                                %
                            </h5>
                            <p>Valid shares</p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <h5 className="text-warning">
                                {stats.sharesStatusStats &&
                                    stats.sharesStatusStats.staleCount}
                            </h5>
                            <p>Stale shares</p>
                        </Col>
                    </Row>
                </Layout>
            </>
        )
    }
}
