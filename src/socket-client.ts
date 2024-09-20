import { Manager, Socket } from "socket.io-client"

export const connecToServer = () => {

    const manager = new Manager('localhost:3001/socket.io/socket.io.js');

    const socket = manager.socket('/');
    //console.log({ socket });

    addListeners( socket );
    
}


const addListeners = ( socket: Socket ) => {
    
    // ! Siempre va a existir, xq lo estoy creando. No manejo nulos.
    const serverStatusLabel = document.querySelector('#serverStatus')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    // TODO: #clients-ul

    socket.on('connect', () => {
        // console.log('connected');
        serverStatusLabel.innerHTML = 'connected'
    })

    socket.on('disconnect', () => {
        // console.log('disconnected');
        serverStatusLabel.innerHTML = 'disconnected'
    })

    socket.on('clients-updated', (clients: string[]) => {
        // console.log({ clients })
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    })
}