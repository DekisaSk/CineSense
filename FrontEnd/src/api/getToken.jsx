export default handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.access_token;

    document.cookie = `access_token=${token}; path=/; secure`;

    console.log("Login successful:", token);
    navigate("/");
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed. Please check your credentials.");
  }
};
