import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Accounts from "./components/Accounts";
import Home from "./components/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ChequeRequest from "./components/ChequeRequest";
import Register from "./components/Register";
import Transfer from "./components/Transfer";
import Logout from "./components/Logout";
import Users from "./components/Users";
import ManageChequeRequests from "./components/ManageChequeRequests";
import Profile from "./components/Profile";
import ManageTransactions from "./components/ManageTransactions";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="/home/accounts" element={<Accounts/>} />
          <Route path="/home/transfer" element={<Transfer/>} />
          <Route path="/home/checkRequest" element={<ChequeRequest/>} />
          <Route path="/home/users" element={<Users/>} />
          <Route path="/home/manageCheckRequest" element={<ManageChequeRequests/>} />
          <Route path="/home/profile" element={<Profile/>} />
          <Route path="/home/manageTransactions" element={<ManageTransactions/>} />
        </Route>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
