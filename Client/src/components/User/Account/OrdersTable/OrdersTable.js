import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Axios from '../../../../utils/Axios';
import { serverMediaUrl } from '../../../../utils/serverMediaUrl';

import loadingGif from '../../../../assets/images/Loading.gif';

import './OrdersTable.css';

const OrdersTable = () => {
    const [showOrder, setShowOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/orders',
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(res => {
            setOrders(res.data.orders);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);

    return(
        <div className="OrdersTable">
            <h1>הזמנות</h1>
            <div className="type__bar">
                <h3>סטטוס</h3>
                <h3>סה"כ</h3>
                <h3>תאריך</h3>
            </div>
            {loading ? <div style={{width: '100%'}}><img style={{display: 'block', margin: '0 auto'}} width="50" src={loadingGif} alt="" /></div> : <div className="orders">
                {orders.reverse().map((order, index) => {
                    return(
                        <div key={order._id}>
                            <button className="order" style={showOrder === index ? {backgroundColor: 'rgb(219, 219, 219)'} : null} onClick={() => setShowOrder(showOrder === index ? null : index)}>
                                <h3 className="order_status" style={(order.status === 'בטיפול' && {backgroundColor: '#6dbc35'}) || (order.status === 'הסתיים' && {backgroundColor: 'var(--default-blue-color)'}) || (order.status === 'בוטל' && {backgroundColor: '#FF5050'})}>{order.status}</h3>
                                <h3>{order.totalPrice} ₪</h3>
                                <h3>{moment(order.createdAt).format('D/MM/Y')}</h3>
                            </button>
                            {showOrder === index && <div className="order_details">
                                <div className="order_products">
                                    <h3 style={ { marginBottom: 20, color: 'var(--default-grey-color)' } }>מוצרים</h3>
                                    <div className="products">
                                        {order.products.map((product) => {
                                            return(
                                                <div key={product._id} className="product">
                                                    <img src={`${serverMediaUrl}/products/${product.id + product.imageType}`} style={{marginBottom: 20}} alt=""/>
                                                    <p>{product.title}</p>
                                                    <p style={{margin: '10px 0'}}>מחיר: {product.price} ₪</p>
                                                    <p>כמות: {product.quantity}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="order_shipping_address">
                                    <h3 style={{marginBottom: 20, color: 'var(--default-grey-color)'}}>כתובת</h3>
                                    <div className="address">
                                        <p>{order.shippingAddress.city}</p>
                                        <p style={{margin: '20px 0'}}>{order.shippingAddress.line1}</p>
                                        <p>מיקוד {order.shippingAddress.postal_code} / {order.shippingAddress.country_code}</p>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default OrdersTable;