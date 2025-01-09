const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUser = (req, res) => {
    const { first_name, last_name, mobile_number, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('jhj')
    const query = `INSERT INTO users (first_name, last_name, mbile_number, password) VALUES (?, ?, ?, ?)`;
    db.query(query, [first_name, last_name, mobile_number, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'User registered successfully' });
    });
};

const loginUser = (req, res) => {
    const { mobile_number, password } = req.body;

    const query = `SELECT * FROM users WHERE mbile_number = ?`;
    db.query(query, [mobile_number], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (result.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = result[0];
        console.log(user)
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { first_name: user.first_name, last_name: user.last_name } });
    });
};

module.exports = {registerUser, loginUser}