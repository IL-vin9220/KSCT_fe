menuSidebar();

headElement();


function changeSidebarCollapsed(){
    let isCollapsed = localStorage.getAttribute("sidebar");

    if(!isCollapsed){
        localStorage.removeItem("sidebar");
        return;
    }
    localStorage.setItem("sidebar", "collapsed");

}

// render menu sidebar
function menuSidebar(){
    let container = document.querySelector(".container");

    if(!container) return;

    let menu = `
    <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <img src="../assets/KiemSoatChiTieu_logo (1).png" width="30px" height="30px" alt="Kiểm Soát Chi Tiêu">
                    <span>Kiểm Soát Chi Tiêu</span>
                </div>
            </div>
            <div class="sidebar-nav-wapper">
                <ul class="sidebar-nav">
                    <li>
                        <a href="./dashboard.html" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard size-5" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                            <span>Tổng Quan</span>
                        </a>
                    </li>
                    <li>
                        <a href="./transaction.html" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-right size-5" aria-hidden="true"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                            <span>Giao Dịch</span>
                        </a>
                    </li>
                    <li>
                        <a href="./Category.html" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column-stacked-icon lucide-chart-column-stacked"><path d="M11 13H7"/><path d="M19 9h-4"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="15" y="5" width="4" height="12" rx="1"/><rect x="7" y="8" width="4" height="9" rx="1"/></svg>
                            <span>Danh Mục</span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="./Category.html" class="nav-item">
                                    <span>Danh Sách Danh Mục</span>
                                </a>
                            </li>
                            <li>
                                <a href="" class="nav-item">
                                    <span>Danh Mục Thu Nhập</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="./walletList.html" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
                            <span>Ví Tiền</span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="./walletList.html" class="nav-item">
                                    <span>Danh Sách Ví</span>
                                </a>
                            </li>
                            <li>
                                <a href="" class="nav-item">
                                    <span>Lịch Sử Giao Dịch</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="./fundList.html" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>
                            <span>Quỹ Giao Dịch</span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="./fundList.html" class="nav-item">
                                    <span>Danh Sách Quỹ</span>
                                </a>
                            </li>
                            <li>
                                <a href="" class="nav-item">
                                    <span>Lịch Sử Giao Dịch</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="./fundList.html" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>
                            <span>Ngân Sách</span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="./fundList.html" class="nav-item">
                                    <span>Quản Lý Ngân Sách</span>
                                </a>
                            </li>
                            <li>
                                <a href="" class="nav-item">
                                    <span>Lịch Sử Giao Dịch</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tags size-5" aria-hidden="true"><path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"></path><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"></path><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"></circle></svg>
                            <span>Báo Cáo</span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="" class="nav-item">
                                    <span>Tổng Quan</span>
                                </a>
                            </li>
                            <li>
                                <a href="" class="nav-item">
                                    <span>Danh Sách Báo Cáo</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings size-5" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            <span>Cấu Hình</span>
                        </a>
                    </li>
                </ul>
                <div class="scrollbar" id="scrollbar">
                    <div class="thumb" id="thumb"></div>
                </div>
            </div>
            <div class="budget-progress">
                <h3>Ngân Sách Tháng</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 68%"></div>
                </div>
                <p class="progress-text">466.000 / 20.000.000</p>
            </div>
        </aside>
    `;

    container.insertAdjacentHTML("afterbegin", menu);
}


// render head element
function headElement(){
    let link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = '../css/main.css';

    let link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = '../assets/uicons-regular-straight/css/uicons-regular-straight.css';

    let link3 = document.createElement('link');
    link3.rel = 'icon';
    link3.href = '../assets/KiemSoatChiTieu_logo.ico';

    let title = document.createElement("title");
    title.textContent = "Kiểm Soát Chi Tiêu";

    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);
    document.head.appendChild(title);
}