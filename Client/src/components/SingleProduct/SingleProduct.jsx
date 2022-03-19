import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/Axios';

import { useInStock } from '../../hooks/useInStock';
import { serverMediaUrl } from '../../utils/serverMediaUrl';
import ProductButtons from '../ProductCard/ProductButtons/ProductButtons';
import LoadingGif from '../../assets/images/Loading.gif';

import './SingleProduct.css';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [editModeTitle, setEditModeTitle] = useState(false);
    const [editModeDescription, setEditModeDescription] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [file, setFile] = useState(null);

    const imageRef = useRef(null);

    const { id } = useParams();

    const inStock = useInStock(product?._id, product?.quantity);

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        axios({ 
            method: 'GET',
            url: `/products/single/${id}`
        })
        .then(res => {
            setProduct(res.data.product);
            setLoading(false);
        })
        .catch(err => console.log(err.response));
    }, [id]);

    useEffect(() => {
        if(file || editedTitle || editedDescription) {
            const formData = new FormData();
    
            formData.append("title", editedTitle);
            formData.append("description", editedDescription);
            formData.append("file", file);
    
            axios.put(`/products/edit/${product?._id}`, formData, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
        }
    }, [editedTitle, editedDescription, file, product?._id]);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if(file) {
            imageRef.current.src = URL.createObjectURL(file);
            setFile(file);
        }
    }

    const handleChangeInput = (e) => {
        if(e.key === "Shift") {
            setProduct((prev) => ({...prev, title: e.target.value}));
            setEditedTitle(e.target.value);
            setEditModeTitle(false);
        }
    }

    const handleChangeDescription = (e) => {
        if(e.key === "Shift") {
            setProduct((prev) => ({...prev, description: e.target.value}));
            setEditedDescription(e.target.value);
            setEditModeDescription(false);
        }
    }

    const handleEditTitle = () => {
        setEditModeTitle(true);
        setEditModeDescription(false);
    }

    const handleEditDescription = () => {
        setEditModeDescription(true);
        setEditModeTitle(false);
    }

    return(
        <div className="SingleProduct">
            {loading ? <img src={LoadingGif} style={{margin: '0 auto'}} width="50" alt="" /> : <Fragment>
                <div className="product_image_container">
                    {user?.isAdmin && <div className="edit-btn">
                        <input type="file" onChange={handleChangeFile} />
                        <h3>✎</h3>
                    </div>}
                    <img src={`${serverMediaUrl}/products/${product.id + product.imageType}`} ref={imageRef} alt="" />
                </div>
                <div className="product_details">
                    <div className="upper_product_details">
                        {(!user?.isAdmin || !editModeTitle) ? 
                            <h1 onClick={handleEditTitle}>
                                {product.title}
                            </h1> : 
                            <input type="text" style={{padding: 10, fontSize: 28, fontWeight: 500, fontFamily: '"Rubik", sans-serif', color: "var(--default-grey-color)"}} defaultValue={product.title} onKeyUp={handleChangeInput} />}
                        {(!user?.isAdmin || !editModeDescription) ? 
                            <pre onClick={handleEditDescription}>
                                {product.description}
                            </pre> : 
                            <textarea style={{resize: "none", color: "var(--default-lightgrey-color)", fontFamily: '"Rubik", sans-serif', fontSize: 18, fontWeight: 400}} defaultValue={product.description} rows="10" cols="50" onKeyUp={handleChangeDescription} />
                        }
                    </div>
                    <div className="lower_product_details">
                        {inStock && <h1 className="in_stock">{product.quantity} במלאי</h1>}
                        <div style={{display: 'flex', alignItems: 'flex-end' }}>
                            {inStock && <input type="number" value={quantity} min="1" max="999" onChange={e => product.quantity >= e.target.value && setQuantity(e.target.value)} />}
                            <h3>{Number.isInteger(product.price) ? product.price * quantity : (product.price * quantity).toFixed(2)} ₪</h3>
                        </div>
                        {!inStock || product.quantity === 0 ? <h3 style={{ marginTop: 20, color: "red"}}>המוצר אזל במלאי</h3> : <ProductButtons _id={product._id} quantity={quantity} />}
                        <span style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                            <p style={{ marginLeft: 5, color: 'var(--default-lightgrey-color)'}}>קטגוריה: </p>
                            <Link to={`/category/${product.category._id}?cName=${product.category.categoryName}`} style={{textDecoration: 'none', color: 'var(--default-blue-color)'}}>
                                {product.category.categoryName}
                            </Link>
                        </span>
                    </div>
                </div>
            </Fragment>}
        </div>
    )
}

export default SingleProduct;