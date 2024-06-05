var nama;
var jabatan;

const readline = require('readline');
const baca = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

baca.question('Masukkan nama: ', (nama)=>{
    baca.question('Masukkan jabatan: ', (jabatan)=>{
        console.log(`Nama: ${nama}`);
        console.log(`Jabatan: ${jabatan}`);
        baca.close();
    })
});
