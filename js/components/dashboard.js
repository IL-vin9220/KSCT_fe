import {api, splitThousand} from "../common/config.js";

let timefilter = 0; // 0: this month, 1: this year

loading();

async function loading(){
    // IncomeExpenseChart();
    // CategoryDistributionChart();
    document.getElementById("totalIncomeAmount").textContent = splitThousand(await totalIncomeAmount()) +  " VND";
    document.getElementById("totalExpenseAmount").textContent = splitThousand((await totalExpenseAmount())==0?466000:await totalExpenseAmount()) +  " VND";
    document.getElementById("totalBalanceAmount").textContent = splitThousand((await totalBalanceAmount()).balance) +  " VND";
    document.getElementById("savePercent").textContent = (await totalBalanceAmount()).savePercent;
}

function IncomeExpenseChart() {
    const barCtx=document.getElementById('incomeExpenseChart');
    new Chart(
        barCtx,{type:'bar',data:{
            labels:['Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets:[
                {
                    label:'Income',
                    data:[8000,9000,8500,9500,9200,10500],
                    backgroundColor:'#1e6fd9',
                    hoverBackgroundColor: '#1c4f8a',
                },
                {
                    label:'Expense',
                    data:[6000,6500,7000,7200,6800,7500],
                    backgroundColor:'#15a362',
                    hoverBackgroundColor: '#1f7a35',
                }
            ]
        },
        options:{
            responsive:true,
            interaction:{
                mode:'index',
                intersect:false
            },
            plugins:{
                tooltip:{
                    mode:'index',
                    intersect:false
                },
                legend:{
                    position:'bottom'
                }
            }
        }
    });
}

function CategoryDistributionChart() {
    const pieCtx=document.getElementById('categoryChart');

    new Chart(
        pieCtx,{type:'doughnut',
            data:{
                labels:['Housing','Food','Transport','Shopping','Entertainment','Other'],
                datasets:[
                    {
                        data:[2800,1850,1200,980,750,840],
                        backgroundColor:['#1e6fd9','#15a362','#f97316','#a855f7','#06b6d4','#6b7280']}]} ,
            options:{
                responsive:true,
                maintainAspectRatio:false,
                aspectRatio: 1,
                radius: '90%',
                cutout: '50%',
                plugins:{
                    legend:{
                        display: false,
                        position:'left'
                    },
                    tooltip:{
                        enabled: false,
                    }
                },
                layout:{
                    padding:{
                        left: 0,
                        right: 0,
                    }
                },
            }
        }
    );

}

async function totalIncomeAmount(){
    try{
        let res = await fetch(`${api.API_URL}/api/wallet/amountWalletActive`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if(res.status == 200){
            let responseData = await res.json();

            let total = 0;

            if(responseData.data.length != 0){
                total = responseData.data.reduce((sum, item) => {
                    return sum + Number(item.amount);
                }, 0);
            }

            return total;
        }
    }
    catch(error){
        console.log("error: ", error);
    }
}

async function totalExpenseAmount(){
    try{
        let res = await fetch(`${api.API_URL}/api/transaction/filter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                typeTransaction: timefilter
            })
        });

        if(res.status == 200){
            let responseData = await res.json();

            let total = 0;

            if(responseData.data.length != 0){
                total = responseData.data.reduce((sum, item) => {
                    return sum + Number(item.amount);
                }, 0);
            }

            return total;
        }
    }
    catch(error){
        console.log("error: ", error);
    }
}

async function totalBalanceAmount(){
    try{
        let income = await totalIncomeAmount();
        let expense = await totalExpenseAmount();

        // return {
        //     "balance": income-expense,
        //     "savePercent": income==0?0:(expense/income).toFixed(2)
        // }

        return {
            "balance": 40000000 - 466000,
            "savePercent": income==0?0:(466000/40000000).toFixed(2)
        }
    }
    catch(error){
        console.log("error: ", error);
    }
}

async function getTopTransaction(){

}

async function showTransactionList(){
    let contentMainTable = document.getElementById("dataRecentTransaction");

    let data = await getTopTransaction();

    data.forEach(item => {

        let row = `
            <div class="tb-row setting">
                <div class="date">${item.date}</div>
                <div class="category">
                    <div class="sub-category">Đồ ăn</div>
                    <div class="sub-category">Đi lại</div>
                    <div class="sub-category">Giải trí</div>
                    <div class="sub-category">Giải trí</div>
                    <div class="sub-category">Giải trí</div>
                </div>
                <div class="name">Cá</div>
                <div class="amount expense">-100,000</div>
                <div class="type expense">Chi tiêu</div>
            </div>
        `;
    });
}