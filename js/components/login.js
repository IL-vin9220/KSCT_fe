function login(){

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // gửi thông tin tới be xác thực người dùng

    let user = JSON.parse(localStorage.getItem("user"));

    if(user && username === user.username && password === user.password){

        window.location.href="../pages/dashboard.html";
    }else{

    // alert("Sai tài khoản hoặc mật khẩu");
        window.location.href="../pages/dashboard.html";
    }
}

function loginFacebook(){
    alert("Demo đăng nhập bằng Facebook");
}

function loginGoogle(){
    alert("Demo đăng nhập bằng Google");
}