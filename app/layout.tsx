import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Modal from "@/components/modals/modale";
import RegisterModle from "@/components/modals/registerModle";
import ToasterProvider from "./providers/toasterProvider";
import LoginModal from "@/components/modals/loginModle";
import getCurrentUser from "./actions/getCurentUser";
import RentModal from "@/components/modals/rentModal";
import SearchModal from "@/components/modals/searchModal";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <SearchModal />
        <RentModal />
        <RegisterModle />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
        {children}
        </div>
        </body>
    </html>
  );
}
