const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
input:process.stdin,
output:process.stdout

});



rl.question('What is Your Name?', (name)=>{
    rl.question('Your Mobile number?', (mobile)=>{
        rl.question('Your emaik ?', (email)=>{
        const contact = {name, mobile,email};
        const file = fs.readFileSync('data/contact.json', 'utf-8');
        const contacts  = JSON.parse(file);
        contacts.push(contact);
        fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
        console.log("terima kasih sudah isi ");
        rl.close();
    });
    });
});
