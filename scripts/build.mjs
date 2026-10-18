import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','details.css','checkout.css','catalog.js','app.js','details.js','checkout.js','thankyou.js'])await copyFile(file,`dist/${file}`);
await cp('images','dist/images',{recursive:true});
console.log('Storefront built. Private server code and credentials excluded from public files.');
