import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const saveVote = async (productID) => {
    try {
        const voteCountRef = ref(db, 'votes');
        const newVote = push(voteCountRef);
        const fechaActual = new Date().toISOString();

        await set(newVote, {
            productID: productID,
            currentDate: fechaActual
        });

        return {
            status: "success",
            message: "Voto guardado correctamente"
        };

    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }


};
