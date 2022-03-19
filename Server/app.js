const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(fileupload({createParentPath: true}));
app.use(express.json());

const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const ordersRoute = require('./routes/orders');
const categoriesRoute = require('./routes/categories');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => console.log('Connected to MongoDB'));

const beginUrl = '/api/v1';

app.use(`${ beginUrl }/users`, usersRoute);
app.use(`${ beginUrl }/products`, productsRoute);
app.use(`${ beginUrl }/cart`, cartRoute);
app.use(`${ beginUrl }/orders`, ordersRoute);
app.use(`${ beginUrl }/categories`, categoriesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${ PORT }`));