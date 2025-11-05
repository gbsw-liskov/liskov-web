import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import { Header } from '@/components/index';
import Router from '@/Routes/Router';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
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
    </BrowserRouter>
  );
}
