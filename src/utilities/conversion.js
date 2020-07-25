/**
 * convertHToMH() Converts H/s to MH/s
 */
export const convertHToMH = (value) => {
    return Number((value / 1000000).toFixed(2))
}

/**
 * convertToETH() Convert data to correct eth
 */
export const convertToETH = (value) => {
    return Number((value / 1000000000000000000).toFixed(5))
}

/**
 * calculatePercentOf() Return percentage of a number
 */
export const calculatePercentOf = (per, num) => {
    return Number ((((num - per) / num) * 100).toFixed(0))
}