import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";

import Image from "next/image";
import { SignIn } from "./auth/signIn";

export const AcmeLogo = () => {
  return (
    <Image
      src="/farmlogo.png"
      alt="Hero background "
      priority
      height={64}
      width={64}
    />
  );
};

export default function Nav() {
  return (
    <Navbar
      shouldHideOnScroll
      className="flex justify-between items-center px-4 py-2 bg-white text-black"
    >
      <NavbarBrand className="mx-4">
        <AcmeLogo />
        <p className="font-bold text-inherit">AgriGo</p>
      </NavbarBrand>
      <div className="flex justify-center space-x-8 w-full">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Sales
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" href="#About">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#contact">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
      <div className="">
        <SignIn />
      </div>
    </Navbar>
  );
}
