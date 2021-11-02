import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addCategory } from '../../../actions/categoriesActions';

import Axios from "../../../utils/Axios";

import './AddCategoryForm.css';

const AddCategoryForm = () => {
	const [categoryName, setCategoryName] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const handleAddCategory = e => {
		e.preventDefault();

		if(categoryName.length < 1) return;

		Axios({
			method: 'POST',
			url: '/categories',
			headers: {
				token: localStorage.getItem('token')
			},
			data: {
				categoryName
			}
		})
		.then(res => {
			setMessage(res.data.message);
			dispatch(addCategory(res.data.category));
		})
		.catch(err => console.error(err.response));
	}

	return(
		<form className="AddCategoryForm" onSubmit={ handleAddCategory }>
			<h1>הוסף קטגוריה חדשה</h1>
			<input type="text" placeholder="שם קטגוריה" onChange={ e => setCategoryName(e.target.value) } />
			<button type="submit">הוסף קטגוריה</button>
			{ message && <p>{ message }</p> }
		</form>
	)
}

export default AddCategoryForm;