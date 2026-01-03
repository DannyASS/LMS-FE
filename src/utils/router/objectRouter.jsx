import { createBrowserRouter, redirect } from "react-router-dom";
import { getAuthorization } from "../../helper/storage";
import LayoutPage from "../../compenent/shared/Layout";
import { Dashboard } from "../../pages/teacher/Dashboard/Dashboard";
import { LoginPage } from "../../pages/all/Login/LoginPage";
import { Assignments } from "../../pages/teacher/Assigments/Assignments";
import { Class } from "../../pages/teacher/Class/Class";
import { Settings } from "../../pages/teacher/Settings/Settings";
import CoursesPage from "@/pages/teacher/Courses/Courses";
import AddCourse from "@/pages/teacher/Courses/Courses Add/CoursesAdd";
import UpdateCourse from "@/pages/teacher/Courses/Courses Update/CoursesUpdate";
import Categories from "@/pages/teacher/Categories/Categories";
import ModulesPage from "@/pages/teacher/Moduls/Module";
import AddModule from "@/pages/teacher/Moduls/Module Add/ModulesAdd";
import UpdateModule from "@/pages/teacher/Moduls/Module Update/UpdateModule";
import UserPage from "@/pages/admin/Users/Users";
import { RegisterPage } from "@/pages/all/Register/Register";
import AddClass from "@/pages/teacher/Class/AddClass/AddClass";
import UpdateClass from "@/pages/teacher/Class/UpdateClass/UpdateClass";
import { DashboardClass } from "@/pages/teacher/Dashboard/Dashboard Class/dashboardClass";

export const objectRouter = {
    login: {
            title: "Login",
            path: "/login",
            element: <LoginPage />,
            needAuth: false,
            header: false,
            footer: false,
            index: true,
            sidebar: false,
            hideMenu: true
        },
    register: {
            title: "Register",
            path: "/register",
            element: <RegisterPage />,
            needAuth: false,
            header: false,
            footer: false,
            index: true,
            sidebar: false,
            hideMenu: true
        },
    dashboard: {
            title: "Dashboard",
            path: "/",
            element: <Dashboard />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    courses: {
            title: "My Courses",
            path: "/mycourse/courses",
            element: <CoursesPage />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    coursesAdd: {
            title: "Create Courses",
            path: "/mycourse/courses/create",
            element: <AddCourse />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    coursesUpdate: {
            title: "Update Courses",
            path: "/mycourse/courses/update/:id",
            element: <UpdateCourse />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    assignment: {
            title: "Assignment",
            path: "/myclass/assignments",
            element: <Assignments />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    class: {
            title: "Class",
            path: "/myclass/Class",
            element: <Class />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    user: {
            title: "Users ",
            path: "/Users",
            element: <UserPage />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    setting: {
            title: "Settings",
            path: "/settings",
            element: <Settings />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    categories: {
            title: "Categories",
            path: "/mycourse/categories",
            element: <Categories />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    moduls: {
            title: "Moduls",
            path: "/mycourse/modules",
            element: <ModulesPage />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    modulsAdd: {
            title: "Moduls",
            path: "/mycourse/modules/create",
            element: <AddModule />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    modulsUpdate: {
            title: "Moduls",
            path: "/mycourse/modules/update/:id",
            element: <UpdateModule />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    classAdd: {
            title: "Add Class",
            path: "/myclass/class/create",
            element: <AddClass />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    classUpdate: {
            title: "Add Class",
            path: "/myclass/class/update/:id",
            element: <UpdateClass />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
    dashboardClass: {
            title: "Dashboard Class",
            path: "/myclass/class/dashboard-class/:id",
            element: <DashboardClass />,
            needAuth: true,
            header: true,
            footer: false,
            index: true,
            sidebar: true,
            hideMenu: true
        },
}

export const convertObjectToArray = () => {
	const obj = objectRouter;

	const loaderFn = objectKey => {
		if (objectKey.needAuth) {
			if (!getAuthorization()) {
				return redirect(obj.login.path);
			}

			// const roleMenus = JSON.parse(getMenu());
			// const exist = roleMenus.find((item) => item.name == objectKey.title);
			// if (exist == null) {
			// 	return redirect(roleMenus[0].path)
			// }
		}
		return null;
	};
	const dataObject = Object.keys(obj).map(key => ({
		...obj[key],
		children: obj[key].children
			? Object.keys(obj[key].children).map(key2 => ({
					...obj[key].children[key2],
					loader: () => loaderFn(obj[key])
				}))
			: null,
		loader: () => loaderFn(obj[key])
	}));
	return dataObject;
};


export const router = createBrowserRouter([
    {
        Component: LayoutPage,
		loader() {
			return { authorization: getAuthorization() };
		},
        children: convertObjectToArray()
    }
]);

export const History = {
    navigate : null,
    push: (page, ...rest) => History.navigate(page, ...rest)
};
