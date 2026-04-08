// ------------------event----------------------

document.getElementById("addNew").addEventListener("click", (e) => {
    let overlay = document.getElementById("addNew");
    let dialog = overlay.querySelector(".dialog");

    if(!dialog.contains(e.target)){
        overlay.classList.remove("active");
    }
});

document.addEventListener("click", (e) => {
    let overlay = document.getElementById("addNew");
    let parent = overlay.parentElement;
    parent.removeChild(overlay);
});

let addCategory = document.getElementById("addCategory");
addCategory.addEventListener("click", addNewCategoryEvent);


// --------------------logic event--------------------


function addNewCategoryEvent(){
    let container = document.querySelector(".container");
    console.log(container);
    console.log(document.getElementById("addNew"));
    
    if(document.getElementById("addNew")) return;

    let addNewCategoryDialog = `
        <div class="form add-new active" id="addNew">
            <div class="dialog">
                <div class="dialog-header">
                    <div class="dialog-header-name">Thêm Mới Danh Mục</div>
                    <div class="icon close-form"><i class="fi fi-rs-cross-small"></i></div>
                </div>
                <div class="dialog-content">
                    <div class="category-name">
                        <label for="categoryName">Tên Danh Mục:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="categoryName"></div>
                    </div>
                    <div class="category-parent">
                        <label for="categoryParent">Danh Mục cha:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="categoryParent"></div>
                    </div>
                    <div class="category-icon">
                        <label for="categoryIcon">Icon:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="categoryIcon"></div>
                    </div>
                    <div class="category-description">
                        <label for="categoryDescription">Mô tả:</label>
                        <div class="input-wrapper"><textarea name="" id="categoryDescription" class="text-area"></textarea></div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <div class="btn save" id="addNewCategory">Lưu</div>
                    <div class="btn close" id="closeForm">Đóng</div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", addNewCategoryDialog);
}