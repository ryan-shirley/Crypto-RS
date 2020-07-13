import React from "react"
import queryString from "query-string"
import axios from "axios"

// Components
import { Container, Row, Col, Card } from "react-bootstrap"

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
                <Container fluid>
                    <div className="text-center">
                        <h1>{pool}</h1>
                        <p className="text-uppercase">{currency}</p>
                    </div>

                    <h3>Unpaid balance</h3>
                    <Row>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">
                                    {totalUnpaid}
                                </span>{" "}
                                {currency} - {(totalUnpaid * 100).toFixed(0)}%
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">-</span> EUR
                            </p>
                        </Col>
                    </Row>

                    <h3>Expected earnings</h3>
                    <Row>
                        <Col xs={6}>
                            <h4>Day</h4>
                            <p>
                                <span className="text-warning">
                                    {expectedReward24H}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                        <Col xs={6}>
                            <h4>Week</h4>
                            <p>
                                <span className="text-warning">
                                    {expectedRewardWeek}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                    </Row>

                    <h3>Total paid</h3>
                    <Row>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">
                                    {totalPaid}
                                </span>{" "}
                                {currency}
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p>
                                <span className="text-warning">-</span> EUR
                            </p>
                        </Col>
                    </Row>

                    <h3>Workers</h3>
                    {Object.keys(workers).map((workerName) => (
                        <Card key={workerName} className="mb-3">
                            <Card.Header>
                                {workerName} -{" "}
                                {workers[workerName].online
                                    ? "Online"
                                    : "Offline"}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Row>
                                        <Col xs={6}>
                                            <h4>
                                                {this.convertToMH(
                                                    workers[workerName].hashrate
                                                )}{" "}
                                                MH/s
                                            </h4>
                                            <p>Real Time Hashrate</p>
                                        </Col>
                                        <Col xs={6}>
                                            <h5>
                                                {this.convertToMH(
                                                    workers[workerName]
                                                        .hashrate24h
                                                )}{" "}
                                                MH/s
                                            </h5>
                                            <p>Avg. Hashrate over 24h</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <h5>
                                                {this.convertToMH(
                                                    workers[workerName]
                                                        .reportedHashrate
                                                )}{" "}
                                                MH/s
                                            </h5>
                                            <p>Reported Hashrate</p>
                                        </Col>
                                        <Col xs={6}>
                                            <h5>
                                                {this.convertToMH(
                                                    workers[workerName]
                                                        .reportedHashrate24h
                                                )}{" "}
                                                MH/s
                                            </h5>
                                            <p>Reported Hashrate over 24h</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <h5>
                                                {
                                                    workers[workerName]
                                                        .sharesStatusStats
                                                        .validCount
                                                }{" "}
                                                -{" "}
                                                {workers[
                                                    workerName
                                                ].sharesStatusStats.validRate.toFixed(
                                                    2
                                                )}
                                                %
                                            </h5>
                                            <p>Valid shares</p>
                                        </Col>
                                        <Col xs={6}>
                                            <h5>
                                                {this.convertToMH(
                                                    workers[workerName]
                                                        .sharesStatusStats
                                                        .staleCount
                                                )}
                                            </h5>
                                            <p>Stale shares</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}

                    <h3>Mining Address</h3>
                    <p className="text-wrap">{address}</p>
                </Container>
            </>
        )
    }
}
