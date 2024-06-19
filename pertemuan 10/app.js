const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const validator = require('validator');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    user:"postgres",
    password:"penabur123",
    database:"contact",
    host:"localhost",
    
    port:3000,
});

const app = express();
const port = 8080;

// Middleware
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

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

// Routes
app.get('/', (req, res) => {
    res.render('index', { data: { title: 'Index', message: 'Ini Index' } });
});

app.get('/about', (req, res) => {
    res.render('about', { data: { title: 'About', message: 'Ini About' } });
});

app.get('/contact', async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.render('contact', { data: { title: 'contact', message: 'Ini Contact', contact: contacts }, messages: req.flash('success') });
    } catch (error) {
        res.status(404).render('404', { data: { title: '404', message: 'Internal Server Error' } });
    }
});

app.get('/add-contact', (req, res) => {
    res.render('forms', { data: { title: 'Contact', message: 'Add Contact' } , messages: req.flash('error') });
});

app.post('/contact/add', async (req, res) => {
    const { name, phone, email } = req.body;

    if (!validateEmail(email)) {
        req.flash('error', 'Invalid email format');
        return res.redirect('/add-contact');
        // return res.send(    req.flash('error', 'Invalid phone format'));
    }

    if (!validatePhone(phone)) {
        req.flash('error', 'Invalid phone format');

        //return res.send(    req.flash('error', 'Invalid phone format'));
        return res.redirect('/add-contact');
    }

    try {
        await createContact(name, phone, email);
        req.flash('success', 'Contact added successfully');
        res.redirect('/contact');
    } catch (error) {
        req.flash('error', 'Failed to add contact');
        return res.send(    error);
        res.redirect('/add-contact');
    }
});

app.delete('/delete-contact/:id', async (req, res) => {
    const contactId = parseInt(req.params.id, 10);

    try {
        await deleteContact(contactId);
        req.flash('success', `Contact with ID ${contactId} deleted successfully`);
    } catch (error) {
        req.flash('error', `Failed to delete contact with ID ${contactId}`);
    }
    res.redirect('/contact');
});

app.get('/edit-contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).render('404', { data: { title: '404', message: 'Contact not found' } });
        }

        res.render('forms', { data: { title: 'Contact', message: 'Edit Contact', contact }, messages: req.flash('error') });
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
});

app.put('/contact/edit', async (req, res) => {
    const { id, name, phone, email } = req.body;

    if (!validateEmail(email) || !validatePhone(phone)) {
        req.flash('error', 'Invalid email or phone format');
        return res.redirect(`/edit-contact/${id}`);
       // res.send('error di validasi');
    }
 
    try {
        await updateContact(id, name, phone, email);
        req.flash('success', 'Contact updated successfully');
        
    } catch (error) {
        req.flash('error', 'Failed to update contact');
        res.send(error);
    }
    res.redirect('/contact');
});

app.get('/contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).render('404', { data: { title: '404', message: 'Contact not found' } });
        }

        res.render('contact-details', { data: { title: 'Contact Details', message: 'Contact Details', contact } });
    } catch (error) {
        res.status(500).render('500', { data: { title: '400', message: 'Internal Server Error' } });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { data: { title: '404', message: 'Page Not Found' }, layout: 'layouts/error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});