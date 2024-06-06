const fs = require('fs');
const readline = require('readline');
const path = require('path');
const validator = require('validator');

const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'tugas_susah_beutdah.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Error Handling
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const name = () => {
    rl.question('Masukkan nama: ', (name) => {
        if (!validator.isLength(name, { min: 3 })) {
            console.log('Nama minimal 3 karakter');
            return name();
        }
        phone(name);
    });
}

const phone = (name) => {
    rl.question('Masukkan NoHP: ', (phone) => {
        if (!validator.isMobilePhone(phone, 'id-ID')) {
            console.log('No Hp tidak valid');
            return phone(name);
        }
        email(name, phone);
    });
}

const email = (name, phone) => {
    rl.question('Masukkan email: ', (email) => {
        if (!validator.isEmail(email)) {
            console.log('Email tidak valid');
            return email(name, phone);
        }
        simpandata({ name, phone, email });
    });
}

const simpandata = (contact) => {
    let contacts = [];
    try {
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, 'utf-8');
            if (data) {
                contacts = JSON.parse(data);
            }
        } else {
            console.log('Tidak ada file');
        }
    } catch (err) {
        console.error( err);
    }

    contacts.push(contact);
    const data = JSON.stringify(contacts, null, 2);

    try {
        fs.writeFileSync(dataFilePath, data);
        console.log('Contact saved successfully.');
    } catch (err) {
        console.error(err);
    }

    rl.close();
}

name();