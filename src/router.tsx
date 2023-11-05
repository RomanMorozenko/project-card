import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { SignInPage } from "@/pages/auth/signInPage";
import { SignUpPage } from "@/pages/auth/signUpPage";
import { Layout } from "@/pages/layout/layout.tsx";

import { ForgotPasswordPage } from "@/pages/auth/forgotPassword";
import { CheckEmailPage } from "@/pages/auth/checkEmail";
import { CreateNewPasswordPage } from "@/pages/auth/createNewPassword";

import { useAuthMeQuery } from "./services/auth";
import { Confirmation } from "./pages/auth/sendConfirmation/confirmation/confirmation";
import { SendConfirmation } from "@/pages";

import { Decks } from "@/pages/decks";
import { Deck } from "@/pages/deck";
import { EditProfilePage } from "./pages/auth/EditProfilePage/editProfilePage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/create-password/:token",
        element: <CreateNewPasswordPage />,
      },
      {
        path: "/check-email",
        element: <CheckEmailPage />,
      },
      {
        path: "/confirmation",
        element: <SendConfirmation />,
      },
      {
        path: "/confirm-email/:code",
        element: <Confirmation />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/decks",
        element: <Decks />,
      },
      {
        path: "/decks/:id/cards",
        element: <Deck />,
      },
      {
        path: "/decks/:id/learn",
        element: <>LEARN</>,
      },
    ],
  },
];

const errorRoutes: RouteObject[] = [
  {
    path: "/error404",
    element: <div>Error404</div>,
  },
];

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
  ...errorRoutes,
  {
    path: "*",
    element: <Navigate to="/error404" />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

function PrivateRoutes() {
  const { isLoading, isError } = useAuthMeQuery();

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </div>
    );

  const isAuthenticated = !isError;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
