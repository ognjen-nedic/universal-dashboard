import { useState, useEffect } from 'react';
import { BrowserRouter,  Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from "./Navigation";
import Users from "./Pages/Users";
import Clients from "./Pages/Clients";
import Developers from "./Pages/Developers";
import UserProfile from "./Pages/UserProfile";
import MyProfile from './Pages/MyProfile';
import LogIn from './LogIn';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => {
        if (!response.ok) {
          throw Error("Nešto nije u redu.");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  let currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser, setLoggedIn]);



  const loginHandler = (e, form) => {
    e.preventDefault();
    user = user.filter(element => element.email === form.email.trim());
    if (
      form.email.trim() === user[0].email &&
      form.password.trim() === user[0].password
    ) {
      setLoggedIn(true);
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: form.email,
          token: form.password,
          id: user[0].id,
        })
      );
    } else {
      alert('Wrong password or username');
    }
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
    {!loggedIn && <Routes>
      <Route path="/" element={<LogIn loginHandler={loginHandler}/>}/>
      <Route path="*" element={<LogIn loginHandler={loginHandler}/>} />
    </Routes>}

      {loggedIn && <div className="App">
        <Navigation />
        <Routes>
        <Route path="/" element={<Users />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/users/:id" element={<UserProfile />}/>
          <Route path="/clients" element={<Clients/>}/>
          <Route path="/developers" element={<Developers/>}/>
          <Route path="/my-profile" element={<MyProfile logoutHandler={logoutHandler} currentUser={currentUser}/>}/>
          <Route path="*" element={<h1 className="error-page">404 Error</h1>}/>
        </Routes>
      </div>}
    </BrowserRouter>
  );
}

export default App;
