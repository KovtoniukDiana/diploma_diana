'use client'
import Image from "next/image";
import { Heart, LogOut } from 'lucide-react';
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
    <Link className="inline-block h-10 w-10" href="/">
      <Image src='/logo.png' alt="logo" width={40} height={40} priority></Image>
    </Link>
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
  const {data} = session;
  console.log(session);


  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-10">
          <Logo />
          <Link className="hidden sm:block font-bold text-inherit text-[18px]" href="/">IANEMA</Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-7">

          {navItems.map((item) => (
            <NavbarItem key={`label-${item.label}`}>
              <Link color="foreground" href={`${item.href}`} >
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
                {
                  data?.user?.image ?

                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src={data.user.image}
                  /> 
                  :
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="/user.png"
                  />
                }

                

              </DropdownTrigger>
                <DropdownMenu 
                aria-label="Profile Actions" 
                variant="faded" 
                className="p-2 min-w-60 bg-white border border-gray-100 shadow-xl rounded-2xl"
              >
                <DropdownItem 
                  key="profile" 
                  isReadOnly 
                  className="h-16 gap-2 opacity-100 border-b border-gray-50 mb-1"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400! font-medium uppercase tracking-wider">Акаунт</p>
                    <p className="font-bold text-black!">
                      Вітаємо, {data?.user?.name || 'Гість'}!
                    </p>
                  </div>
                </DropdownItem>

                <DropdownItem 
                  key="team_settings"
                  startContent={<Heart className="text-pink-500" size={18} />}
                  className="hover:bg-pink-50 transition-colors py-3"
                >
                  <p className="text-gray-700! font-medium">Вподобані фільми</p>
                </DropdownItem>

                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  onPress={() => signOut({callbackUrl: "/"})}
                  className="text-danger mt-2 bg-red-50/50 hover:bg-red-100 transition-colors py-3"
                  startContent={<LogOut size={18} />}
                >
                  <p className="font-semibold text-black!">Вийти з акаунту</p>
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
