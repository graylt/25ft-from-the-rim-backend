// const jwt = require('jsonwebtoken');

const validEmail = (req, res, next) => {
    const {email, name, password } = req.body;
        // return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(profileEmail);
    // }

    if (req.path === '/register') {
        console.log(!email.length);
        if (![email, name, password].every(Boolean)) {
            return res.json('Missing credentials');
        } else if (!validEmail(email)) {
            return res.json('Invalid email');
        }
    } else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.json('Missing credentials');
        } else if (!validEmail(email)) {
            return res.json('Invalid email')
        }
    }
    next()
}

module.exports = validEmail;
