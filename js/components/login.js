import {api} from "../common/config.js"

async function login(){
    try {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        // console.log("username: ", username);
        // console.log("password: ", password);

        let res = await fetch(`${api.API_URL}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                password
            })
        });

        if (res.status == 200) {
            location.href = "../../pages/dashboard.html";
        }
        else{
            throw new Error("Không xác thực được người dùng");
        }
    } catch (error) {
        console.error(error);

        // nếu chưa login thì redirect
        alert("Sai thông tin")
    }

}

document.getElementById("login").addEventListener("click", login);

function loginFacebook(){
alert("Demo đăng nhập bằng Facebook");
}

function loginGoogle(){
alert("Demo đăng nhập bằng Google");
}