import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/Navbar/Navbar';
import { Container } from 'react-bootstrap';
import SignUpModal from './components/SignUpModal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import { User } from './models/user';
import * as UserApi from "./network/user_api";
import styles from "./styles/App.module.css"
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import AdminDashboard from './pages/AdminDashboard';
import axios from 'axios';
import { ProductItem } from './components/ProductItem';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ConcertsFestivalsPage from './pages/ConcertsFestivalsPage';
import SportsPage from './pages/SportsPage';
import ForChildrenPage from './pages/ForChildrenPage';
import TheatrePage from './pages/TheatrePage';





function App() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User|null>(null)


  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UserApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLoggedInUser();
    fetchProducts(); // Fetch products on component mount
  }, []); // Run once on component mount

  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    
  <BrowserRouter>
    <div>
      
      <NavBar 
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
        cartItemCount={0}

      />
  
            
        <Container className={styles.pageContainer}>
          <Routes>
            <Route path="/" element={<MainPage loggedInUser={loggedInUser} products={products} />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/*' element={<NotFoundPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path="/admin" element={<AdminDashboard setProducts={setProducts}/>} />
            <Route path="/concerts-festivals" element={<ConcertsFestivalsPage />} />
            <Route path="/sport" element={<SportsPage />} />
            <Route path="/for-children" element={<ForChildrenPage />} />
            <Route path="/theatre" element={<TheatrePage />} />

          </Routes>
        </Container>

        { showSignUpModal &&
          <SignUpModal 
          onDismiss={ () => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user)
            setShowSignUpModal(false)
          }}
          />
        }
        { showLoginModal &&
        <LoginModal 
        onDismiss={() => setShowLoginModal(false)}
        onLoginSuccessful={(user) => { 
          setLoggedInUser(user)
          setShowLoginModal(false)
        }}
        />

        }
    </div>
    </BrowserRouter>
  );
}

export default App;
