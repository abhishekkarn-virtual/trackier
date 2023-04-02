import { LoginForm } from "./components/LoginForm";

export const routes = () => [
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <></>,
  },
];
