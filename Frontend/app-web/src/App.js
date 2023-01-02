import '@materializecss/materialize/dist/css/materialize.css';
import '@materializecss/materialize/dist/js/materialize';
import Navbar from "./Components/Widgets/Navbar";
import {Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import Footer from "./Components/Widgets/Footer";
import Breadcrumbs from "./Components/Breadcrumbs";
/* Route Public */
import PublicRoute from './Routes/Public/PublicRoute';
/* Route Private*/
import PrivateDashboardRoute from './Routes/Private/PrivateDashboardRoute';
import PrivateTrainingRoute from './Routes/Private/PrivateTrainingRoute';

function App() {
    const [ name, setName ] = useState();
    const [arrayNames, setArrayNames] = useState([]);

  return (
    <div className="App">
      <Navbar name={name} setName={setName} />
        <main>
            <Breadcrumbs arrayNames={arrayNames} />
            
            <Routes>
                <Route path="/"          element={<PublicRoute              setArrayNames={setArrayNames} />} />
                <Route path="/dashboard" element={<PrivateDashboardRoute    setArrayNames={setArrayNames} />} />
                <Route path="/training"  element={<PrivateTrainingRoute     setArrayNames={setArrayNames} />} />
            </Routes>
        </main>
        <Footer />
    </div>
  );
}

export default App;
