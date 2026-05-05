document.getElementById('btn_addNewWallet').addEventListener('click', () => {
    addNewTransaction('new');
});


function addNewTransaction(type){
    if(!checkExistsForm('addNewWallet')){
        let container = document.querySelector(".container");

        let name = type=="new"?"Thêm Ví Tiền":"Sửa Ví Tiền";


        let addNewTransactionDialog = `
                <div class="form add-new active" id="addNewWallet">
                    <div class="dialog">

                        <!-- HEADER -->
                        <div class="dialog-header">
                            <div class="dialog-header-info">
                                <div class="dialog-header-name">${name}</div>
                                <div class="dialog-header-desc">
                                    Tạo ví mới
                                </div>
                            </div>

                            <div class="icon" id="closeForm">
                                ✕
                            </div>
                        </div>

                        <!-- CONTENT -->
                        <div class="dialog-content">

                            <!-- PREVIEW -->
                            <div class="wallet-preview" id="preview">
                                <div class="wallet-icon" id="previewIcon">📱</div>
                                <div>
                                    <div class="wallet-name" id="previewName">Tên ví</div>
                                    <div class="wallet-balance" id="previewMoney">0 đ</div>
                                </div>
                            </div>

                            <!-- NAME -->
                            <div class="form-group">
                                <label>Tên ví</label>
                                <div class="input-wrapper">
                                    <input type="text" class="input" id="walletName">
                                </div>
                            </div>

                            <!-- MONEY -->
                            <div class="form-group">
                                <label>Số dư</label>
                                <div class="input-wrapper">
                                    <input type="text" class="input" id="walletMoney">
                                </div>
                            </div>

                            <!-- TYPE -->
                            <div class="form-group">
                                <label>Loại ví</label>
                                <div class="wallet-types">
                                    <div class="wallet-type active" data-icon="📱">Ví điện tử</div>
                                    <div class="wallet-type" data-icon="💵">Tiền mặt</div>
                                    <div class="wallet-type" data-icon="🏦">Ngân hàng</div>
                                    <div class="wallet-type" data-icon="💳">Thẻ</div>
                                </div>
                            </div>

                            <!-- COLOR -->
                            <div class="form-group">
                                <label>Màu</label>

                                <div class="color-list">

                                    <div class="color active" style="background:#10b981" data-color="#10b981"></div>
                                    <div class="color" style="background:#3b82f6" data-color="#3b82f6"></div>
                                    <div class="color" style="background:#8b5cf6" data-color="#8b5cf6"></div>
                                    <div class="color" style="background:#f59e0b" data-color="#f59e0b"></div>
                                    <div class="color" style="background:#ff4d4f" data-color="#ff4d4f"></div>

                                    <!-- rainbow -->
                                    <div style="position:relative">
                                        <div class="color color-rainbow" id="openPicker"></div>

                                        <div class="color-picker-box" id="pickerBox">
                                            <input type="color" id="colorPicker">
                                            <div class="color-info" id="colorInfo"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <!-- FOOTER -->
                        <div class="dialog-footer">
                            <button class="btn btn-cancel" id="cancelForm">Hủy</button>
                            <button class="btn btn-save" id="saveWallet">Thêm Ví</button>
                        </div>

                    </div>
                </div>
        `;

        container.insertAdjacentHTML("beforeend", addNewTransactionDialog);

        document.getElementById('cancelForm').addEventListener('click', () => {
            closeForm('addNewWallet');
        });

        document.getElementById('saveWallet').addEventListener('click', () => {
            closeForm('addNewWallet');
        });

        document.getElementById('closeForm').addEventListener('click', () => {
            hideForm('addNewWallet');
        });

        constructorFormWallet();
    }
    else{
        showForm('addNewWallet')
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

function constructorFormWallet(){
    const nameInput = document.getElementById("walletName");
    const moneyInput = document.getElementById("walletMoney");

    const previewName = document.getElementById("previewName");
    const previewMoney = document.getElementById("previewMoney");
    const previewIcon = document.getElementById("previewIcon");
    const preview = document.getElementById("preview");

    /* NAME */
    nameInput.oninput = () => {
        previewName.innerText = nameInput.value || "Tên ví";
    };

    /* MONEY FORMAT */
    moneyInput.oninput = () => {
        let raw = moneyInput.value.replace(/\D/g, "");
        let num = Number(raw || 0);

        previewMoney.innerText = num.toLocaleString() + " đ";
        moneyInput.value = num.toLocaleString();
    };

    /* TYPE */
    document.querySelectorAll(".wallet-type").forEach(item => {
        item.onclick = () => {
            document.querySelectorAll(".wallet-type").forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            previewIcon.innerText = item.dataset.icon;
        };
    });

    /* PRESET COLOR */
    document.querySelectorAll(".color[data-color]").forEach(c => {
        c.onclick = () => {
            document.querySelectorAll(".color").forEach(i => i.classList.remove("active"));
            c.classList.add("active");
            applyColor(c.dataset.color);
        };
    });

    /* PICKER */
    const pickerBox = document.getElementById("pickerBox");
    const colorPicker = document.getElementById("colorPicker");
    const colorInfo = document.getElementById("colorInfo");

    document.getElementById("openPicker").onclick = () => {
        pickerBox.style.display = pickerBox.style.display === "block" ? "none" : "block";
    };

    colorPicker.oninput = () => {
        const hex = colorPicker.value;

        applyColor(hex);

        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        const rgb = `rgb(${r}, ${g}, ${b})`;
        const rgba = `rgba(${r}, ${g}, ${b}, 1)`;

        colorInfo.innerText = `${hex}\n${rgb}\n${rgba}`;

        // click copy
        colorInfo.onclick = () => {
            navigator.clipboard.writeText(hex);
        };
    };
}

/* APPLY COLOR */
function applyColor(color){
    preview.style.borderColor = color;
    previewIcon.style.background = color + "22";
    previewIcon.style.color = color;
}
