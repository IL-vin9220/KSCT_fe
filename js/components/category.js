function addNewCategoryEvent(){
    let container = document.querySelector(".container");
    // console.log(container);
    // console.log(document.getElementById("addNew"));
    
    if(document.getElementById("addNew")){
        if(document.getElementById("addNew").classList.contains("active")){return;}
        else{document.getElementById("addNew").classList.add("active"); return;}
    }

    let addNewCategoryDialog = `
        <div class="form add-new active" id="addNew">
            <div class="dialog">
                <div class="dialog-header">
                    <div class="dialog-header-name">Thêm Mới Danh Mục</div>
                    <div class="icon close-form" onclick = "hideAddNewCategoryDialog()"><i class="fi fi-rs-cross-small"></i></div>
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
                    <!-- <div class="category-icon">
                        <label for="categoryIcon">Icon:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="categoryIcon"></div>
                    </div> -->
                    <div class="category-description">
                        <label for="categoryDescription">Mô tả:</label>
                        <div class="input-wrapper"><textarea name="" id="categoryDescription" class="text-area"></textarea></div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <div class="btn save" id="addNewCategory" onclick = "activeCate()">Lưu</div>
                    <div class="btn close" id="closeForm" onclick = "closeAddNewCategoryDialog()">Đóng</div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", addNewCategoryDialog);
}

function activeCate(){
    document.getElementById("activeCate6").style.display = "block";
    closeAddNewCategoryDialog();
}

function hideAddNewCategoryDialog(){
    document.getElementById("addNew").classList.remove("active");
}

function closeAddNewCategoryDialog(){
    let container = document.querySelector(".container");
    let category = document.getElementById("addNew");
    container.removeChild(category);
}


function getCategoryData(){

    let dialog = document.getElementById("addNew");

    let categoryName = dialog.querySelector("#categoryName");
    let categoryParent = dialog.querySelector("#categoryParent");
    let categoryDescription = dialog.querySelector("#categoryDescription");

    // reset error
    [categoryName, categoryParent, categoryDescription]
        .forEach(input => input.classList.remove("error"));

    // regex

    // tên danh mục: chữ + số + khoảng trắng
    let regexName = /^[a-zA-ZÀ-ỹ0-9\s]{2,50}$/;

    // danh mục cha: chữ hoặc rỗng
    let regexParent = /^[a-zA-ZÀ-ỹ0-9\s]{0,50}$/;

    // mô tả: cho phép ký tự bình thường
    let regexDescription = /^.{0,200}$/;


    // validate

    if(!categoryName.value.trim()){
        categoryName.classList.add("error");
        alert("Chưa nhập tên danh mục");
        return null;
    }

    if(!regexName.test(categoryName.value.trim())){
        categoryName.classList.add("error");
        alert("Tên danh mục chỉ được chứa chữ và số (2-50 ký tự)");
        return null;
    }

    if(!regexParent.test(categoryParent.value.trim())){
        categoryParent.classList.add("error");
        alert("Danh mục cha không hợp lệ");
        return null;
    }

    if(!regexDescription.test(categoryDescription.value.trim())){
        categoryDescription.classList.add("error");
        alert("Mô tả tối đa 200 ký tự");
        return null;
    }

    return {
        name: categoryName.value.trim(),
        parent: categoryParent.value.trim(),
        description: categoryDescription.value.trim()
    };
}

function saveAddNewCategory(){

    let category = getCategoryData();

    if(!category) return;

    console.log("Category:", category);

    // gọi API
    // createCategory(category)

    closeAddNewCategoryDialog();
}