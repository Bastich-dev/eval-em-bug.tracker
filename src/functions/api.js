import { useToast } from "vue-toastification";
import exceptionErrorHandler from "./exceptionErrorHandler";
const toast = useToast();

// API Error handler
async function checkResponse(response) {
    const jsonResponse = await response.json();
    const dataResponse = await jsonResponse.result;
    const isAnExceptionError = exceptionErrorHandler(dataResponse);

    if (isAnExceptionError) {
        return dataResponse;
    } else if (isAnExceptionError === null) {
        toast.error(dataResponse.message);
        throw null;
    } else {
        throw null;
    }
}

// Appel de l'API : Authentification
export async function login(username, password) {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/login/${username}/${password}`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse.token;
}

export async function signup(username, password) {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/signup/${username}/${password}`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse.token;
}

export async function logout() {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/logout/${localStorage.getItem("token")}`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse;
}

// Noms des fonctions : [METHOD][FUNCTION_NAME](){ }

// Appel de l'API : Users

export async function getListUsers() {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/users/${localStorage.getItem("token")}`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse.user;
}

// Appel de l'API : Bugs
export async function getListBugs() {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/list/${localStorage.getItem("token")}/0`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse.bug;
}
export async function getMyListBugs(user_id) {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/list/${localStorage.getItem("token")}/${user_id}`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse.bug;
}

export async function getChangeState(bug_id, newValue) {
    const response = await fetch(
        `https://greenvelvet.alwaysdata.net/bugTracker/api/state/${localStorage.getItem("token")}/${bug_id}/${newValue.state}`
    );
    const parsedResponse = await checkResponse(response);
    return parsedResponse;
}

export async function getDeleteBug(bug_id) {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/delete/${localStorage.getItem("token")}/${bug_id}`);
    const parsedResponse = await checkResponse(response);
    return parsedResponse;
}

export async function postAddBug(user_id, title, description) {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/bugTracker/api/add/${localStorage.getItem("token")}/${user_id}`, {
        method: "POST",
        body: JSON.stringify({
            title,
            description,
        }),
    });
    const parsedResponse = await checkResponse(response);
    return parsedResponse;
}
