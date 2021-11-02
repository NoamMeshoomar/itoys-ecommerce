import React from 'react';

import AddCategoryForm from './AddCategoryForm/AddCategoryForm';
import AddProductForm from './AddProductForm/AddProductForm';

import './Panel.css';

const Panel = () => {
	return(
		<div className="Panel">
			<AddCategoryForm />
			<AddProductForm />
		</div>
	)
}

export default Panel;