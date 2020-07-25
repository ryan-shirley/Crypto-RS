import React from "react"
import axios from "axios"
import PullToRefresh from "../../../components/pull-refresh"
import {
    convertToETH,
    convertHToMH,
    calculatePercentOf,
} from "../../../utilities/conversion"

// Components
import Layout from "../../../components/layout"
import Statistic from "../../../components/stats/statistic"

export default class Ethermine extends React.Component {
    constructor(props) {
        super(props)

        const { pool, currency, address } = props.data

        this.state = {
            endpoint: "https://api.ethermine.org",
            loading: true,
            pool,
            currency: currency.toUpperCase(),
            address,
            statistics: {},
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        console.log("Component mounted")

        this.loadData()
    }

    /**
     * loadData() Retrieve data from Ethermine
     */
    async loadData() {
        // Set loading to true
        this.setState({
            loading: true,
        })
        
        let app = this

        let dashboard = axios.get(
            `${this.state.endpoint}/miner/${this.state.address}/dashboard`
        )
        let currentStats = axios.get(
            `${this.state.endpoint}/miner/${this.state.address}/currentStats`
        )

        Promise.all([dashboard, currentStats]).then((res) => {
            let dashboard = res[0].data.data
            let currentStats = res[1].data.data

            app.setState({
                currentStatistics: currentStats,
                settings: dashboard.settings,
                statistics: dashboard.statistics,
                workers: dashboard.workers,
                loading: false,
            })
        })
    }

    render() {
        let {
            loading,
            currency,
            pool,
            currentStatistics,
            settings,
        } = this.state

        return (
            <Layout title={pool} subTitle={currency} classSlug="pool-view">
                <PullToRefresh loadData={this.loadData}>
                    {loading ? (
                        <p>Loading data..</p>
                    ) : (
                        <>
                            <Statistic
                                left_title={
                                    <h5 className="text-warning">
                                        {convertToETH(currentStatistics.unpaid)}{" "}
                                        <span className="small text-body">
                                            {currency} -{" "}
                                            {calculatePercentOf(
                                                convertToETH(
                                                    currentStatistics.unpaid
                                                ),
                                                convertToETH(settings.minPayout)
                                            )}
                                            %
                                        </span>
                                    </h5>
                                }
                                left={[
                                    {
                                        secondary: "Unpaid balance",
                                    },
                                ]}
                                right_title={
                                    <h5 className="text-warning">
                                        {convertToETH(settings.minPayout)}{" "}
                                        <span className="small text-body">
                                            {currency}
                                        </span>
                                    </h5>
                                }
                                right={[
                                    {
                                        secondary: "Min Payout",
                                    },
                                ]}
                            />

                            <hr />

                            <Statistic
                                left_title={
                                    <h5 className="text-warning">
                                        {convertHToMH(
                                            currentStatistics.currentHashrate
                                        )}{" "}
                                        <span className="small text-body">
                                            MH/s
                                        </span>
                                    </h5>
                                }
                                left={[
                                    {
                                        secondary: "Current hashrate",
                                    },
                                ]}
                                right_title={
                                    <h5 className="text-warning">
                                        {convertHToMH(
                                            currentStatistics.averageHashrate
                                        )}{" "}
                                        <span className="small text-body">
                                            MH/s
                                        </span>
                                    </h5>
                                }
                                right={[
                                    {
                                        secondary: "Average hashrate (24h)",
                                    },
                                ]}
                            />

                            <hr />

                            <Statistic
                                title="Estimated Earnings"
                                left_title={<h6>Day</h6>}
                                left={[
                                    {
                                        main: (
                                            currentStatistics.coinsPerMin *
                                            60 *
                                            24
                                        ).toFixed(6),
                                        secondary: currency,
                                    },
                                    {
                                        main: (
                                            currentStatistics.usdPerMin *
                                            60 *
                                            24
                                        ).toFixed(2),
                                        secondary: "$",
                                    },
                                ]}
                                right_title={<h6>Week</h6>}
                                right={[
                                    {
                                        main: (
                                            currentStatistics.coinsPerMin *
                                            60 *
                                            24 *
                                            7
                                        ).toFixed(6),
                                        secondary: currency,
                                    },
                                    {
                                        main: (
                                            currentStatistics.usdPerMin *
                                            60 *
                                            24 *
                                            7
                                        ).toFixed(2),
                                        secondary: "$",
                                    },
                                ]}
                            />

                            <hr />

                            <Statistic
                                left_title={
                                    <h5 className="text-warning">
                                        {(
                                            convertToETH(settings.minPayout) -
                                            convertToETH(
                                                currentStatistics.unpaid
                                            ) /
                                                (currentStatistics.usdPerMin *
                                                    60 *
                                                    24)
                                        ).toFixed(2)}{" "}
                                        <span className="small text-body">
                                            Days
                                        </span>
                                    </h5>
                                }
                                left={[
                                    {
                                        secondary: "~ Time to next payout",
                                    },
                                ]}
                                right_title={
                                    <h5 className="text-warning">
                                        {(
                                            convertToETH(settings.minPayout) -
                                            convertToETH(
                                                currentStatistics.unpaid
                                            ) /
                                                (currentStatistics.usdPerMin *
                                                    60)
                                        ).toFixed(2)}{" "}
                                        <span className="small text-body">
                                            Hours
                                        </span>
                                    </h5>
                                }
                                right={[
                                    {
                                        secondary: "~ Time to next payout",
                                    },
                                ]}
                            />

                            <hr />

                            <Statistic
                                left_title={
                                    <h5>
                                        {currentStatistics.validShares}
                                    </h5>
                                }
                                left={[
                                    {
                                        secondary: "Valid shares",
                                    },
                                ]}
                                right_title={
                                    <h5>
                                        {currentStatistics.staleShares}
                                    </h5>
                                }
                                right={[
                                    {
                                        secondary: "Stale Shares",
                                    },
                                ]}
                            />
                        </>
                    )}
                </PullToRefresh>
            </Layout>
        )
    }
}
