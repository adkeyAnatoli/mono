import { url } from "../layout";
import LoginContent from "./LoginContent";

export const metadata = {
  title: "Coral Casino UK Login & Registration – Secure Access to Your Account",
  alternates: {
    canonical: `https://${url}/login`,
  },
  description:
    "Access your Coral Casino UK safely after registration. Manage your account, claim bonuses, and enjoy top online casino games with quick and secure sign-in today.",
};

export default function LoginPage() {
  return <LoginContent />;
}
