const fs = require("fs");
const path = require("path");
const shortid = require('shortid');
const Client = require("ssh2-sftp-client");

const client = new Client();

const sftpInfo = {
    host: process.env.FTP_HOST,
    port: 21098,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD
}

const Products = require('../models/Products');
const Categories = require('../models/Categories');

const UPLOAD_TO_PATH = "/home/projwhwl/public_html/uploads";

module.exports = {
    searchBar: (req, res) => {
        const { searchQuery } = req.body;

        Products.find({ title: { $regex: '.*' + searchQuery + '.*', $options: 'i' } })
            .then(products => res.status(200).json({ products }))
            .catch(err => res.status(400).json({ err }));
    },
    getSingleProduct: (req, res) => {
        const { id } = req.params;

        Products.findOne({ id }).populate('category')
            .then(product => res.status(200).json({ product }))
            .catch(() => res.status(404).json({ error: 'המוצר אינו נמצא' }));
    },
    getLastestProducts: (req, res) => {
        const { limit } = req.query;

        Products.find().sort('-createdAt').limit(limit < 0 || limit > 50 ? 50 : Number(limit))
        .then(products => res.status(200).json({ products }))
        .catch(err => res.status(400).json({ err }));
    },
    getCategoryProducts: async (req, res) => {
        const { id } = req.params;
        const { skip, limit } = req.query;

        try {
            const categoryExist = await Categories.findById(id);

            if(categoryExist)
                Products.find({ category: id }).sort('-createdAt').skip(+skip).limit(limit < 0 || limit > 50 ? 50 : +limit)
                .then(products => res.status(200).json({ products }))
                .catch(err => res.status(400).json({ err }));
        } catch (err) {
            res.status(404).json({ error: 'הקטגוריה לא נמצאה' });
        }
    },
    getRandomProducts: async (req, res) => {
        const { limit } = req.query;

        const productsLength = (await Products.find()).length;

        const randomNumber = Math.floor(Math.random() * productsLength);

        Products.find().skip(randomNumber).limit(limit < 0 || limit > 50 ? 50 : +limit)
            .then(randomProducts => res.status(200).json({ randomProducts }))
            .catch(err => res.status(400).json({ err }));
    },
    addProduct: async (req, res) => {
        const { title, description, category, price, quantity } = req.body;
        const {file} = req.files;

        const priceNum = +price;

        const errors = [];

        if(typeof priceNum !== 'number' || priceNum < 1 || priceNum > 9999999) errors.push('נא הקלד מחיר חוקי');

        const categoryExist = await Categories.findById(category);

        if(!categoryExist) errors.push('הקטגוריה אינה קיימת');
        if(errors.length > 0) return res.status(400).json({ errors });

        const id = shortid.generate();

        const newProduct = new Products({
            id,
            imageType: path.extname(file.name),
            title,
            description,
            category,
            price: priceNum,
            quantity: typeof quantity !== 'number' ? 1 : quantity
        });

        client.connect(sftpInfo)
            .then(() => client.put(file.data, `${UPLOAD_TO_PATH}/products/${id + path.extname(file.name)}`))
            .then(() => client.end())
            .catch(console.error);

        await newProduct.save()
            .then(product => res.status(200).json({ product }))
            .catch(err => res.status(400).json({ err }));
    },
    editProduct: async (req, res) => {
        const {productId} = req.params;
        const file = req.files?.file;

        try {
            const out = {};
            for(let key in req.body) {
                if(req.body[key] && typeof req.body[key] === "string") {
                    out[key] = req.body[key];
                }
            }
            if(file) {
                out.imageType = path.extname(file.name);
            }

            const {id} = await Products.findByIdAndUpdate(productId, {...out});

            if(file) {
                client.connect(sftpInfo)
                    .then(() => client.put(file.data, `${UPLOAD_TO_PATH}/products/${id + path.extname(file.name)}`))
                    .then(() => client.end())
                    .catch(console.error);
            }
            res.status(200).json({message: "Edited successfully!"});
        } catch (err) {
            res.status(400).json({error: err});
        }
    }
}