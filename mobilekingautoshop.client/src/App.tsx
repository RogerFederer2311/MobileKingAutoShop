import './App.css'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";
import React from "react";
import Home from './components/home/Home';
import ServiceRequests from './components/service-requests/ServiceRequests';
import EnglishStrings from "./strings/EnglishStrings";
import SpanishStrings from "./strings/SpanishStrings";
import Login from './components/login/Login';
import AboutUs from './components/about-us/AboutUs';
import CreateAccount from './components/login/CreateAccount';
import getCookie from './utilities/GetCookie';
import setCookie from './utilities/SetCookie';
import AddServiceRequest from './components/service-requests/AddServiceRequest';
import EditServiceRequest from './components/service-requests/EditServiceRequest';
import AddInvoice from './components/invoices/AddInvoice';
import EditJobAssignment from './components/job-assignments/EditJobAssignment';
import AddJobAssignment from './components/job-assignments/AddJobAssignment';
import AddPayment from './components/payments/AddPayment';
import AddTechnicianSpecialty from './components/technician-specialties/AddTechnicianSpecialty';
import EditTechnicianSpecialty from './components/technician-specialties/EditTechnicianSpecialty';
import ViewTechnicianSpecialties from './components/technician-specialties/ViewTechnicianSpecialties';
import ViewWorkDone from './components/work-done/ViewWorkDone';
import EditWorkDone from './components/work-done/EditWorkDone';
import AddWorkDone from './components/work-done/AddWorkDone';
import ViewUsers from './components/users/ViewUsers';
import EditUser from './components/users/EditUser';

function App() {
    const [language, setLanguage] = React.useState<"English" | "Spanish">("English");
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [role, setRole] = React.useState("");

    const changeLanguage = () => {
        if (language === "English") {
            setLanguage("Spanish");
        }
        else {
            setLanguage("English");
        }
    }

    const logout = () => {
        setCookie("firstName", "", 1);
        setCookie("email", "", 1);
        setCookie("role", "", 1);
        setEmail("");
        setFirstName("");
        setRole("");
        window.open("/", "_self");
    }

    React.useEffect(() => {
        setEmail(getCookie("email"));
        setFirstName(getCookie("firstName"));
        setRole(getCookie("role"));
    }, []);

    return (
        <div>
            <Router>
                <div>
                    <div id="navigationBackground">
                        <div id="navigationContent">
                            <div id="mainLink">
                                <Link to="/">Mobile King Auto Shop</Link>
                            </div>
                            <div id="pageLinks">
                                {!!role &&
                                    <React.Fragment>
                                        <Link to="/service-requests">{
                                            language === "English" ?
                                                EnglishStrings.ServiceRequests :
                                                SpanishStrings.ServiceRequests}
                                        </Link>
                                    </React.Fragment>
                                }
                                {role === "Admin" &&
                                    <React.Fragment>
                                        <Link to="/users">{
                                            language === "English" ?
                                                EnglishStrings.Users :
                                                SpanishStrings.Users}
                                        </Link>
                                    </React.Fragment>
                                }
                                <Link to="/about-us">{
                                    language === "English" ?
                                        EnglishStrings.AboutUs :
                                        SpanishStrings.AboutUs}
                                </Link>
                                {!role &&
                                    <Link to="/login">{
                                        language === "English" ?
                                            EnglishStrings.Login :
                                            SpanishStrings.Login}
                                    </Link>
                                }
                                {!!firstName && !!email &&
                                    <React.Fragment>
                                        <span>{language === "English" ?
                                            EnglishStrings.Welcome :
                                            SpanishStrings.Welcome} {firstName}
                                        </span>
                                        <button onClick={() => logout()}>{
                                            language === "English" ?
                                                EnglishStrings.Logout :
                                                SpanishStrings.Logout}
                                        </button>
                                    </React.Fragment>
                                }
                                <button onClick={() => changeLanguage()}>{
                                    language === "English" ?
                                        EnglishStrings.ChangeLanguage :
                                        SpanishStrings.ChangeLanguage}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="content">
                        <Routes>
                            <Route index element={<Home language={language} />} />
                            <Route path="/about-us" element={<AboutUs language={language} />} />
                            <Route path="/invoices/add" element={<AddInvoice language={language} />} />
                            <Route path="/job-assignments/add" element={<AddJobAssignment language={language} />} />
                            <Route path="/job-assignments/edit" element={<EditJobAssignment language={language} />} />
                            <Route path="/login" element={<Login language={language} />} />
                            <Route path="/create-account" element={<CreateAccount language={language} />} />
                            <Route path="/payments/add" element={<AddPayment language={language} />} />
                            <Route path="/service-requests" element={<ServiceRequests language={language} />} />
                            <Route path="/service-requests/add" element={<AddServiceRequest language={language} />} />
                            <Route path="/service-requests/edit" element={<EditServiceRequest language={language} />} />
                            <Route path="/technician-specialties/add" element={<AddTechnicianSpecialty language={language} />} />
                            <Route path="/technician-specialties/edit" element={<EditTechnicianSpecialty language={language} />} />
                            <Route path="/technician-specialties" element={<ViewTechnicianSpecialties language={language} />} />
                            <Route path="/users/edit" element={<EditUser language={language} />} />
                            <Route path="/users" element={<ViewUsers language={language} />} />
                            <Route path="/work-done/add" element={<AddWorkDone language={language} />} />
                            <Route path="/work-done/edit" element={<EditWorkDone language={language} />} />
                            <Route path="/work-done" element={<ViewWorkDone language={language} />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )
}
export default App