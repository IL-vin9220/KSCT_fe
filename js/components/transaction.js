import {api} from "../common/config.js";


loading();

// ----------------------logic event----------------------

async function loading(){
    await dataTableShow();
}

document.getElementById('btn_addNewTransaction').addEventListener("click", () => {addNewTransaction('new')});

async function addNewTransaction(type){
    let container = document.querySelector(".container");

    // lấy danh sách danh mục
    let categoryList = await getCategoryNameList();

    // lấy danh sách ví tiền
    let walletList = await getWalletNameList();

    let categories = [];

    for(let i=0; i<=categoryList.length-1; i++){
        if(categoryList[i].parentId == null){
            // không có parentId thì để cateogry đó làm cha
            let parent = {
                "id": categoryList[i].id,
                "parentName": categoryList[i].categoryName,
                "child": []
            };
            categories.push(parent);
        }
        else{
            // có parentId thì tìm xem là con của cha nào
            categories.forEach(item => {
                if(item.id == categoryList[i].parentId){
                    let child = {
                        "childId": categoryList[i].id,
                        "childName": categoryList[i].categoryName
                    }
                    item.child.push(child);
                }
            });
        }
    }

    let selectCategoryTransactions = `<option value="">Chọn Danh Mục</option>`;
    let selectWalletTransactions = `<option value="">Chọn Ví Tiền</option>`

    categories.forEach(parent => {
        selectCategoryTransactions += `
            <optgroup label="${parent.parentName}">
        `;

        parent.child.forEach(child => {
        selectCategoryTransactions += `
            <option 
                value="${child.childName}"
                data-id="${child.childId}">
                ${child.childName}
            </option>
        `;
        });

        selectCategoryTransactions += `</optgroup>`;
    });

    walletList.forEach(wallet => {
        selectWalletTransactions += `
            <option value="${wallet.walletName}" data-id = ${wallet.id}>${wallet.walletName}</optgroup>`;
    });

    

    if(!checkExistsForm('addNewTransaction')){
        let container = document.querySelector(".container");

        let name = type=="new"?"Thêm Giao Dịch":"Sửa Giao Dịch";


        let addNewTransactionDialog = `
            <div class="form add-new active" id="addNewTransaction">
                <div class="dialog">

                    <div class="dialog-header">
                        <div>
                            <div class="dialog-header-name">${name}</div>
                            <div class="dialog-header-desc">
                                Điền thông tin chi tiết cho giao dịch của bạn
                            </div>
                        </div>

                        <div class="icon" id="closeForm">✕</div>
                    </div>

                    <div class="dialog-content">

                        

                        <!-- tên giao dịch -->
                        <div class="form-group">
                            <label>Tên giao dịch</label>
                            <div class="input-wrapper">
                                <input
                                    type="text"
                                    class="input"
                                    id="transactionName_input"
                                    placeholder="VD: Mua sắm cuối tuần"
                                />
                            </div>
                        </div>

                        <!-- số tiền giao dịch -->
                        <div class="form-group">
                        <label for="transactionAmount">Số tiền Ngân Sách</label>
                        <div class="input-wrapper amount-wrapper has-icon-right">
                            <input
                                type="text"
                                id="transactionAmount_input"
                                class="input"
                                placeholder="0"
                            />
                            <span class="input-icon right currency">VND</span>
                        </div>
                    </div>

                        <!-- ngày + thời điểm -->
                        <div class="form-row">

                            <div class="form-group half">
                                <label>Ngày giao dịch</label>
                                <div class="input-wrapper">
                                    <input
                                        type="date"
                                        class="input"
                                        id="transactionDate_input"
                                    />
                                </div>
                            </div>

                            <div class="form-group half">
                                <label>Thời điểm</label>
                                <div class="input-wrapper">
                                    <select class="select" id="timeSelect_input">
                                        <option value="1">Sáng</option>
                                        <option value="2">Trưa</option>
                                        <option value="3">Chiều</option>
                                        <option value="4">Tối</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <!-- ví -->
                        <div class="form-group">
                            <label>Danh Mục</label>
                            <div class="input-wrapper">
                                <select class="select" id="categorySelect_input">
                                    ${selectCategoryTransactions}
                                </select>
                            </div>
                        </div>

                        <!-- ví -->
                        <div class="form-group">
                            <label>Ví / Tài khoản</label>
                            <div class="input-wrapper">
                                <select class="select" id="walletSelect_input">
                                    ${selectWalletTransactions}
                                </select>
                            </div>
                        </div>

                        <!-- nơi thực hiện -->
                        <div class="form-group">
                            <label>Nơi thực hiện</label>
                            <div class="input-wrapper">
                                <input
                                    type="text"
                                    class="input"
                                    id="transactionPlace_input"
                                    placeholder="VD: Siêu thị, Quán cafe..."
                                />
                            </div>
                        </div>

                        <!-- ghi chú -->
                        <div class="form-group">
                            <label>Ghi chú</label>
                            <div class="input-wrapper">
                                <textarea
                                    class="text-area"
                                    id="transactionNote_input"
                                    placeholder="Nhập ghi chú..."
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    <div class="dialog-footer">
                        <button class="btn btn-cancel" id="cancelForm" type="button">Hủy</button>

                        <button class="btn btn-save" id="saveTransaction" type="button">Thêm Giao Dịch</button>
                    </div>

                </div>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", addNewTransactionDialog);

        document.getElementById('closeForm').addEventListener('click', () => {
            hideForm('addNewTransaction');
        });
        
        document.getElementById('cancelForm').addEventListener('click', () => {
            closeForm('addNewTransaction');
        });

        document.getElementById('saveTransaction').addEventListener('click', async () => {
            await saveTransaction();
            closeForm('addNewTransaction');
        });

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;

        const expenseTab = document.getElementById("expenseTab");
        const incomeTab = document.getElementById("incomeTab");

        // document.getElementById().addEventListener("load", () => {
            
        // });

        // expenseTab.addEventListener("click", () => {
        //     expenseTab.classList.add("active");
        //     incomeTab.classList.remove("active");
        // });

        // incomeTab.addEventListener("click", () => {
        //     incomeTab.classList.add("active");
        //     expenseTab.classList.remove("active");
        // });
    }
    else{
        showForm('addNewTransaction');
    }
}

function hideForm(id){
    if(checkExistsForm(id)){
        // remote classname active
        document.getElementById(id).classList.remove("active");
    }
}

function showForm(id){
    if(checkExistsForm(id)){
        // add classname active
        document.getElementById(id).classList.add("active");
    }
}

function closeForm(id){
    if(checkExistsForm(id)){
        // lấy ra cha
        let form = document.getElementById(id);
        let parent = form.parentNode;

        parent.removeChild(form);
    }
}

function checkExistsForm(id){
    if(document.getElementById(id)){
        return true;
    }
    return false;
}

function active(id){

    let icon = document.getElementById(id);

    icon.classList.toggle("active");
    icon.classList.toggle("inactive");
}

function activeRow(){
    closeAddNewTransactionDialog();
    document.getElementById("none").style.display = "block";
}

function editTrans(){
    addNewTransaction('new');
    document.getElementById("addNewTransaction").querySelector("#transactionName").value= "Ăn Tối";
    document.getElementById("addNewTransaction").querySelector("#transactionAmount").value= "30,000";
    document.getElementById("addNewTransaction").querySelector("#transactionTime").value= "Buổi Tối";
    document.getElementById("addNewTransaction").querySelector("#transactionDate").value= "16/04/2026";
    document.getElementById("addNewTransaction").querySelector("#transactionPlace").value= "";
    document.getElementById("addNewTransaction").querySelector("#textArea").value="";

    document.getElementById("saveTransaction").onclick = ()=>{editTrans2()};
}

function editTrans2(){
    closeAddNewTransactionDialog();
    document.getElementById("gaxaonam").textContent = "Cơm Gà Xào Nấm";
}

function softdelete(id){
    document.getElementById(id).style.display = "none";
}

async function dataTableShow(){
    // lấy dữ liệu từ backend
    let dataResponse = await getAllDataTransaction();

    renderTransactionTable(dataResponse);


}

function renderTransactionTable(data) {
    const grouped = {};
    let parent = document.getElementById("dataTable");

    // group theo giao dịch cha
    data.forEach(item => {
        if (!grouped[item.transactionCode]) {
            grouped[item.transactionCode] = {
                parent: {
                    transactionCode: item.transactionCode,
                    transactionTotalAmount: item.transactionTotalAmount,
                    transactionDate: item.transactionDate,
                    transactionTime: item.transactionTime
                },
                children: []
            };
        }

        grouped[item.transactionCode].children.push({
            transactionDetailCode: item.transactionDetailCode,
            transactionName: item.transactionName,
            transactionAmount: item.transactionAmount,
            categoryName: item.categoryName
        });
    });

    let html = "";
    let parentIndex = 1;

    Object.values(grouped).forEach(group => {
        const activeId = `active${parentIndex}`;

        html += `
        <div class="tb-row">
            <div class="tb-row setting parent" data-code="${group.parent.transactionCode}">
                <div class="wrap-function">
                    <div class="icon detail" data-target="${activeId}">
                        <i class="fi fi-rs-angle-double-small-right"></i>
                    </div>
                    <input type="checkbox" class="ckb" name="ckb">
                </div>
                <div class="stt">${parentIndex}</div>
                <div class="code">${group.parent.transactionCode}</div>
                <div class="amount">${formatMoney(group.parent.transactionTotalAmount)}</div>
                <div class="date">${formatDate(group.parent.transactionDate)}</div>
                <div class="time">${formatTime(group.parent.transactionTime)}</div>
                <div class="actions">
                    <div class="icon edit" title="Chỉnh sửa" style="opacity: 0">
                        <i class="fi fi-rs-pencil"></i>
                    </div>
                    <div class="icon archive" title="Lưu trữ giao dịch">
                        <i class="fi fi-rs-folder-download"></i>
                    </div>
                    <div class="icon cancel" title="Hủy giao dịch">
                        <i class="fi fi-rs-rectangle-xmark"></i>
                    </div>
                    <div class="icon delete" title="Xóa giao dịch">
                        <i class="fi fi-rs-trash"></i>
                    </div>
                </div>
            </div>

            <div class="child inactive" id="${activeId}">
                <div class="tb-row setting child-head">
                    <div class="wrap-function">
                        <div class="icon detail disable">
                            <i class="fi fi-rs-angle-double-small-right"></i>
                        </div>
                        <input type="checkbox" class="ckb" name="ckb" style="opacity: 0;">
                    </div>
                    <div class="stt">STT</div>
                    <div class="code">Mã Giao Dịch Con</div>
                    <div class="name">Tên Giao Dịch Con</div>
                    <div class="amount">Số Tiền</div>
                    <div class="category">Danh Mục</div>
                    <div class="actions">Hành Động</div>
                </div>
        `;

        group.children.forEach((child, index) => {
            const deleteId = `delete${parentIndex}_${index + 1}`;

            html += `
                <div class="tb-row setting child-content" 
                     id="${deleteId}" 
                     data-code="${child.transactionDetailCode}">
                    <div class="wrap-function">
                        <div class="icon detail disable">
                            <i class="fi fi-rs-angle-double-small-right"></i>
                        </div>
                        <input type="checkbox" class="ckb" name="ckb">
                    </div>
                    <div class="stt">${index + 1}</div>
                    <div class="code">${child.transactionDetailCode}</div>
                    <div class="name">${child.transactionName}</div>
                    <div class="amount expense">
                        ${formatMoney(child.transactionAmount)}
                    </div>
                    <div class="category">
                        <div class="sub-category">${child.categoryName}</div>
                    </div>
                    <div class="actions">
                        <div class="icon edit" title="Chỉnh sửa">
                            <i class="fi fi-rs-pencil"></i>
                        </div>
                        <div class="icon archive" title="Lưu trữ giao dịch">
                            <i class="fi fi-rs-folder-download"></i>
                        </div>
                        <div class="icon cancel" title="Hủy giao dịch">
                            <i class="fi fi-rs-rectangle-xmark"></i>
                        </div>
                        <div class="icon delete" 
                             title="Xóa giao dịch"
                             onclick="softdelete('${deleteId}')">
                            <i class="fi fi-rs-trash"></i>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            </div>
        </div>
        `;

        parentIndex++;
    });

    parent.innerHTML += html;

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".icon.detail");

        if (!btn) return;

        const targetId = btn.dataset.target;
        active(targetId);
    });
}

// format tiền
function formatMoney(amount) {
    return Number(amount).toLocaleString("vi-VN");
}

// format ngày
function formatDate(date) {
    return new Date(date).toLocaleDateString("vi-VN");
}

// format thời gian
function formatTime(time) {
    const timeMap = {
        1: "Buổi Sáng",
        2: "Buổi Trưa",
        3: "Buổi Chiều",
        4: "Buổi Tối"
    };

    return timeMap[time] || "";
}

// -------------------------fetch---------------------------

function getTransactionData(){

    let dialog = document.getElementById("addNewTransaction");

    let transaction = {
        name: dialog.querySelector("#transactionName_input"),
        amount: dialog.querySelector("#transactionAmount_input"),
        time: dialog.querySelector("#timeSelect_input"),
        category: dialog.querySelector("#categorySelect_input"),
        wallet: dialog.querySelector("#walletSelect_input"),
        date: dialog.querySelector("#transactionDate_input"),
        place: dialog.querySelector("#transactionPlace_input"),
        description: dialog.querySelector("#transactionNote_input")
    };

    // reset error
    // Object.values(transaction).forEach(input => {
    //     input.classList.remove("error");
    // });

    // regex
    let regexAmount = /^[0-9]+$/;
    let regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;
    let regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

    // validate rỗng
    if(!transaction.name.value.trim()){
        transaction.name.classList.add("error");
        alert("Chưa nhập tên giao dịch");
        return null;
    }

    if(!transaction.amount.value.trim()){
        transaction.amount.classList.add("error");
        alert("Chưa nhập số tiền");
        return null;
    }

    if(!regexAmount.test(transaction.amount.value.trim())){
        transaction.amount.classList.add("error");
        alert("Số tiền phải là số");
        return null;
    }

    // if(!regexTime.test(transaction.time.value.trim())){
    //     transaction.time.classList.add("error");
    //     alert("Thời gian phải dạng HH:mm");
    //     return null;
    // }

    // if(!regexDate.test(transaction.date.value.trim())){
    //     transaction.date.classList.add("error");
    //     alert("Ngày phải dạng dd/mm/yyyy");
    //     return null;
    // }

    let result = {
        name: transaction.name.value.trim(),
        amount: transaction.amount.value.trim(),
        time: transaction.time.options[transaction.time.selectedIndex].value,
        categoryId: transaction.category.options[transaction.category.selectedIndex].dataset.id,
        walletId: transaction.wallet.options[transaction.wallet.selectedIndex].dataset.id,
        date: transaction.date.value.trim(),
        placeName: transaction.place.value.trim(),
        placeLocation: "",
        placeAddress: "",
        note: transaction.description.value.trim()
    };

    return result;
}

async function saveTransaction(){
    try{
        let transaction = getTransactionData();
        console.log(JSON.stringify(transaction));

        if(!transaction) return;

        let transactionPost = await fetch(`${api.API_URL}/api/transaction/add-new`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(transaction)
        });

        if (!transactionPost.ok) {
                throw new Error("Không xác thực được người dùng");
        }
        console.log("thêm mới thành công");
    }
    catch(error){
        console.error(error);
    }
}

async function getAllDataTransaction(){
    try{
        let dataResponse = await fetch(`${api.API_URL}/api/transaction/get-transaction-by-page?limit=100&page=1`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        let data = await dataResponse.json();
        console.log(data.data);
        return data.data;
    }
    catch(error){
        console.error(error);
    }
}

async function getCategoryNameList(){
    try{
        let dataResponse = await fetch(`${api.API_URL}/api/category/name-list`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        let data = await dataResponse.json();
        console.log(data);
        return data.data;
    }
    catch(error){
        console.error(error);
    }
}

async function getWalletNameList(){
    try{
        let dataResponse = await fetch(`${api.API_URL}/api/wallet/name-list`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        let data = await dataResponse.json();
        console.log(data);
        return data.data;
    }
    catch(error){
        console.error(error);
    }
}