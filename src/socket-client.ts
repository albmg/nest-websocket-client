import { Manager } from "socket.io-client"

export const connecToServer = () => {

    const manager = new Manager('localhost:3001/socket.io/socket.io.js');

    const socket = manager.socket('/');
    console.log({ socket });
    
}