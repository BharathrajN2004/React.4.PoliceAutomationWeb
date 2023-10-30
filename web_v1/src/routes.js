import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/caseTable";
import OfficersTable from "views/admin/officers";

// Icon Imports
import {
  MdHome, 
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const highLevelRoutes = [
  {
    name: "Main",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Case Data",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "case-data",
    component: <DataTables />,
  },
  {
    name: "Officers List",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "officers-list",
    component: <OfficersTable />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // {
  //   name: "Add User",
  //   layout: "/auth",
  //   path: "add-user",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
];

const lowLevelRoutes = [
  {
    name: "Main",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Case Data",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  }
];

export { highLevelRoutes, lowLevelRoutes };
