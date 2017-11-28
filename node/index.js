const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((request,response) =>{
    response.statusCode = 200
    response.setHeader('Content-type', 'text/plain');
    response.end('welcome to the world of node development \n');

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})