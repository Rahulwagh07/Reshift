import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { FaCircleUser } from "react-icons/fa6";
 
import { useRouter } from "next/navigation"
import useOnClickOutside from "../../hooks/useOnClickOutside"
import { RootState } from "../../redux/store"
import logout from "../../lib/logout"

export default function ProfileDropdown() {
  const { user } = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  const handleLogout = async () => {
    setOpen(false);
    logout(dispatch, router);
  }

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <FaCircleUser className="mr-2 text-sky-400" size={24}/>
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] overflow-hidden section_bg rounded-md shadow-lg  text-pure-greys-600"
          ref={ref}
        >
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm hover:text-sky-500">
              <VscDashboard className="text-lg text-sky-500" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm hover:text-sky-500"
          >
            <VscSignOut className="text-lg text-sky-500" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}