"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ACCOUNT_TYPE } from "../lib/constants";

export default function Page(): JSX.Element {
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);

  return (
    <div className="text-center mt-32">
      <Link
        href={
          token
            ? user?.accountType === ACCOUNT_TYPE.ADMIN
              ? "/admin/dashboard"
              : "/dashboard"
            : "/login"
        }
        className="border border-blue-150 rounded-md py-2 px-4"
      >
        Get Started
      </Link>
    </div>
  );
}
