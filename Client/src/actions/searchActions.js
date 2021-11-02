export const searchProducts = searchText => dispatch => {
    dispatch({ type: 'SEARCH_PRODUCTS', payload: searchText });
}

export const removeSearch = () => {
    return {
        type: 'REMOVE_SEARCH'
    }
}