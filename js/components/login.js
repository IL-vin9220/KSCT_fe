async function login(){
    try {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        console.log("username: ", username);
        console.log("password: ", password);

        let res = await fetch("https://be-nodejs-kiem-soat-chi-tieu.vercel.app/api/user/get-user?username='${username}'&password='${password}'", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Không xác thực được người dùng");
        }

        let user = await res.json();

        console.log("User:", user);

        return user;
    } catch (error) {
        console.error(error);

        // nếu chưa login thì redirect
        alert("Sai thông tin")
    }

}

function loginFacebook(){
alert("Demo đăng nhập bằng Facebook");
}

function loginGoogle(){
alert("Demo đăng nhập bằng Google");
}
