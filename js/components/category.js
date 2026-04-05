let overlay = document.getElementById("addNew");
let dialog = overlay.querySelector(".dialog");

overlay.addEventListener("click", (e) => {
    if(!dialog.contains(e.target)){
        overlay.classList.remove("active");
    }
});

let closeForm = overlay.getElementById('closeForm');

closeForm.addEventListener("click", (e) => {
    let parent = overlay.parentNode;
    parent.removeChild(overlay);
});

let addCategory = document.getElementById("addCategory");
addCategory.addEventListener("click", (e) => {
    
})