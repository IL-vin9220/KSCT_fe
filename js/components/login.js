import {api} from "../common/config.js"

async function login(){
    try {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        // console.log("username: ", username);
        // console.log("password: ", password);

        let res = await fetch(`${api.API_URL}/api/user/get-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (!res.ok) {
            throw new Error("Không xác thực được người dùng");
        }

        let user = await res.json();

        console.log("User:", user);

        location.href = "../../pages/dashboard.html";

        return user;
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