document.getElementById("btn_addNewTransaction").addEventListener("click", addNewTransaction());



// ----------------------logic event----------------------

function addNewTransaction(){
    let container = document.querySelector(".container");

    if(document.getElementById("addNewTransaction")) return;

    let addNewTransactionDialog = `
        <div class="form add-new active" id="addNewTransaction">
            <div class="dialog">
                <div class="dialog-header">
                    <div class="dialog-header-name">Thêm Giao Dịch</div>
                    <div class="icon"><i class="fi fi-rs-cross-small"></i></div>
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
                    <div class="btn save" id="saveTransaction">Lưu</div>
                    <div class="btn close" id="closeForm">Đóng</div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", addNewTransactionDialog);
}

function hideAddNewTransactionDialog(){
    if(!document.getElementById("addNewTransaction")) return;
    else document.getElementById("addNewTransaction").classList.push("active");
}