const searchReducer = (state = '', action) => {
    switch(action.type) {
        case 'SEARCH_PRODUCTS':
            return state = action.payload;
        case 'REMOVE_SEARCH':
            return state = '';
        default:
            return state;
    }
}

export default searchReducer;