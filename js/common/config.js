let api = {
    API_URL: "http://localhost:8050",
    // API_URL: "be-nodejs-kiem-soat-chi-tieu.vercel.app",
};

function splitThousand(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export {
    api,
    splitThousand,
};