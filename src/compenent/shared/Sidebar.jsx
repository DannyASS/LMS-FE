import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Settings,
  BookOpen as Logo,
  ChevronDown,
  GraduationCap
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },

  {
    icon: BookOpen,
    label: "My Courses",
    path: "/mycourse",
    children: [
      { label: "All Courses", path: "/mycourse/courses" },
      { label: "Categories", path: "/mycourse/categories" },
      { label: "Moduls", path: "/mycourse/modules" }
    ]
  },
  { icon: GraduationCap, label: "My Class", path: "/myclass", children: [
        {label: "Class", path: "/myclass/class"},
        {label: "Assignments", path: "/myclass/assignments"}
      ]
  },
  { icon: Users, label: "Users", path: "/users", children:[]},
  { icon: Settings, label: "Settings", path: "/settings", children: []}
];

export function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <motion.div 
      className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{duration: 1}}
    >
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Logo className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">SMAN 1</h1>
            <p className="text-xs text-gray-500">Learning Management</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              {/* MENU WITH DROPDOWN */}
              {item.children?.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMenu === item.label && (
                    <ul className="ml-10 mt-2 space-y-2 border-l pl-3 border-gray-200">
                      {item.children.map((sub) => (
                        <li key={sub.path}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) =>
                              `block text-sm px-2 py-1 rounded-md transition ${
                                isActive
                                  ? "text-blue-600 font-medium"
                                  : "text-gray-600 hover:text-gray-800"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                /* NORMAL MENU */
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">Need Help?</h3>
          <p className="text-xs text-gray-600 mb-3">Check our documentation and guides</p>
          <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View Guides
          </button>
        </div>
      </div>
    </motion.div>
  );
}
