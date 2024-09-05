import LoginForm from "@/components/Login/loginForm";

export default function Login() {
    return (
        <div className="w-screen h-screen bg-[#24272B] flex justify-end items-center bg-cover bg-center" style={{ backgroundImage: "url('/login-bg2.png')"}}>
            <div className="w-[35%] h-[95%] bg-white rounded-lg mx-5">
                <p className="text-4xl font-semibold text-center mt-36">Welcome!</p>
                <p className="text-sm text-center mt-2">Please enter your credentials to login</p>

                <LoginForm />
            </div>
        </div>
    );
}