// fungsi.js
const { pool } = require('./koneksi');
const validator = require('validator');

// PostgreSQL Functions
const getAllContacts = async () => {
    const result = await pool.query('SELECT * FROM contact ORDER BY id_contact DESC');
    return result.rows;
};

const getContactById = async (id) => {
    const result = await pool.query('SELECT * FROM contact WHERE id_contact = $1', [id]);
    return result.rows[0];
};

const createContact = async (name, phone, email) => {
    const result = await pool.query(
        'INSERT INTO contact (name, phone, email) VALUES ($1, $2, $3) RETURNING *',
        [name, phone, email]
    );
    return result.rows[0];
};

const updateContact = async (id, name, phone, email) => {
    const result = await pool.query(
        'UPDATE contact SET name = $1, phone = $2, email = $3 WHERE id_contact = $4 RETURNING *',
        [name, phone, email, id]
    );
    return result.rows[0];
};

const deleteContact = async (id) => {
    await pool.query('DELETE FROM contact WHERE id_contact = $1', [id]);
};

// Validation functions
const validateEmail = (email) => validator.isEmail(email);
const validatePhone = (phone) => validator.isMobilePhone(phone, 'id-ID');

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    validateEmail,
    validatePhone
};
