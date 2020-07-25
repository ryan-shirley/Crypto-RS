import React from "react"
import { Row, Col } from "react-bootstrap"

const Statistic = ({ title = null, left_title = null, left = [], right_title = null, right = [] }) => {
    return (
        <>
            {title && <h5>{title}</h5>}
            <Row>
                <Col xs={6}>
                    {left_title ? left_title : ''}
                    {left.map((data) => (
                        <p key={data.main + '-' + data.secondary}>
                            <span className="text-warning">{data.main}</span>{" "}
                            {data.secondary}
                        </p>
                    ))}
                </Col>
                {right.length !== 0 ? (
                    <Col xs={6}>
                        {right_title ? right_title : ''}
                        {right.map((data) => (
                        <p key={data.main + '-' + data.secondary}>
                            <span className="text-warning">{data.main}</span>{" "}
                            {data.secondary}
                        </p>
                    ))}
                    </Col>
                ) : ''}
            </Row>
        </>
    )
}

export default Statistic
