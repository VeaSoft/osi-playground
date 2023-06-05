///simulating, protocol data units.


const net = require('net');

//creating a tcp server

const server = net.createServer((socket) => {
    console.log('Cliented connected');

    //handle incoming data using event subscription

    socket.on('data', (data) => {
        const receivedPDU = JSON.parse(data);
        console.log(`Received PDU `, receivedPDU);

        processReceivedPDU(receivedPDU);

        const responsePDU = {
            sourceAddress: '192.168.0.2',
            destinationAddress: '192.168.0.1',
            payload: 'Response from the server'
        };

        socket.write(JSON.stringify(responsePDU));
    })

    socket.on('end', () => {
        console.log(`client disconnected`);
    })

})

const port = 3001;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})



const client = net.createConnection({ port: 3001 }, () => {
    console.log(`connected to the server`);

    const pdu = {
        sourceAddress: `192.168.1.0`,
        destinationAddress: `192.168.0.2`,
        payload: `Hello!, server serving`
    }

    client.write(JSON.stringify(pdu));
})


client.on('data', (data) => {
    console.log(`Received data from the server`);

    console.log(JSON.parse(data));

    processReceivedPDU(JSON.parse(data));


    

})

client.on('end', () => {
    console.log(`server disconnected, so client going off`)
})

const processReceivedPDU = (pdu) => {
    console.log(`Processing received PDU...`);

    console.log(`Source Address: `, pdu.sourceAddress);
    console.log(`Destination Address: `, pdu.destinationAddress);

    console.log(`Payload: `, pdu.payload);

}