import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const auth = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await auth?.googleLogin();
      alert("Login Successful!");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">SaveNest</h1>

        <button
          onClick={handleGoogleLogin}
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}