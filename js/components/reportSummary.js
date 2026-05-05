
/* ===== PIE ===== */
const pieData = [
{label:"Ăn uống",value:30,color:"#10b981"},
{label:"Mua sắm",value:25,color:"#f59e0b"},
{label:"Hóa đơn",value:10,color:"#ef4444"},
{label:"Di chuyển",value:15,color:"#3b82f6"},
{label:"Giải trí",value:5,color:"#8b5cf6"},
{label:"Sức khỏe",value:15,color:"#ec4899"}
];

new Chart(document.getElementById("pie"),{
type:"doughnut",
data:{
labels:pieData.map(i=>i.label),
datasets:[{
data:pieData.map(i=>i.value),
backgroundColor:pieData.map(i=>i.color),
borderWidth:4,
borderColor:"#fff",
cutout:"65%"
}]
},
options:{plugins:{legend:{display:false}}}
});

/* custom legend */
const legend = document.getElementById("legend");
pieData.forEach(i=>{
let el=document.createElement("div");
el.className="legend-item";
el.innerHTML=`<div class="dot" style="background:${i.color}"></div>${i.label}`;
legend.appendChild(el);
});

/* ===== BAR ===== */
new Chart(document.getElementById("bar"),{
type:"bar",
data:{
labels:["Mua sắm","Ăn uống","Sức khỏe","Di chuyển","Hóa đơn"],
datasets:[{
data:[2500000,1900000,1300000,900000,700000],
backgroundColor:["#f59e0b","#10b981","#ec4899","#3b82f6","#ef4444"],
borderRadius:6
}]
},
options:{
indexAxis:"y",
plugins:{legend:{display:false}},
scales:{
x:{grid:{display:false}},
y:{grid:{display:false}}
}
}
});

/* ===== LINE ===== */
const ctx = document.getElementById("line").getContext("2d");

/* gradient */
const gradient = ctx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, "rgba(16,185,129,0.35)");
gradient.addColorStop(1, "rgba(16,185,129,0)");

function formatMoney(v){
    return v.toLocaleString("vi-VN") + " đ";
}

new Chart(ctx,{
    type:"line",

    data:{
        labels:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"],
        datasets:[{
            data:[0,0,200000,0,300000,200000,150000,1200000,0,0,200000,100000,600000,2500000],

            borderColor:"#10b981",
            backgroundColor:gradient,
            fill:true,

            tension:.45,
            borderWidth:2,

            pointRadius:0,
            pointHitRadius:20,

            pointHoverRadius:6,
            pointHoverBackgroundColor:"#10b981",
            pointHoverBorderColor:"#fff",
            pointHoverBorderWidth:2
        }]
    },

    options:{
        responsive:true,
        maintainAspectRatio:false,

        interaction:{
            mode:"index",
            intersect:false
        },

        animation:{
            duration:600,
            easing:"easeOutCubic"
        },

        plugins:{
            legend:{display:false},

            tooltip:{
                enabled:true,
                backgroundColor:"#111827",
                padding:10,
                cornerRadius:10,
                displayColors:false,

                callbacks:{
                    title:(items)=>`Ngày ${items[0].label}`,
                    label:(item)=>formatMoney(item.raw)
                }
            }
        },

        scales:{
            x:{
                grid:{display:false},
                ticks:{color:"#9ca3af"}
            },
            y:{
                grid:{color:"rgba(0,0,0,0.05)"},
                ticks:{
                    color:"#9ca3af",
                    callback:(v)=> v===0 ? "0" : (v/1000)+"K"
                }
            }
        }
    },

    plugins:[{
        id:"hoverLine",
        afterDraw(chart){
            const active = chart.getActiveElements(); // ✅ FIX CHUẨN

            if(active.length){
                const ctx = chart.ctx;
                const x = active[0].element.x;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;

                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([4,4]);
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(0,0,0,0.15)";
                ctx.stroke();
                ctx.restore();
            }
        }
    }]
});