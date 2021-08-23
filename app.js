const axios = require('axios').default;
const http = require('http');
const {readFileSync, writeFileSync} = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    //Home page
    if (url == '/') {
        res.writeHead(200, { contentType: 'text/html' });
        const principio = readFileSync('./templateBegin.html', 'utf8');
        const mid = readFileSync('./templateMiddle.html', 'utf8');
        const fin = readFileSync('./templateEnd.html', 'utf8');
        writeFileSync('./prueba.html', principio);
        writeFileSync('./prueba.html', mid, {flag: 'a'});
        writeFileSync('./prueba.html', fin, {flag: 'a'});
        const archivo = readFileSync('./prueba.html', 'utf8');
        res.write(archivo);
        res.end();
    }
    //Recurso de proveedores
    else if (url == '/api/proveedores') {
        axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json')
            .then(function (response) {
                // handle success
                res.writeHead(200, { contentType: 'text/html' });
                const principio = readFileSync('./templateBegin.html', 'utf8');
                const fin = readFileSync('./templateEnd.html', 'utf8');
                writeFileSync('./prueba.html', principio);
                writeFileSync('./templateMiddle.html', '[');
                response.data.forEach(function (proveedor){
                    const idProveedor = proveedor.idproveedor;
                    const nomCompania = proveedor.nombrecompania;
                    const nomContacto = proveedor.nombrecontacto;
                    writeFileSync('./templateMiddle.html', `{ name: "${idProveedor}", age: "${nomCompania}", birthdate: "${nomContacto}" },` ,{flag: 'a'});
                })
                writeFileSync('./templateMiddle.html', '];' ,{flag: 'a'});
                const mid = readFileSync('./templateMiddle.html', 'utf8');
                writeFileSync('./prueba.html', mid, {flag: 'a'});
                writeFileSync('./prueba.html', fin, {flag: 'a'});
                const archivo = readFileSync('./prueba.html', 'utf8');
                res.write(archivo);
                res.end();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    //Recurso de clientes
    else if (url == '/api/clientes') {
        //TODO
    }
    //404
    else {
        //TODO
    }
})

server.listen(8080);