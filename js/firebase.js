import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

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
const contador = document.getElementById("contadorSubs");

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

const form = document.getElementById("form_email");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const msg = document.getElementById("successMessage");
    const msg2 = document.getElementById("repeatMessage");

    const emailID = email.replace(/\./g, "_");
    const dataRef = ref(db, "formularios/" + emailID);

    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
        msg2.classList.remove("hidden");

        setTimeout(() => {
            msg2.classList.add("hidden");
        }, 5000);

        form.reset();
        return;
    }

    set(dataRef, {
        email: email,
        fecha: new Date().toISOString()
    })
    .then(() => {
        msg.classList.remove("hidden");

        setTimeout(() => {
            msg.classList.add("hidden");
        }, 5000);

        form.reset();
    })
    .catch(err => console.error("Error al guardar:", err));
});


function formatNumber(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
}

const subsRef = ref(db, "formularios");

onValue(subsRef, (snapshot) => {
    if (snapshot.exists()) {
        const total = Object.keys(snapshot.val()).length;
        contador.textContent = formatNumber(total);
    } else {
        contador.textContent = "0";
    }
});
