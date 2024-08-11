"use client";


import Container from "../container";
import Catgories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenue from "./userMenue";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}


export default function Navbar({currentUser}: NavbarProps) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo />
                    <Search />
                    <UserMenue currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Catgories />
    </div>
  )
}
