import { BrowserRouter, Routes, Route } from 'react-router-dom';
     import Header from './components/Header';
     import LandingPage from './pages/LandingPage';
     import ProductsPage from './pages/ProductsPage';
     import LoginPage from './pages/LoginPage';
     import SignupPage from './pages/SignupPage';

     function App() {
       return (
         <BrowserRouter>
           <div className="min-h-screen bg-gray-50">
             <Header />
             <Routes>
               <Route path="/" element={<LandingPage />} />
               <Route path="/products" element={<ProductsPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/reorder" element={<div>Reorder Page</div>} />
               <Route path="/my-items" element={<div>My Items Page</div>} />
               <Route path="/cart" element={<div>Cart Page</div>} />
             </Routes>
           </div>
         </BrowserRouter>
       );
     }

     export default App;