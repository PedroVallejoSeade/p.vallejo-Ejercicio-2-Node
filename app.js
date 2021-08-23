const axios = require('axios').default;
const http = require('http');
const {readFileSync, writeFileSync} = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    //Provededores
    if (url == '/api/proveedores') {
        axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json')
            .then(function (response) {
                // handle success
                res.writeHead(200, { contentType: 'text/html' });
                const principio = readFileSync('./templateBeginProveedores.html', 'utf8');
                const fin = readFileSync('./templateEndProveedores.html', 'utf8');
                writeFileSync('./proveedores.html', principio);
                writeFileSync('./templateMiddle.html', '[');
                response.data.forEach(function (proveedor){
                    const idProveedor = proveedor.idproveedor;
                    const nomCompania = proveedor.nombrecompania;
                    const nomContacto = proveedor.nombrecontacto;
                    writeFileSync('./templateMiddle.html', `{ id: "${idProveedor}", nombrecompania: "${nomCompania}", nombrecontacto: "${nomContacto}" },` ,{flag: 'a'});
                })
                writeFileSync('./templateMiddle.html', '];' ,{flag: 'a'});
                const mid = readFileSync('./templateMiddle.html', 'utf8');
                writeFileSync('./proveedores.html', mid, {flag: 'a'});
                writeFileSync('./proveedores.html', fin, {flag: 'a'});
                const archivo = readFileSync('./proveedores.html', 'utf8');
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
        axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json')
            .then(function (response) {
                // handle success
                res.writeHead(200, { contentType: 'text/html' });
                const principio = readFileSync('./templateBeginClientes.html', 'utf8');
                const fin = readFileSync('./templateEndClientes.html', 'utf8');
                writeFileSync('./clientes.html', principio);
                writeFileSync('./templateMiddle.html', '[');
                response.data.forEach(function (cliente){
                    const idCliente = cliente.idCliente;
                    const nomCompania = cliente.NombreCompania;
                    const nomContacto = cliente.NombreContacto;
                    writeFileSync('./templateMiddle.html', `{ id: "${idCliente}", nombrecompania: "${nomCompania}", nombrecontacto: "${nomContacto}" },` ,{flag: 'a'});
                })
                writeFileSync('./templateMiddle.html', '];' ,{flag: 'a'});
                const mid = readFileSync('./templateMiddle.html', 'utf8');
                writeFileSync('./clientes.html', mid, {flag: 'a'});
                writeFileSync('./clientes.html', fin, {flag: 'a'});
                const archivo = readFileSync('./clientes.html', 'utf8');
                res.write(archivo);
                res.end();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    //404
    else {
        res.end('<h1> 404 :(</h>')
    }
})

server.listen(8081);