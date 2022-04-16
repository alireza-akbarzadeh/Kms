const Params = (baseUrl, {page = 1, perPage = 15, search = null, filters = null, isPaginate = null}) => {
    let url = baseUrl + `?page=${page}&perPage=${perPage}`

    if (search !== null) {
        url += `&search=${search}`
    }
    if (filters !== null) {
        url += `&${filters}`
    }

    if (isPaginate !== null) {
        url += `&isPaginate=${isPaginate}`
    }
    return url
};

export default Params