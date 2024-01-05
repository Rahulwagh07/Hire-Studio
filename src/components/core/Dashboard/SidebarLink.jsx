import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from "react-router-dom"
 
 
export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 sm:py-1 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-blue-150"
          : "bg-opacity-0 text-black"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-blue-500 dark:bg-sky-400 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg sm:hidden text-sky-400" />
        <span className="dark:text-slate-400">{link.name}</span>
      </div>
    </NavLink>
  )
}
