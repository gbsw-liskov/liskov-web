import Router from '@/Routes/Router';
import { Header } from '@/components/index';
import { BrowserRouter } from 'react-router-dom';

export default function App(){
  return(
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  )
}