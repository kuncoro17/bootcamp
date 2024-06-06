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

const nama = () => {
    rl.question('Masukkan nama: ', (name) => {
        if (!validator.isLength(name )) {
            
            return nama();
        }
        NomorHandphone(name);
    });
}
//jika berhasil menginputkan nama lanjut ke function Nomor Handphone

const NomorHandphone = (name) => {
    rl.question('Masukkan NoHP: ', (phone) => {
        if (!validator.isMobilePhone(phone, 'id-ID')) {
            console.log('masukkan nomor hp region indonesia');
            return NomorHandphone(name);
        }
        emails(name, phone);
    });
}
//jika berhasil menginputkan nomor handphone lanjut ke function email

const emails = (name, phone) => {
    rl.question('Masukkan email: ', (email) => {
        if (!validator.isEmail(email)) {
            console.log('Email tidak valid');
            return emails(name, phone);
        }
        Simpandata({ name, phone, email });
    });
}

const Simpandata = (contact) => {
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

nama();