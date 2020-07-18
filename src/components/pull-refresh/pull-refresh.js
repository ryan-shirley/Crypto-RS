import React from "react"
import pullToRefresh from "mobile-pull-to-refresh"

// Material 2
import ptrAnimatesMaterial2 from "mobile-pull-to-refresh/dist/styles/material2/animates"
import "mobile-pull-to-refresh/dist/styles/material2/style.css"

export default class PullToRefresh extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loadData: props.loadData,
        }
    }

    /**
     * componentDidMount() Retrieve user details from cloud firestore
     */
    componentDidMount() {
        let app = this

        pullToRefresh({
            container: document.querySelector(".pull-to-refresh-material2"),
            animates: ptrAnimatesMaterial2,
            threshold: 200,

            refresh() {
                return new Promise(async (resolve) => {
                    console.log("Refreshing data")

                    await app.state.loadData()

                    resolve()
                })
            },
        })
    }

    render() {
        return (
            <div className="pull-to-refresh-material2">
                <div className="pull-to-refresh-material2__control">
                    <svg
                        className="pull-to-refresh-material2__icon"
                        fill="#4285f4"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>

                    <svg
                        className="pull-to-refresh-material2__spinner"
                        width="24"
                        height="24"
                        viewBox="25 25 50 50"
                    >
                        <circle
                            className="pull-to-refresh-material2__path pull-to-refresh-material2__path--colorful"
                            cx="50"
                            cy="50"
                            r="20"
                            fill="none"
                            strokeWidth="4"
                            strokeMiterlimit="10"
                        />
                    </svg>
                </div>

                {this.props.children}
            </div>
        )
    }
}
