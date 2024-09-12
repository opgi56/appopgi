import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// Login Route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
//         if (user.length === 0) {
//             return res.status(400).json({ message: 'Invalid username or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user[0].password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid username or password' });
//         }

//         const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, {
//             expiresIn: '1h',
//         });

//         res.json({ token });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// export default router;

router.post('/users', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const [result] = await pool.query(sql, [username, hashedPassword]);

        res.status(201).json({ message: 'User created', userId: result.insertId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
