// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

// Handle Login
export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/dashboard", // Redirect to /dashboard after successful login
  }),
  logout: handleLogout({
    returnTo: "/", // Redirect to / after logout
  }),
});
