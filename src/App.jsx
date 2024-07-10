import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// pages
import { About, Contact, CreateRecipe, Home, Login, Register } from "./pages";

import { useDispatch } from "react-redux";

// layout
import MainLayout from "./layout/MainLayout";
import { useSelector } from "react-redux";
import { ProtectedRoutes, KitchenDetail, Charts } from "./components";

// action
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { login } from "./app/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "charts",
          element: <Charts />,
        },
        {
          path: "recipe",
          element: <CreateRecipe />,
        },
        {
          path: "kitchen/:id",
          element: <KitchenDetail />,
        },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      // Removed the call to `isAuthChange()`
    });
  }, [dispatch]);

  return <RouterProvider router={routes} />;
}

export default App;
