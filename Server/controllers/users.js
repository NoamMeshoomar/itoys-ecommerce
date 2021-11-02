const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    register: async (req, res) => {
        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

        const errors = [];

        const emailExist = await Users.findOne({ email });

        if(firstName < 2 || firstName > 15) errors.push('שם פרטי צריך להיות בין 2-15 תווים');

        if(lastName < 2 || lastName > 15) errors.push('שם משפחה צריך להיות בין 2-15 תויים');

        // Check if User with Email already exist
        if(emailExist) errors.push('מייל תפוס או לא חוקי');

        // Validate the email format
        if(!validateEmail(email)) errors.push('נא הקלד/י כתובת אימייל חוקית');

        // Validate the phone number
        if(!phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) errors.push('נא הקלד/י מספר טלפון חוקי');

        // Check if password length is 5-35 characters
        if(password.length < 5 || password.length > 35) errors.push('סיסמה חייבת להיות בין 5-35 תויים');

        // Check is password and confirmPassowrd is match
        if(password !== confirmPassword) errors.push('סיסמאות חייבות להיות תואמות');

        // Check if errors array is empty
        if(errors.length !== 0) return res.status(400).json({ errors });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            fullName: firstName + ' ' + lastName,
            email: email.toLowerCase(),
            phoneNumber,
            password: hashedPassword
        });

        await newUser.save()
        .then(() => res.status(200).json({ message: 'המשתמש נוצר בהצלחה' }))
        .catch(err => res.status(400).json({ err }));
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        Users.findOne({ email: email.toLowerCase() })
        .then(async user => {
            const { _id, fullName, image, email, phoneNumber, isAdmin, createdAt } = user;

            const validPassword = await bcrypt.compare(password, user.password);

            if(!validPassword) {
                return res.status(400).json({ error: 'שם משתמש או סיסמה אינם נכונים' });
            } else {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '12hr' });

                res.status(200).json({ token, user: { 
                    _id,
                    fullName,
                    image,
                    email,
                    phoneNumber,
                    isAdmin,
                    createdAt
                } });
            }
        })
        .catch(() => res.status(400).json({ error: 'שם משתמש או סיסמה אינם נכונים' }));
    },
    getCurrentUser: (req, res) => {
        Users.findById(req.user._id, 'image fullName email phoneNumber isAdmin createdAt')
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(400).json({ err }));
    }
}