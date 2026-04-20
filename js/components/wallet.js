function addNewTransaction(type){
    let container = document.querySelector(".container");

    // if(document.getElementById("addNewTransaction")){
    //     if(document.getElementById("addNewTransaction").classList.contains("active")){return;}
    //     else{document.getElementById("addNewTransaction").classList.add("active"); return;}
    // }

    let name = type=="new"?"Thêm Ví Tiền":"Sửa Ví Tiền";


    let addNewTransactionDialog = `
        <div class="form add-new active" id="addNewTransaction">
            <div class="dialog">
                <div class="dialog-header">
                    <div class="dialog-header-name">${name}</div>
                    <div class="icon close-form" onclick = "hideAddNewTransactionDialog()"><i class="fi fi-rs-cross-small"></i></div>
                </div>
                <div class="dialog-content">
                    <div class="transaction-name">
                        <label for="transactionName">Tên Ví Tiền:</label>
                        <div class="input-wrapper"><input type="text" id="transactionName" class="input"></div>
                    </div>
                    <div class="transaction-amount">
                        <label for="transactionAmount">Số Tiền:</label>
                        <div class="input-wrapper"><input type="text" class="input" id="transactionAmount"></div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <div class="btn save" id="saveTransaction" onclick = "activeRow()">Lưu</div>
                    <div class="btn close" id="closeForm" onclick = "closeAddNewTransactionDialog()">Đóng</div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", addNewTransactionDialog);

    closeAddNewTransactionDialog();

    document.getElementById("wallet1").style.display = "block";
    document.getElementById("wallet2").style.display = "block";
}

function closeAddNewTransactionDialog(){
    let container = document.querySelector(".container");
    let transaction = document.getElementById("addNewTransaction");
    container.removeChild(transaction);
}