import {   RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Homepage from './Homepage'
import SplashScreen from './components/Splashscreen'
import AuthMainPage from "./auth/AuthMainPage";
import { useEffect } from "react";


const App = () => {

    const route = createBrowserRouter([
        {path: '/', element: <SplashScreen />},
        {path: '/dashboard', element: <DashboardWithBackgroundCheck />},
        {path: '/auth', element: <AuthMainPage />},
    ])

    return <RouterProvider router={route} />
}

const DashboardWithBackgroundCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            const condition = true/* Your condition here */;
      
            if (!condition) {
              navigate('/auth');
            }
          }, 2000); 
      
    }, [navigate]);
  
    return <Homepage />;
  };

export default App;