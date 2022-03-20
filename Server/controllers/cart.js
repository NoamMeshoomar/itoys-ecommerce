const request = require('request');
const paypal = require('paypal-node-sdk');

const Cart = require('../models/Cart');
const Orders = require('../models/Orders');

const PAYPAL_API = 'https://api-m.paypal.com';

paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPAL_PUBLIC_KEY,
    'client_secret': process.env.PAYPAL_SECRET_KEY
});

module.exports = {
    getUserCart: (req, res) => {
        Cart.find({ userId: req.user._id }).populate('productId')
        .then(cartProducts => res.status(200).json({ cartProducts }))
        .catch(err => res.status(400).json({ err }));
    },
    getTotalPrice: (req, res) => {
        Cart.find({ userId: req.user._id }).populate('productId')
        .then(doc => {
            let totalPrice = 0;

            for(let i = 0; i < doc.length; i++) {
                totalPrice += doc[i].productId.price * doc[i].quantity;
            }

            return res.status(200).json({ totalPrice });
        })
        .catch(err => res.status(400).json({ err }));
    },
    addToCart: async (req, res) => {
        const { product, quantity } = req.body;

        if(typeof quantity !== 'number' || quantity < 1 || quantity > 999) return;

        const inCart = await Cart.findOne({ userId: req.user._id, productId: product }).populate("productId", "quantity");

        if(inCart) {
            if(inCart.quantity == inCart.productId.quantity) return;
            Cart.findOneAndUpdate({ userId: req.user._id, productId: product }, { $inc: { quantity: quantity ? quantity : 1 } }).populate('productId')
            .then(updatedCartProduct => res.status(200).json({ updatedCartProduct }))
            .catch(err => console.error(err));
            return;
        } else {
            const newCartItem = new Cart({
                userId: req.user._id,
                productId: product,
                quantity: quantity ? quantity : 1
            });
    
            await newCartItem.save()
            .then(cartProduct => {
                Cart.findById(cartProduct._id).populate('productId')
                .then(product => res.status(200).json({ product }))
                .catch(err => console.error(err));
            }).catch(err => res.status(400).json({ err }));
        }
    },
    createPayment: async (req, res) => {
        let totalPrice = 0;

        try {
            const cartProduct = await Cart.find({userId: req.user._id}).populate('productId');

            for(let i = 0; i < cartProduct.length; i++) {
                totalPrice += cartProduct[i].productId.price * cartProduct[i].quantity;
            }

            if(totalPrice === 0) throw "העגלה ריקה.";

            const newPayment = {
                intent: "sale",
                payer: {
                    payment_method: "paypal"
                },
                redirect_urls: {
                    return_url: 'https://itoys.netlify.app/success',
                    cancel_url: 'https://itoys.netlify.app/failed',
                },
                transactions: [{
                    item_list: {
                        items: cartProduct.map(cart => ({
                            name: cart.productId.title,
                            price: cart.productId.price,
                            currency: "ILS",
                            quantity: cart.quantity
                        }))
                    },
                    amount: {
                        total: totalPrice,
                        currency: 'ILS'
                    },
                }]
            }
            
            paypal.payment.create(newPayment, (err, response) => {
                if(err) throw err;
                const paymentLink = (response.links.find(link => link.rel === "approval_url")).href;
                res.status(200).json({paymentLink});
            });
        } catch (err) {
            res.status(400).json({err});
        }
    },
    executePayment: async (req, res) => {
        const {paymentID, payerID} = req.params;

        let totalPrice = 0;

        try {
            const cartProducts = await Cart.find({ userId: req.user._id }).populate('productId');
    
            for(let i = 0; i < cartProducts.length; i++) {
                totalPrice += cartProducts[i].productId.price * cartProducts[i].quantity;
            }

            if(totalPrice == 0) throw "העגלה ריקה.";

            const execute_payment_json = {
                "payer_id": payerID,
                "transactions": [{
                    "amount": {
                        "currency": "ILS",
                        "total": totalPrice
                    }
                }]
            };

            paypal.payment.execute(paymentID, execute_payment_json, async (err, payment) => {
                if(err) throw err;
                if(payment.state === 'approved') {
                    const orderProducts = [];
    
                    for(let i = 0; i < cartProducts.length; i++) {
                        orderProducts.push({
                            id: cartProducts[i].id,
                            imageType: cartProducts[i].imageType,
                            quantity: cartProducts[i].quantity,
                            title: cartProducts[i].productId.title,
                            price: cartProducts[i].productId.price,
                        });
                    }
    
                    const newOrder = new Orders({
                        userId: req.user._id,
                        totalPrice,
                        shippingAddress: {...payment.payer.payer_info.shipping_address},
                        products: [...orderProducts]
                    });
    
                    await newOrder.save();
                    await Cart.deleteMany({userId: req.user._id});

                    res.status(200).json("התשלום בוצע בהצלחה!");
                }
            });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    updateQuantity: async (req, res) => {
        const { product, quantity } = req.body;
        
        if(typeof quantity !== 'number' || quantity < 1 || quantity > 999) return res.status(400);

        try {
            const inCart = await Cart.findById(product).populate("productId", "quantity");

            if(inCart.quantity >= inCart.productId.quantity) throw "Out of stock";

            await Cart.findByIdAndUpdate(product, {$set: {quantity}}).populate("productId", "quantity");
            
            res.status(200).json({updatedCartProduct})
        } catch(err) {
            res.status(400).json({error: err});
        }
    },
    removeFromCart: (req, res) => {
        const { product } = req.body;

        Cart.findByIdAndRemove(product)
        .then(removedItem => res.status(200).json({ removedItem: removedItem._id }))
        .catch(err => res.status(400).json({ err }));
    }
}