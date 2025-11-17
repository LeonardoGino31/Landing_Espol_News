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

const initChipFilters = ()=>{
    const chips = document.querySelectorAll(".chip");
    chips.forEach(chip =>{
        chip.addEventListener("click",(e)=>{
            e.preventDefault();
            chip.classList.toggle("active");
            applyChipClasses(chip);
            updateFilter();
        });
    });
};

const applyChipClasses=(chip)=>{
    if(chip.classList.contains("active")){
        chip.classList.add('bg-secondary/20', 'dark:bg-secondary/30', 'text-secondary', 'dark:text-orange-300');
        chip.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    }else{
        chip.classList.remove('bg-secondary/20', 'dark:bg-secondary/30', 'text-secondary', 'dark:text-orange-300');
        chip.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    }
};

const updateFilter=()=>{
    const activeChips = Array.from(document.querySelectorAll('.chip.active')).map(c=>c.dataset.type);
    const allCards =document.querySelectorAll('.grid [data-type]');
    if (activeChips.length === 0) {
    // sin filtros -> mostrar todo
    allCards.forEach(card => card.classList.remove('hidden'));
    return;
  }

  allCards.forEach(card => {
    const cat = card.dataset.type;
    if(activeChips.includes(cat)) {
      card.classList.remove('hidden'); 
    } else {
      card.classList.add('hidden'); 
    }
  });
};




(()=>{
    showToast();
    initChipFilters();
    console.log("Mensaje de bienvenida mostrado");
})();