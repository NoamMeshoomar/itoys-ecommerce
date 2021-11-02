const INITIAL_STATE = [];

const categoriesReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case 'SET_CATEGORIES':
			return state = action.payload;
		case 'ADD_CATEGORY':
			return state = [...state, action.payload]; 
		default:
			return state;
	}
}

export default categoriesReducer;