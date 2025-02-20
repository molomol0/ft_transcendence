import { initializeGame } from "../pong/main.js";
import { sleep } from "../pong/resetBall.js";
import { changeFriendStatus, setConnectedUsers , buildFriendList} from "../page_script/friendList.js";
// import { initializeGame } from "../pong/main";

// export let globalSocket = null;
export let socket = null;
import { fetchFriendRequests,profileNav } from '../page_script/profile.js';

export async function connectWebSocket(accessToken, username, userId, globalSocket) {

    const encodedToken = encodeURIComponent(accessToken);
    socket = new WebSocket(`wss://${window.location.host}/wsmanagement/lobby/?${encodedToken}`);
    globalSocket = socket;
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case 'invite_code':
                receivedInviteCode(data);
                break;
            case 'friend_request':
                reloadProfileScript(accessToken);
                break;
            case 'list_user_connected':
                setConnectedUsers(data);
                changeFriendStatus();
                break;
            default:
                console.log('Unhandled message type:', data.type);
        }
    }
};

function reloadProfileScript(accessToken) {
    fetchFriendRequests();
    buildFriendList(accessToken, "friendList-body",profileNav);
}

async function receivedInviteCode(data) {
    
    const userConfirmed = confirm(`Inviter id: ${data.inviter_id}\nDo you want to enter the game?`);
    
    if (userConfirmed) {
        route(null, '/pong');
        await sleep(500);
        initializeGame(data.invite_code);
    };
}


export function inviteGame(inviteeId) {
    socket.send(JSON.stringify({
        invitee_id: inviteeId
    }));
}

const accessToken = sessionStorage.getItem('accessToken');
const username = sessionStorage.getItem('username');
const userId = sessionStorage.getItem('userId');
if (accessToken && username && userId)
    connectWebSocket(accessToken, username, userId);