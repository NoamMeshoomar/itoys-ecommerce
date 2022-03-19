const request = require('request');

const Cart = require('../models/Cart');
const Orders = require('../models/Orders');

const PAYPAL_API = 'https://api-m.paypal.com';

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
    
            request.post(PAYPAL_API + '/v1/payments/payment', {
                auth: {
                    user: process.env.PAYPAL_PUBLIC_KEY,
                    pass: process.env.PAYPAL_SECRET_KEY
                },
                body: {
                    intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                transactions: [{
                    amount: {
                        total: totalPrice,
                        currency: 'ILS'
                    }
                }],
                redirect_urls: {
                    return_url: 'https://itoys.netlify.app/success',
                    cancel_url: 'https://itoys.netlify.app/failed'
                }
            },
            json: true
            }, (err, response) => {
                if(err) return res.status(400).json({err});
                res.status(200).json({paymentUrl: response.body.links});
            });
        } catch (err) {
            res.status(400).json({err});
        }
    },
    executePayment: (req, res) => {
        const {paymentID, payerID} = req.query;

        let totalPrice = 0;

        Cart.find({ userId: req.user._id }).populate('productId')
        .then(doc => {
            for(let i = 0; i < doc.length; i++) {
                totalPrice += doc[i].productId.price * doc[i].quantity;
            }
        })
        .then(() => {
            if(totalPrice === 0) return res.status(400).json({ message: 'העגלה ריקה.' });

            request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID + '/execute', {
                auth: {
                    user: process.env.PAYPAL_PUBLIC_KEY,
                    pass: process.env.PAYPAL_SECRET_KEY
                },
                body: {
                    payer_id: payerID,
                    transactions: [{
                        amount: {
                            total: totalPrice,
                            currency: 'ILS'
                        }
                    }]
                },
                json: true
            }, async (err, response) => {
                if(err) return res.status(500).json({ err });

                if(response.body.state === 'approved') {
                    const cartProducts = await Cart.find({ userId: req.user._id }).populate('productId');

                    const orderProducts = [];

                    for(let i = 0; i < cartProducts.length; i++) {
                        orderProducts.push({
                            quantity: cartProducts[i].quantity,
                            image: cartProducts[i].productId.image,
                            title: cartProducts[i].productId.title,
                            price: cartProducts[i].productId.price,
                            totalPrice: cartProducts[i].productId.price * cartProducts[i].quantity
                        });
                    }

                    const newOrder = new Orders({
                        userId: req.user._id,
                        totalPrice,
                        shippingAddress: { ...response.body.payer.payer_info.shipping_address },
                        products: [ ...orderProducts ]
                    });

                    await newOrder.save()
                    .then(() => {
                        Cart.deleteMany({ userId: req.user._id })
                        .then(() => res.status(200).json({ response }))
                        .catch(err => res.status(400).json({ err }));
                    })
                }
            })
        })
        .catch(err => res.status(400).json({ err }));
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