import { useToast } from "vue-toastification";
const toast = useToast();

export default function checkResponse(response, instance) {
    if (response.status === "done") return true;
    else {
        // Error Types handler
        if (response.message.includes("token")) {
            instance.$router.push({ path: "/login", replace: true });
            localStorage.removeItem("token");
            toast.error("Erreur, votre session a expiré, veuillez vous reconnecter");
            return false;
        } else return null;
    }
}
