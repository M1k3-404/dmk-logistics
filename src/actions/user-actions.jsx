const { users } = require("@/data/static-data")

const LogIn = (credentials) => {
    const MatchedUser = users.find(user => user.name.toLowerCase() === credentials.username.toLowerCase());

    if (MatchedUser) {
        if (MatchedUser.password === credentials.password) {
            const session = {
                userId: MatchedUser.id,
                userName: MatchedUser.name,
                userRole: MatchedUser.role
            }

            localStorage.setItem("session", JSON.stringify(session));
            console.log("Logged in successfully");

            window.location.href = "/dashboard";
        } else {
            console.log("Password is incorrect");
            return ("Password is incorrect");
        }
    } else {
        console.log("User not found");
        return ("User not found");
    }
}

const LogOut = () => {
    localStorage.removeItem("session");
    window.location.href = "/login";
}

export { LogIn, LogOut };