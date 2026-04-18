import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLogin() {
      const navigate = useNavigate();
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: "683542883914-k0n72r85e493gc1972dd1kvfc8m6a3kg.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);

  async function handleCredentialResponse(response: any) {
    console.log("token:",response)
   const res = await fetch("http://localhost:5000/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    });
    const data = await res.json();
    console.log("BACKEND RESPONSE:", data);
    
    if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
      // ✅ redirect after successful login
      navigate("/dashboard");
    }

  }

  return <div id="google-btn"></div>;
}