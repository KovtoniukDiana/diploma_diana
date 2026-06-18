'use client'
import Image from "next/image";
import { Heart, LogOut } from 'lucide-react';
import { useState } from "react";
import { navItems } from "../config/navigation";
import RegistrationModal from "./registration.modal";
import LoginModal from "./login.modal";
import ThemeSwitcher from './theme.switcher'
import SearchBar from './search.bar'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@heroui/react";
import { useSession, signOut } from "next-auth/react";


export const Logo = () => {
  return (
    <Link className="inline-block h-10 w-10" href="/">
      <Image src='/logo.png' alt="logo" width={40} height={40} priority></Image>
    </Link>
  );
};

export default function App() {

  const [isRegostrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();
  const {data} = session;
  console.log(session);


  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          className="lg:hidden"
        />
        <NavbarBrand className="mr-2 sm:mr-6 lg:mr-10">
          <Logo />
          <Link className="hidden sm:block font-bold text-inherit text-[18px]" href="/">IANEMA</Link>
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex gap-7">

          {navItems.map((item) => (
            <NavbarItem key={`label-${item.label}`}>
              <Link color="foreground" href={`${item.href}`} >
                {item.label}
              </Link>
            </NavbarItem>
          ))}

        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-1.5 sm:gap-3" justify="end">
        <SearchBar />

        <ThemeSwitcher />

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
                  <Link href="/profile" className="text-gray-700! font-medium">Вподобані фільми</Link>
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

            <Button as={Link} href="#" className="hidden lg:flex" onPress={() => signOut({callbackUrl: "/"})} >Вийти</Button>
          </>
          :
          <>
            <Button as={Link} href="#" size="sm" className="hidden lg:flex" onPress={() => setIsRegistrationOpen(true)} >Зареєструватися</Button>
            <Button as={Link} href="#" size="sm" className="hidden lg:flex" onPress={() => setIsLoginOpen(true)} >Увійти</Button>
          </>
          }
      
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={`mobile-label-${item.label}`}>
            <Link
              className="w-full text-lg"
              color="foreground"
              href={item.href}
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem className="mt-4 pt-4 border-t border-gray-200">
          {session.status === 'authenticated' ? (
            <Button
              as={Link}
              href="#"
              color="danger"
              variant="flat"
              className="w-full"
              onPress={() => { setIsMenuOpen(false); signOut({callbackUrl: "/"}); }}
            >
              Вийти з акаунту
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <Button
                as={Link}
                href="#"
                color="primary"
                className="w-full"
                onPress={() => { setIsMenuOpen(false); setIsLoginOpen(true); }}
              >
                Увійти
              </Button>
              <Button
                as={Link}
                href="#"
                variant="bordered"
                className="w-full"
                onPress={() => { setIsMenuOpen(false); setIsRegistrationOpen(true); }}
              >
                Зареєструватися
              </Button>
            </div>
          )}
        </NavbarMenuItem>
      </NavbarMenu>

      <RegistrationModal isOpen={isRegostrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => {setIsLoginOpen(false)}} />
    </Navbar>
  );
}
