import bcrypt from 'bcrypt';
import pool from './db.js'; // Adjust the path as necessary

const username = 'nahla';
const plainPassword = '1234';

bcrypt.hash(plainPassword, 10, async (err, hashedPassword) => {
    if (err) throw err;

    try {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const [result] = await pool.query(sql, [username, hashedPassword]);
        console.log('User inserted with ID:', result.insertId);
    } catch (error) {
        console.error('Error inserting user:', error.message);
    }
});
