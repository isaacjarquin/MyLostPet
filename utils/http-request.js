const bodyParamsBuilder = ({ type, autonomousComunity, province }) => {
    if (type !== "" && autonomousComunity !== "" && province !== "") {
        return `?petType=${type}&autonomousComunity=${autonomousComunity}&province=${province}`
    } else if (type !== "" && autonomousComunity !== "" && province === "") {
        return `?petType=${type}&autonomousComunity=${autonomousComunity}`
    } else if (type !== "" && autonomousComunity === "" && province !== "") {
        return `?petType=${type}&province=${province}`
    } else if (type === "" && autonomousComunity !== "" && province !== "") {
        return `?autonomousComunity=${autonomousComunity}&province=${province}`
    } else if (type !== "" && autonomousComunity === "" && province === "") {
        return `?petType=${type}`
    } else if (type === "" && autonomousComunity === "" && province !== "") {
        return `?province=${province}`
    } else if (type === "" && autonomousComunity !== "" && province === "") {
        return `?autonomousComunity=${autonomousComunity}`
    } else {
        return ""
    }
}

export default bodyParamsBuilder
