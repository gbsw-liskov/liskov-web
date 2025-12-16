import { Toaster } from "react-hot-toast";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Header } from '@/components/index';
import Router from '@/Routes/Router';

function AppWrapper() {
  const location = useLocation();
  const noHeaderPaths = [
    "/ai/loading",
    "/ai/createlist",
    "/checklist/confirm",
    "/profile/setting",
  ];

  const isNoHeaderPath =
    noHeaderPaths.includes(location.pathname) ||
    location.pathname.startsWith("/loan");

  const showHeader = !isNoHeaderPath;


  return (
    <>
      {showHeader && <Header />}
      <Router />
      <Toaster 
        position="top-center"
        toastOptions={{
          style:{
            maxWidth: "none",
            whiteSpace: "nowrap",
          }
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
