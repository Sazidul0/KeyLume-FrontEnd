import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import Home from './Pages/Home/Home';
import ManagePasswords from './Pages/ManagePass/ManagePasswords';
import GeneratePass from './Pages/GeneratePass/GeneratePass';
import BreachCheck from './Pages/BreachCheck/BreachCheck';
import About from './Pages/About/About';
import StrengthCheck from './Pages/StrengthCheck/StrengthCheck';
import LogIn from './Pages/LogIn/LogIn';
import SignUp from './Pages/LogIn/SignUp';
import Payment from './Pages/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import TermsAndServices from './Pages/Others/TermsAndServices';
import PrivacyPolicy from './Pages/Others/PrivacyPolicy';
import PageNotFound from './Pages/Shared/PageNotFound';

const stripePromise = loadStripe('pk_test_51L0nR1GypfIe6ms7JAJtszTGuRcc6YwHoiGsnC1wYQDKKyZKfRJbUDrlDcY5vlSIUOc0SsC2NtjUW2EJiXA9FP6J00TuO8ITrd');

function App() {

  return (
    <div className="">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}>Home</Route>
        <Route path='/managePass' element={<ManagePasswords></ManagePasswords>}>Manage Passwords</Route>
        <Route path='/passwordGenerate' element={<GeneratePass></GeneratePass>}>Generate Passwords</Route>
        <Route path='/breachCheck' element={<BreachCheck></BreachCheck>}>Breach Check</Route>
        <Route path='/strengthCheck' element={<StrengthCheck></StrengthCheck>}>Strength Check</Route>
        <Route path='/about' element={<About></About>}>About</Route>
        <Route path='/login' element={<LogIn></LogIn>}>LogIn</Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/terms' element={<TermsAndServices></TermsAndServices>}></Route>
        <Route path='/privacy' element={<PrivacyPolicy></PrivacyPolicy>}></Route>
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}> {/* Wrap Payment component in Elements */}
              <Payment />
            </Elements>
          }
        />
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

      </Routes>

      <Footer></Footer>

    </div>
  );
}

export default App;
