import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import axios from '../../../utils/Axios';

import './AddProductForm.css';

const AddProductForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [file, setFile] = useState(null);
	const [category, setCategory] = useState('');

	const categories = useSelector(state => state.categories);

	const handleAddProduct = e => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', +price);
		formData.append('quantity', +quantity);
		formData.append('category', category);
		formData.append('file', file);

		axios.post('/products', formData, {
			headers: {
				token: localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
			}
		})
		.then(res => console.log(res))
		.catch(err => console.error(err.response));
	}

	return(
		<form className="AddProductForm" onSubmit={ handleAddProduct } encType="multipart/form-data">
			<h1>הוסף מוצר חדש</h1>
			<select onChange={ e =>	setCategory(e.target.value) }>
				<option defaultChecked>בחר קטגוריה</option>
				{ categories.map(category => {
					return <option key={ category._id } value={ category._id }>{ category.categoryName }</option>
				}) }
			</select>
			<input type="text" placeholder="כותרת" onChange={ e => setTitle(e.target.value) } />
			<textarea type="text" placeholder="תיאור" onChange={ e => setDescription(e.target.value) } />
			<input type="text" placeholder="מחיר" onChange={ e => setPrice(e.target.value) } />
			<input type="number" placeholder="כמות" onChange={ e => setQuantity(e.target.value) } />
			<input type="file" onChange={ e => setFile(e.target.files[0]) } />
			<button type="submit">הוסף מוצר</button>
		</form>
	)
}

export default AddProductForm;