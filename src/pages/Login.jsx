import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <main className="min-h-screen bg-[#f8f7fb] p-3 sm:p-5 md:p-8 flex items-center justify-center login-background">
      <div className="w-full max-w-6xl min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-40px)] md:min-h-[calc(100vh-64px)] border border-gray-200 rounded-xl flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
