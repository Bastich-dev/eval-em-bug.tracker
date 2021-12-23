import checkResponse from "./checkResponse";
import { useToast } from "vue-toastification";
const toast = useToast();
function getRealResponse(parsedResponse, instance) {
    const realResponse = parsedResponse.result;
    if (checkResponse(realResponse, instance)) {
        return realResponse;
    } else if (checkResponse(realResponse, instance) === null) {
        toast.error(realResponse.message);
        throw null;
    } else throw null;
}

export async function getListUsers(instance) {
    const response = await fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/users/${localStorage.getItem("token")}`);
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance).user;
}

export async function login(instance, username, pawwsord) {
    const response = await fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/login/${username}/${pawwsord}`);
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance).token;
}

export async function signup(instance, username, pawwsord) {
    const response = await fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/signup/${username}/${pawwsord}`);
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance).token;
}

export async function getListBugs(instance) {
    const response = await fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${localStorage.getItem("token")}/0`);
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance).bug;
}

export async function getChangeState(instance, bug_id, newValue) {
    const response = await fetch(
        `http://greenvelvet.alwaysdata.net/bugTracker/api/state/${localStorage.getItem("token")}/${bug_id}/${newValue.status}`
    );
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance);
}

export async function getDeleteBug(instance, bug_id) {
    const response = await fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/delete/${localStorage.getItem("token")}/${bug_id}`);
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance);
}

export async function postAddBug(instance, user_id, title, description) {
    const response = await fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/add/${localStorage.getItem("token")}/${user_id}`, {
        method: "POST",
        body: JSON.stringify({
            title,
            description,
        }),
    });
    const parsedResponse = await response.json();
    return getRealResponse(parsedResponse, instance);
}
