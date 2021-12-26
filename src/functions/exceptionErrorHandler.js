import { useToast } from "vue-toastification";
import router from "../router";
const toast = useToast();

export default function exceptionErrorHandler(response) {
    if (response.status === "done") return true;
    else {
        // Front-end Error handler
        if (response.message.includes("token")) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            toast.error("Erreur, votre session a expiré, veuillez vous reconnecter");
            router.push({ path: "/login", replace: true });
            return false;
        } else return null;
    }
}
