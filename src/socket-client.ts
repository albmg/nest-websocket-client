import { Manager, Socket } from "socket.io-client"

export const connecToServer = () => {

    const manager = new Manager('localhost:3001/socket.io/socket.io.js');

    const socket = manager.socket('/');
    //console.log({ socket });

    addListeners( socket );
    
}


const addListeners = ( socket: Socket ) => {    
    // ! Siempre va a existir, xq lo estoy creando. No manejo nulos.
    const clientsUl = document.querySelector('#clients-ul')!;    
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')    
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;    
    const serverStatusLabel = document.querySelector('#serverStatus')!;

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
    });

    messageForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        if ( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', { 
            id: 'ME!!', 
            message: messageInput?.value
        });

        messageInput.value = '';

        // console.log({ id: 'ME!!', message: messageInput?.value});
    })

    socket.on('message-from-server', ( payload: { fullName: string, message: string } ) => {
        // console.log(payload);
        const newMessage =`
        <li>
            <strong>${ payload.fullName }</strong>
            <span>${ payload.message }</span>
        </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })
}