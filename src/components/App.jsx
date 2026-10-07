import { Routes, Route } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import { useState } from "react";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx"; 


function App() {
  const [activeModal, setActiveModal] = useState(null);   // NUEVO: "signin" | "signup" | null
  const closeModal = () => setActiveModal(null); 
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main onSignInClick={() => setActiveModal("signin")} />} />
        <Route path="/saved-news" element={<p>Saved news</p>} />
      </Routes>
      <Footer />
       <Login                                                  
        isOpen={activeModal === "signin"}
        onClose={closeModal}
        onSwitch={() => setActiveModal("signup")}
      />
      <Register                                               
        isOpen={activeModal === "signup"}
        onClose={closeModal}
        onSwitch={() => setActiveModal("signin")}
      />
    </div>
  );
}

export default App
