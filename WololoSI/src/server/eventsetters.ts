import { Socket } from "socket.io";

function getGameRoom(gameId: string) {
    return "game: " + gameId;
}

export function onDisconnecting(socket: Socket) {
    socket.on("disconnecting", () => {
        console.log("Disconnecting")
        socket.broadcast.send(socket.id + " has disconnected.");
    });
}

export function onJoinGameRoom(socket: Socket) {
    socket.on("joinGameRoom", (gameId: string) => {
        console.log("Joining game room")
        const gameRoom: string = getGameRoom(gameId);
        socket.join(gameRoom);
        socket.to(gameRoom).send(socket.id + " joined the room.");
    });
}

export function onNotifyGameUpdate(socket: Socket) {
    socket.on("notifyGameUpdate", () => {
        console.log("Notifying game updated")
        socket.nsp.emit("update");
    });
}