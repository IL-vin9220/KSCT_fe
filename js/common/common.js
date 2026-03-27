
function changeSidebarCollapsed(){
    let isCollapsed = localStorage.getAttribute("sidebar");

    if(!isCollapsed){
        localStorage.removeItem("sidebar");
        return;
    }
    localStorage.setItem("sidebar", "collapsed");

}