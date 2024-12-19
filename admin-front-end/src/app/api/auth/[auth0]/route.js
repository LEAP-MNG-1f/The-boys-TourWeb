// app/api/auth/route.js
import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

// Handle Login and Logout
export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/dashboard", // Redirect to /dashboard after successful login
  }),
  logout: handleLogout({
    returnTo: "/", // Redirect to / after logout
  }),
});
