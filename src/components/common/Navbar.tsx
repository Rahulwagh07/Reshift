"use client"
import Logo from "../../assets/reshift-logo-transparent.png";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProfileDropdown from "../auth/ProfileDropdown";

const Navbar = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-center justify-center dark:bg-slate-900 transition-all duration-300 section_bg py-4 box-shadow">
      <div className="flex justify-between max-w-maxScreen w-10/12 text-lg relative h-[50px] sm:h-[40px]">
        <Link href="/" passHref className="flex gap-4 items-center justify-center">
          <Image src={Logo} alt="logo" className="" width={150} />
        </Link>
        
      {
        token === null ? (
        <div className="flex items-center gap-8">
          <Link href="/login" className="rounded-md border border-sky-500 items-center px-7 py-2">
          Log in 
          </Link>

          <Link href="/signup" className="rounded-md border border-sky-500 items-center px-7 py-2">
            Sign up
          </Link>
      </div>
      ) : (<ProfileDropdown/>)
      }
      </div>
    </div>
  );
};

export default Navbar;
