import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";


export const metadata = {
  title: "One Health Portal",
  description: "One Health Portal are all in one service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
