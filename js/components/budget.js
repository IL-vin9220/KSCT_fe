const cards = document.querySelectorAll('.budget-card');

cards.forEach(card => {
    const percent = Number(card.dataset.percent);
    const circle = card.querySelector('.progress-fill');
    const percentText = card.querySelector('.progress-percent');

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference * (1 - percent / 100);

    circle.style.setProperty('--progress-offset', offset);

    percentText.textContent = `${percent}% spent`;
});


const monthlyCard = document.querySelector('.monthly-budget');
const percent = Number(monthlyCard.dataset.percent);
const arcFill = monthlyCard.querySelector('.arc-fill');
const percentText = monthlyCard.querySelector('.arc-percent');
const leftLabel = monthlyCard.querySelector('.arc-label');

const totalLength = 251;
const offset = totalLength * (1 - percent / 100);

arcFill.style.strokeDashoffset = totalLength;

requestAnimationFrame(() => {
    arcFill.style.transition = 'stroke-dashoffset 1.6s ease';
    arcFill.style.strokeDashoffset = offset;
});

percentText.textContent = `${percent}% spent`;
leftLabel.textContent = `${100 - percent}% left`;

/* ========================= */
/* Expense list render */
/* ========================= */

const expenseData = [
    {
        icon:'💸',
        price:'$2,500',
        name:'Money transfer',
        trend: 'up',
        change:'15.5%',
        type:'up'
    },
    {
        icon:'☕',
        price:'$1,270',
        name:'Cafe & Restaurants',
        trend: 'up',
        change:'10.2%',
        type:'up'
    },
    {
        icon:'🏠',
        price:'$1,050',
        name:'Rent',
        trend: 'up',
        change:'1.5%',
        type:'up'
    },
    {
        icon:'🎓',
        price:'$650',
        name:'Education',
        trend: 'up',
        change:'6.2%',
        type:'up'
    },
    {
        icon:'🛒',
        price:'$487',
        name:'Food & Groceries',
        trend: 'up',
        change:'5.5%',
        type:'up'
    },
    {
        icon:'✈',
        price:'$350',
        name:'Traveling',
        trend: 'up',
        change:'3.0%',
        type:'up'
    },
    {
        icon:'💚',
        price:'$235',
        name:'Health & Beauty',
        trend: 'down',
        change:'26.3%',
        type:'down'
    }
];

const expenseList = document.querySelector('.expense-list');

expenseData.forEach((item,index)=>{

    const div = document.createElement('div');
    div.className='expense-item';

    div.innerHTML=`
        <div class="expense-left">
            <div class="expense-icon">${item.icon}</div>

            <div class="expense-info">
                <div class="price">${item.price}</div>
                <div class="name">${item.name}</div>
            </div>
        </div>

        <div class="expense-change ${item.type}">
            <i class="${
                item.type === 'up'
                    ? 'fi fi-rs-arrow-small-up'
                    : 'fi fi-rs-arrow-small-down'
            }"></i>
            ${item.change}
        </div>
    `;

    expenseList.appendChild(div);

    setTimeout(()=>{
        div.classList.add('show');
    },index*120);
});

document.getElementById('btn_addNewBudget').addEventListener('click', () =>{
    addNewBudget();
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

function addNewBudget(){
    if(!checkExistsForm('addNewBudget')){
        let container = document.getElementById('container');

        let innerHTML = `
        <div class="form add-new active" id="addNewBudget">
            <div class="dialog">

                <div class="dialog-header">
                    <div class="dialog-header-info">
                        <div class="dialog-header-name">Thêm Ngân Sách</div>
                        <div class="dialog-header-desc">
                            Thiết lập giao dịch để quản lý ngân sách hiệu quả
                        </div>
                    </div>

                    <div class="icon" id="closeForm">
                        ✕
                    </div>
                </div>

                <div class="dialog-content">

                    <div class="form-group">
                        <label for="transactionName">Tên Ngân Sách</label>
                        <div class="input-wrapper">
                            <input
                                type="text"
                                id="transactionName"
                                class="input"
                                placeholder="VD: Ngân Sách Ăn Uống Tháng 1"
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cateogry">Đối Tượng</label>
                        <div class="input-wrapper">
                            <input
                                type="text"
                                id="cateogry"
                                class="input"
                                placeholder="Nhập Tên Danh Mục"
                            />
                        </div>
                    </div>

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

                    <div class="form-row">

                        <div class="form-group half">
                            <label for="transactionTime">Ngày Bắt Đầu</label>
                            <div class="input-wrapper">
                                <input
                                    type="date"
                                    class="input"
                                    id="startDate"
                                />
                            </div>
                        </div>

                        <div class="form-group half">
                            <label for="transactionDate">Ngày Kết Thúc</label>
                            <div class="input-wrapper">
                                <input
                                    type="date"
                                    class="input"
                                    id="endDate"
                                />
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <label for="transactionPlace">Cảnh Báo Khi Chi Tiêu Đạt</label>
                        <div class="input-wrapper">
                            <input
                                type="text"
                                class="input"
                                id="transactionPlace"
                                placeholder="VD: 80% ngân sách,..."
                            />
                        </div>
                    </div>

                </div>

                <div class="dialog-footer">
                    <button class="btn btn-cancel" id="cancelForm">Hủy</button>
                    <button class="btn btn-save" id="saveBudget">Thêm Ngân Sách</button>
                </div>

            </div>
        </div>
        `;

        container.insertAdjacentHTML("beforeend", innerHTML);

        document.getElementById('cancelForm').addEventListener('click', () => {
            closeForm('addNewBudget');
        });

        document.getElementById('saveBudget').addEventListener('click', () => {
            closeForm('addNewBudget');
        });

        document.getElementById('closeForm').addEventListener('click', () => {
            hideForm('addNewBudget');
        });

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('startDate').value = today;
        document.getElementById('endDate').value = today;
    }
    else{
        showForm('addNewBudget');
    }
}