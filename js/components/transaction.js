// ----------------------logic event----------------------

function addNewTransaction(){
    let container = document.querySelector(".container");

    if(document.getElementById("addNewTransaction")){
        if(document.getElementById("addNewTransaction").classList.contains("active")){return;}
        else{document.getElementById("addNewTransaction").classList.add("active"); return;}
    }


    let addNewTransactionDialog = `
        <div class="form add-new active" id="addNewTransaction">
            <div class="dialog">
                <div class="dialog-header">
                    <div class="dialog-header-name">Thêm Giao Dịch</div>
                    <div class="icon close-form" onclick = "hideAddNewTransactionDialog()"><i class="fi fi-rs-cross-small"></i></div>
                </div>
                <div class="dialog-content">
                    <div class="transaction-name">
                        <label for="transactionName">Giao Dịch:</label>
                        <div class="input-wrapper"><input type="text" id="transactionName" class="input"></div>
                    </div>
                    <div class="transaction-amount">
                        <label for="transactionAmount">Số Tiền:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="transactionAmount"></div>
                    </div>
                    <div class="transaction-date-time">
                        <div class="transaction-time">
                            <label for="transactionTime">Thời Điểm:</label>
                            <div class="input-wrapper"><input type="text" class="input" id="transactionTime"></div>
                        </div>
                        <div class="transaction-date">
                            <label for="transactionDate">Ngày Giao Dịch:</label>
                            <div class="input-wrapper"><input type="text" class="input" id="transactionDate"></div>
                        </div>
                    </div>
                    <div class="transaction-place">
                        <label for="transactionPlace">Nơi Thực Hiện:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="transactionPlace"></div>
                    </div>
                    <div class="transaction-description">
                        <label for="textArea">Ghi Chú:</label>
                        <div class="input-wrapper">
                            <textarea class="text-area" id="textArea"></textarea>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <div class="btn save" id="saveTransaction" onclick = "saveTransaction()">Lưu</div>
                    <div class="btn close" id="closeForm" onclick = "closeAddNewTransactionDialog()">Đóng</div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", addNewTransactionDialog);
}

function hideAddNewTransactionDialog(){
    document.getElementById("addNewTransaction").classList.remove("active");
}

function closeAddNewTransactionDialog(){
    let container = document.querySelector(".container");
    let transaction = document.getElementById("addNewTransaction");
    container.removeChild(transaction);
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