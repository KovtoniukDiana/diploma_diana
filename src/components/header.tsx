'use client'
import Image from "next/image";
import { useState } from "react";
import { navItems } from "../config/navigation";
import RegistrationModal from "./registration.modal";
import LoginModal from "./login.modal";
import ThemeSwitcher from './theme.switcher'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@heroui/react";
import { useSession, signOut } from "next-auth/react";


interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  
  width?: number | string; 
  height?: number | string; 
}


export const Logo = () => {
  return (
    <Image src='/logo.png' alt="logo" width={40} height={40} priority></Image>
  );
};

export const SearchIcon = ({size = 24, strokeWidth = 1.5, width, height, ...props}: IconProps) => {
  
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function App() {

  const [isRegostrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const session = useSession();
  console.log(session);


  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
          <p className="hidden sm:block font-bold text-inherit text-[18px]">IANA</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-7">

          {navItems.map((item) => (
            <NavbarItem key={`label-${item.label}`}>
              <Link color="foreground" href={`/${item.href}`} >
                {item.label}
              </Link>
            </NavbarItem>
          ))}

        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full ",
            input: "text-small",
            inputWrapper:
              "rounded-lg bg-pink-100 hover:bg-pink-100 h-full font-normal text-default-500 border-2 border-pink-300",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

          
        {session.status === 'authenticated' ? 
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />

              </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Button as={Link} href="#" onPress={() => signOut({callbackUrl: "/"})} >Вийти</Button>
          </>
          :
          <>
            <Button as={Link} href="#" onPress={() => setIsRegistrationOpen(true)} >Зареєструватися</Button>
            <Button as={Link} href="#" onPress={() => setIsLoginOpen(true)} >Увійти</Button>
          </>
          }
      
      </NavbarContent>

      <ThemeSwitcher />

      <RegistrationModal isOpen={isRegostrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => {setIsLoginOpen(false)}} />
    </Navbar>
  );
}
