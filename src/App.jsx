import Saaliit from './components/Saaliit' 
import KalastusRajoitukset from './components/KalastusRajoitukset'
import Sakot from './components/Sakot'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Home = () => (
  <div className="landingPage">
    <div className="footerIndex">
  <footer>
  <img src="SeAMK_logo_valkoinen_fi_en.png" alt="SeAMK logo" width="103" height="35"></img>
  <p>lasse.luomanen(at)seamk.fi</p>
  </footer>

  </div>
  </div>
)


const App = () => {
  
return (
  <>
  <Router>
      <div className="header">
        <Link to="/">home</Link>
        <Link to="/kalastusrajoitukset">kalastusrajoitukset</Link>
        <Link to="/saaliit">saaliit</Link>
        <Link to="/sakotetut">sakotetut</Link>
      </div>

      <Routes>
        <Route path="/saaliit" element={<Saaliit />} />
        <Route path="/kalastusrajoitukset" element={<KalastusRajoitukset />} />
        <Route path="/sakotetut" element={<Sakot />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </>
);

}

export default App;