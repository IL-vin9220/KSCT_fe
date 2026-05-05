// ----------------------logic event----------------------

function addNewTransaction(type){
    let container = document.querySelector(".container");

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

                        <!-- loại giao dịch -->
                        <div class="transaction-type">
                            <button
                                class="transaction-tab expense active"
                                id="expenseTab"
                                type="button"
                            >
                                Chi Tiêu
                            </button>

                            <button
                                class="transaction-tab income"
                                id="incomeTab"
                                type="button"
                            >
                                Thu Nhập
                            </button>
                        </div>

                        <!-- tên giao dịch -->
                        <div class="form-group">
                            <label>Tên giao dịch</label>
                            <div class="input-wrapper">
                                <input
                                    type="text"
                                    class="input"
                                    placeholder="VD: Mua sắm cuối tuần"
                                />
                            </div>
                        </div>

                        <!-- số tiền giao dịch -->
                        <div class="form-group">
                        <label for="transactionAmount">Số tiền Ngân Sách</label>
                        <div class="input-wrapper amount-wrapper">
                            <input
                                type="text"
                                id="transactionAmount"
                                class="input"
                                placeholder="0"
                            />
                            <span class="currency">VND</span>
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
                                        id="transactionDate"
                                    />
                                </div>
                            </div>

                            <div class="form-group half">
                                <label>Thời điểm</label>
                                <div class="input-wrapper">
                                    <select class="select">
                                        <option>Sáng</option>
                                        <option>Trưa</option>
                                        <option>Chiều</option>
                                        <option>Tối</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <!-- ví -->
                        <div class="form-group">
                            <label>Ví / Tài khoản</label>
                            <div class="input-wrapper">
                                <select class="select">
                                    <option>Chọn ví tiền</option>
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
                                    placeholder="Nhập ghi chú..."
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    <div class="dialog-footer">
                        <button class="btn btn-cancel" id="cancelForm" type="button">Hủy</button>

                        <button class="btn btn-save" id="saveTransaction" type="button">Tạo Giao Dịch</button>
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

        document.getElementById('saveTransaction').addEventListener('click', () => {
            closeForm('addNewTransaction');
        });

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;

        const expenseTab = document.getElementById("expenseTab");
        const incomeTab = document.getElementById("incomeTab");

        expenseTab.addEventListener("click", () => {
            expenseTab.classList.add("active");
            incomeTab.classList.remove("active");
        });

        incomeTab.addEventListener("click", () => {
            incomeTab.classList.add("active");
            expenseTab.classList.remove("active");
        });
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

// -------------------------fetch---------------------------

function getTransactionData(){

    let dialog = document.getElementById("addNewTransaction");

    let transaction = {
        name: dialog.querySelector("#transactionName"),
        amount: dialog.querySelector("#transactionAmount"),
        time: dialog.querySelector("#transactionTime"),
        date: dialog.querySelector("#transactionDate"),
        place: dialog.querySelector("#transactionPlace"),
        description: dialog.querySelector("#textArea")
    };

    // reset error
    Object.values(transaction).forEach(input => {
        input.classList.remove("error");
    });

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

    return {
        code: `T_${Math.random().toString(36).substring(2, 8)}`,
        amount: Number(transaction.amount.value.trim()),
        time: transaction.time.value.trim(),
        date: transaction.date.value.trim(),
        place: transaction.place.value.trim(),
        description: transaction.description.value.trim(),
        userID: JSON.parse(localStorage.user).id
    };
}

async function saveTransaction(){

    let transaction = getTransactionData();

    if(!transaction) return;

    let transactionPost = await fetch(`http://localhost:8050/api/transaction/add-new`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transaction)
    });

    if (!transactionPost.ok) {
            throw new Error("Không xác thực được người dùng");
    }

    closeAddNewTransactionDialog();
    
}