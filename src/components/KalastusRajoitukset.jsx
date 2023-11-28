import axios from 'axios'
import { useState, useEffect } from 'react'

const Rajoitukset = () => {
  const [rajoitukset, setRajoitukset] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/rajoitukset').then((rajoitukset) => {
      console.log(rajoitukset.data);
      setRajoitukset(rajoitukset.data);
    })
    .catch((error) => console.log(error));
  }, [])
    
    return (
    <div className="rajoituksetContainer">
        <h1>Pyyntirajoitukset</h1>
        <p>
        Suomalaisten kalakantojen elinvoimaisuus, kestävä käyttö ja elpyminen saattaa edellyttää sitä, että kalalle asetetaan alin sallittu pyyntimitta.
        Kalastusasetuksessa säädetään Suomessa noudatettavat kalojen pyyntimitat. Sen lisäksi kalavesien omistajat ja kalastusoikeuksien haltijat voivat asettaa
        hallitsemilleen vesille Kalastusasetusta korkeampia alimpia sallittuja pyyntimittoja. Vesistökohtaisiin kalastusrajoituksin voit tutustua sivulla
        <a href="https://kalastusrajoitus.fi/#/kalastusrajoitus"> kalastusrajoitus.fi.</a></p>
        
        <p>Tältä sivulta löydät taulukon Suomessa elävien kalalajien alimmista sallituista pyyntimitoista, sekä kalalajia koskevista rauhoitusajoista. Sivulle on koottu ne lajit, joiden
          kalastamista on lakisääteisesti rajoitettu. Tiedot haettu 17.1.2023 osoitteesta <a href="https://www.eraluvat.fi/kalastus/kalavesien-vastuullinen-hoito-ja-kaytto/pyyntimitat-ja-rauhoitusajat.html#section7540">eräluvat.fi.</a>
        </p>
        <div className="rajoitusTaulu">
        <table>
        <thead>
            <tr>
              <th>Laji</th>
              <th>Minimi pyyntimitta</th>
              <th>Rauhoitusaika</th>
            </tr>
        </thead>
            <tbody className="rajoitusRivit">
            {
            
            rajoitukset.map((data, id) => {
            return (
              <tr key={id}>
              <td>{data.laji}</td>
              <td>{data.minPyyntimitta}</td>
              <td>{data.rauhoitusaika}</td>
              </tr>
      );
    })}
    </tbody>
    </table>
    </div>
    <div className="footer">
        <footer>
        <img src="SeAMK_logo_valkoinen_fi_en.png" alt="SeAMK logo" width="103" height="35"></img>
        
        </footer>
      </div>
</div>
    )
  }
  
  export default Rajoitukset
  