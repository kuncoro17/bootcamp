const yargs = require('yargs');
const { saveContact, selectContact,updateContact,getContactDetails, deleteContact} = require('./Fungsi');

// Define the handler function for adding contacts
const addHandler = (argv) => {
    const contact = {
        name: argv.name,
        email: argv.email,
        mobile: argv.mobile
    };
    saveContact(contact);
};

// Define the handler function for selecting contacts
const selectHandler = () => {
    selectContact();
};

// Define the yargs command for adding a contact
yargs.command({
    command: 'add',
    describe: 'Add a new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,
            type: 'string'
        },
        mobile: {
            describe: 'Contact Mobile',
            demandOption: true,
            type: 'string'
        }
    },
    handler: addHandler
});

// Define the yargs command for selecting contacts
yargs.command({
    command: 'select',
    describe: 'Display all contacts',
    handler: selectHandler
});
const updateHandler = (argv) => {
    const { name, email, mobile } = argv;
    const updatedInfo = {};

    if (email) {
        updatedInfo.email = email;
    }
    if (mobile) {
        updatedInfo.mobile = mobile;
    }
    // Add this condition to handle updating the name
    if (argv.newName) {
        updatedInfo.name = argv.newName;
    }

    // Call the updateContact function
    updateContact(name, updatedInfo);
};

yargs.command({
    command: 'update',
    describe: 'Update contact information',
    builder: {
        name: {
            describe: 'Existing Contact Name',
            demandOption: true,
            type: 'string'
        },
        newName: {
            describe: 'New Contact Name (optional)',
            demandOption: false,
            type: 'string'
        },
        email: {
            describe: 'New Contact Email (optional)',
            demandOption: false,
            type: 'string'
        },
        mobile: {
            describe: 'New Contact Mobile (optional)',
            demandOption: false,
            type: 'string'
        }
    },
    handler: updateHandler
});
const getDetailsHandler = (argv) => {
    const { name } = argv;
    // Call the getContactDetails function
    getContactDetails(name);
};

yargs.command({
    command: 'details',
    describe: 'Get contact details by name',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: getDetailsHandler
});
const deleteHandler = (argv) => {
    const { name } = argv;
    // Call the deleteContact function
    deleteContact(name);
};

yargs.command({
    command: 'delete',
    describe: 'Delete contact by name',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: deleteHandler
});



// Parse the command-line arguments
yargs.parse();
