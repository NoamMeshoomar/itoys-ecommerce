export const setCategories = categories => {
	return {
		type: 'SET_CATEGORIES',
		payload: categories
	}
}

export const addCategory = category => {
	return {
		type: 'ADD_CATEGORY',
		payload: category
	}
}