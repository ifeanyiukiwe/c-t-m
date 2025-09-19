// import { useState } from "react";
// import axios from "axios";

// function Auth({ setToken, setIsLoggedIn }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   // const API_URL = "https://c-t-m.onrender.com";
//   const API_URL = "http://localhost:5000";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = isLogin ? "/auth/login" : "/auth/signup";
//       const res = await axios.post(`${API_URL}${endpoint}`, {
//         email,
//         password,
//       });
//       localStorage.setItem("token", res.data.token);
//       setToken(res.data.token);
//       setIsLoggedIn(true);
//     } catch (error) {
//       alert(error.response?.data?.error || "Authentication failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>
//         <p className="text-center mt-4 text-sm">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-600 underline"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Auth;

import { useState } from "react";
import axios from "axios";

function Auth({ setToken, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Local backend
  const API_URL = "https://c-t-m.onrender.com";
  // const API_URL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const res = await axios.post(`${API_URL}${endpoint}`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.error || "Authentication failed");
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
