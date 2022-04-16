import { useState, useEffect } from 'react'

const DeleteItem = ({ data, id }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(data)
    }, [data])

    for (var i = 0; i < state.length; i++) {
        if (state[i] === id) {

            state.splice(i, 1);
            i--;
        }
    }
    return state;
}

export default DeleteItem
