loading();

function loading(){
    IncomeExpenseChart();
    CategoryDistributionChart();
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