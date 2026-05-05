function addNewFund(){
    if(!checkExistsForm('addNewFund')){
        let container = document.getElementById('container');

        let innerHTML = `
            <div class="form add-new active" id="addNewFund">
                <div class="dialog">

                    <!-- HEADER -->
                    <div class="dialog-header">
                        <div class="dialog-header-info">
                            <div class="dialog-header-name">Thêm Quỹ Tài Chính</div>
                            <div class="dialog-header-desc">
                                Tạo quỹ để đạt được mục tiêu tài chính
                            </div>
                        </div>

                        <div class="icon" id="closeForm">
                            ✕
                        </div>
                    </div>

                    <!-- CONTENT -->
                    <div class="dialog-content">

                        <!-- PREVIEW -->
                        <div class="fund-preview" id="preview">
                            <div class="fund-head">
                                <div class="fund-left">
                                    <div class="fund-icon" id="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up size-5 text-success" aria-hidden="true"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                                    </div>

                                    <div>
                                        <div class="fund-name" id="namePreview">Tên quỹ</div>

                                        <!-- thêm dòng này -->
                                        <div class="fund-desc">
                                            <span id="currentPreview">0 đ</span> /
                                            <span id="targetPreview">0 đ</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="fund-percent" id="percent">0%</div>
                            </div>

                            <!-- progress bar -->
                            <div class="progress-wrapper" id="progressWrapper">
                                <div class="progress-bar" id="progressBar"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- NAME -->
                            <label for="name">Tên quỹ</label>
                            <div class="input-wrapper">
                                <input class="input" id="name">
                            </div>
                        </div>
                        

                        <div class="form-group">
                            <!-- TARGET -->
                            <label for="target">Số tiền mục tiêu</label>
                            <div class="input-wrapper">
                                <input class="input" id="target" placeholder = "0">
                            </div>
                        </div>
                        

                        <div class="form-group">
                            <!-- CURRENT -->
                            <label for="current">Số tiền hiện có (tùy chọn)</label>
                            <div class="input-wrapper">
                                <input class="input" id="current" placeholder = "0">
                            </div>
                        </div>
                        

                        <div class="form-group">
                            <!-- DATE -->
                            <label for="date">Ngày mục tiêu</label>
                            <div class="input-wrapper">
                                <input type="date" class="input">
                            </div>
                        </div>
                        

                        <!-- <div class="form-group">
                            
                            <label>Màu</label>
                            <div class="color-list">

                                <div class="color active" data-color="#10b981" style="background:#10b981"></div>
                                <div class="color" data-color="#3b82f6" style="background:#3b82f6"></div>
                                <div class="color" data-color="#8b5cf6" style="background:#8b5cf6"></div>
                                <div class="color" data-color="#f59e0b" style="background:#f59e0b"></div>
                                <div class="color" data-color="#ef4444" style="background:#ef4444"></div>

                                <div style="position:relative">
                                    <div class="color color-rainbow" id="openPicker"></div>
                                    <div class="color-picker" id="picker">
                                        <input type="color" id="pickerInput">
                                        <div class="color-info" id="colorInfo"></div>
                                    </div>
                                </div>

                            </div>
                        </div> -->
                        

                        <!-- TOGGLE -->
                        <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center">
                            <div>
                                <div>Tự động nạp tiền</div>
                                    <div style="font-size:12px;color:#666">Tự động chuyển tiền định kỳ</div>
                                </div>
                                <div class="toggle" id="toggle"></div>
                            </div>

                            <!-- DESCRIPTION -->
                            <div style="margin-top:12px">
                                <label>Mô tả (tùy chọn)</label>
                                <div class="input-wrapper has-textarea-icon">
                                    <span class="input-icon">📝</span>
                                <textarea class="text-area" id="desc" placeholder="Mô tả mục tiêu của quỹ"></textarea>
                            </div>
                        </div>

                    </div>

                    <!-- FOOTER -->
                    <div class="dialog-footer">
                        <button class="btn btn-cancel" id="cancelForm">Hủy</button>
                        <button class="btn btn-save" id="saveFund">Tạo Quỹ</button>
                    </div>

                </div>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", innerHTML);

        document.getElementById('cancelForm').addEventListener('click', () => {
            closeForm('addNewFund');
        });

        document.getElementById('saveFund').addEventListener('click', () => {
            closeForm('addNewFund');
        });

        document.getElementById('closeForm').addEventListener('click', () => {
            hideForm('addNewFund');
        });

        constructorForFund();
    }
    else{
        showForm('addNewFund');
    }
}

document.getElementById('btn_addNewFund').addEventListener('click', () =>{
    addNewFund();
});

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

function constructorForFund(){
    const name = document.getElementById("name");
    const target = document.getElementById("target");
    const current = document.getElementById("current");
    const desc = document.getElementById("desc");

    const namePreview = document.getElementById("namePreview");
    const descPreview = document.getElementById("descPreview");
    const percent = document.getElementById("percent");
    const preview = document.getElementById("preview");

    const targetPreview = document.getElementById("targetPreview");
    const currentPreview = document.getElementById("currentPreview");
    const progressBar = document.getElementById("progressBar");
    const progressWrapper = document.getElementById("progressWrapper");

    /* NAME */
    name.oninput = () => {
        namePreview.innerText = name.value || "Tên quỹ";
    };

    /* DESC */
    desc.oninput = () => {
        descPreview.innerText = desc.value || "Chưa đạt mục tiêu";
    };

    target.oninput = updateProgress;
    current.oninput = updateProgress;

    /* preset */
    document.querySelectorAll(".color[data-color]").forEach(el=>{
        el.onclick=()=>{
            document.querySelectorAll(".color").forEach(i=>i.classList.remove("active"));
            el.classList.add("active");
            applyColor(el.dataset.color);
        };
    });

    /* picker */
    const picker = document.getElementById("picker");
    const pickerInput = document.getElementById("pickerInput");
    const colorInfo = document.getElementById("colorInfo");

    document.getElementById("openPicker").onclick=()=>{
        picker.style.display = picker.style.display==="block"?"none":"block";
    };

    pickerInput.oninput=()=>{
        let hex = pickerInput.value;
        applyColor(hex);

        let bigint = parseInt(hex.slice(1),16);
        let r=(bigint>>16)&255;
        let g=(bigint>>8)&255;
        let b=bigint&255;

        let rgb=`rgb(${r},${g},${b})`;
        let rgba=`rgba(${r},${g},${b},1)`;

        colorInfo.innerText=`${hex}\n${rgb}\n${rgba}`;
        colorInfo.onclick=()=>navigator.clipboard.writeText(hex);
    };

    /* toggle */
    document.getElementById("toggle").onclick=function(){
        this.classList.toggle("active");
    };
}


/* FORMAT MONEY */
function getMoney(input){
    let raw = input.value.replace(/\D/g,"");
    return Number(raw || 0);
}

function formatInput(input){
    let num = getMoney(input);
    input.value = num.toLocaleString();
    return num;
}

/* PROGRESS */
function updateProgress(){

    let t = formatInput(target);
    let c = formatInput(current);

    // update preview text
    targetPreview.innerText = t.toLocaleString() + " đ";
    currentPreview.innerText = c.toLocaleString() + " đ";

    // nếu chưa nhập current thì ẩn progress
    if(!c){
        progressWrapper.style.display = "none";
        percent.innerText = "0%";
        progressBar.style.width = "0%";
        return;
    }

    progressWrapper.style.display = "block";

    let p = t ? Math.min(100, (c/t)*100) : 0;

    // animate %
    animatePercent(p);

    // animate bar
    requestAnimationFrame(()=>{
        progressBar.style.width = p + "%";
    });
}

function animatePercent(targetValue){
    let start = 0;
    let duration = 400;
    let startTime = null;

    function animate(time){
        if(!startTime) startTime = time;
        let progress = time - startTime;
        let value = Math.min(progress / duration * targetValue, targetValue);

        percent.innerText = Math.floor(value) + "%";

        if(progress < duration){
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/* APPLY COLOR */
function applyColor(color){
    preview.style.borderColor = color;
    previewIcon.style.background = color + "22";
    previewIcon.style.color = color;
}
