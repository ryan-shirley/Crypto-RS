import React from "react"
import queryString from "query-string"

// Pools
import Hiveon from "./hiveon"
import Ethermine from "./ethermine"

export default class PoolsView extends React.Component {
    constructor(props) {
        super(props)

        this.state = queryString.parse(props.location.search)
    }



    render() {
        const { pool } = this.state

        if(pool.toLowerCase() === 'hiveon')
            return <Hiveon data={this.state} />
        if(pool.toLowerCase() === 'ethermine')
            return <Ethermine data={this.state} />
        
        return 'Unknown pool'
    }
}
