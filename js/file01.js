"use strict";

const showToast=()=>{
    const toast = document.getElementById("toast-interactive");
    const closeB= document.getElementById("toastClose");
    const rejectT=document.getElementById("toastReject");
    if(toast){
        toast.classList.add("md:block");
    }
    if(closeB){
        closeB.addEventListener("click",()=>{
            toast.classList.remove("md:block");
        });

    }
    if(rejectT){
        rejectT.addEventListener("click",()=>{
            toast.classList.remove("md:block");
        });

    }

};



(()=>{
    showToast();
    console.log("Mensaje de bienvenida mostrado");
})();