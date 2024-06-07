const fs = require('fs');
const path = require('path');
const validator = require('validator');

// Define the data directory and file path
const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'datatugas4.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const nameExists = (data, name) => {
    const lowerCaseName = name.toLowerCase();
    return data.some(item => item.name.toLowerCase() === lowerCaseName);
};

const readJsonFile = (filePath) => {
    let data = [];
    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            if (fileData) {
                data = JSON.parse(fileData);
            }
        } else {
            console.log('File does not exist.');
        }
    } catch (err) {
        console.error('Error reading the file:', err);
    }
    return data;
};

const validateEmail = (email) => {
    return validator.isEmail(email);
};


const validatePhone = (phone) => {
    return validator.isMobilePhone(phone, 'id-ID');
};


const saveContact = (contact) => {
    console.log(contact);
    if (!validateEmail(contact.email)) {
        console.log('Invalid email format.');
        return;
    }


    if (!validatePhone(contact.mobile)) {
        console.log('Invalid phone format.');
        return;
    }

    let contacts = readJsonFile(dataFilePath);
    if (nameExists(contacts, contact.name)) {
        console.log(`The name "${contact.name}" already exists.`);
        return;
    }

    contacts.push(contact);
    const data = JSON.stringify(contacts, null, 2);

    try {
        fs.writeFileSync(dataFilePath, data);
        console.log('Contact saved successfully.');
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
};
const selectContact = () => {
    const contacts = readJsonFile(dataFilePath);

    if (contacts.length === 0) {
        console.log('No contacts found.');
        return;
    }

    console.log('Contacts:');
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. Name: ${contact.name}, Mobile: ${contact.mobile}`);
    });
};
const updateContact = (name, updatedInfo) => {
    let contacts = readJsonFile(dataFilePath);
    const index = contacts.findIndex(contact => contact.name === name);

    if (index === -1) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }

    // Update the contact with the provided information
    Object.assign(contacts[index], updatedInfo);

    // Write the updated contacts back to the file
    const data = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(dataFilePath, data);
    console.log(`Contact "${name}" updated successfully.`);
};
const getContactDetails = (name) => {
    let contacts = readJsonFile(dataFilePath);
    const contact = contacts.find(contact => contact.name === name);

    if (!contact) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }

    console.log('Contact Details:');
    console.log(`Name: ${contact.name}`);
    console.log(`Email: ${contact.email || 'N/A'}`);
    console.log(`Mobile: ${contact.mobile}`);
};
const deleteContact = (name) => {
    let contacts = readJsonFile(dataFilePath);
    const index = contacts.findIndex(contact => contact.name === name);

    if (index === -1) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }

    // Remove the contact from the array
    contacts.splice(index, 1);

    // Write the updated contacts back to the file
    const data = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(dataFilePath, data);
    console.log(`Contact "${name}" deleted successfully.`);
};
// Module exports
module.exports = {
    saveContact,selectContact,updateContact,getContactDetails,deleteContact
};