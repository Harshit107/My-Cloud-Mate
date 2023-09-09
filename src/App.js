import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SplashScreen from "./components/Splashscreen";
import AuthMainPage from "./auth/AuthMainPage";
import FileStoreProvider from "./store/FileProvider";
import { initialize as initializeLocalStorage } from "./Helper/LocalStorage";
import {  ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

initializeLocalStorage();

const App = () => {
  const route = createBrowserRouter([
    { path: "/", element: <SplashScreen /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/auth", element: <AuthMainPage /> },
  ]);
  return (
    <FileStoreProvider>
      <RouterProvider router={route} />
      <ToastContainer/>
    </FileStoreProvider>
  );
};


export default App;
