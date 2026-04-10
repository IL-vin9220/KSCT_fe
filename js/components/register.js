async function login(){
    try {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let replypassword = document.getElementById("replypassword").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;

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

        let user = await res.json();

        if (!user) {
            throw new Error("Không xác thực được người dùng");
        }

        localStorage.setItem("user", JSON.stringify(user.data));

        location.href = "../../pages/dashboard.html";

        return user;
    } catch (error) {
        console.error(error);
    }

}