import { useState, useEffect } from 'react'
import saaliitService from '../services/saaliitService' 

const Saaliit = () => {
  const [kalat, setKalat] = useState([]);

  useEffect(() => {
    saaliitService
    .getAll()
    .then((responseSaalis) => {
      setKalat(responseSaalis);
    })
    .catch(error => {
      alert('Haku ei onnistunut!')
    });
  }, [])

    return (
      <div className="saaliitContainer">
        <div className="saaliitInfo">
          <h1>Saalisrekisteri</h1>
          <p>Tälle sivulle on koottu fiktiivinen saalisrekisteri.
            Rekisteriin on tallennettu kalastusrajoitteiden kohteina olevia lajeja, sekä kirjattu saalismäärä lajeittain satunnaisilta paikkakunnilta.</p>
          </div>
      {kalat.map((data) => {
        return (
          <div className="laji" key={data.id}>
            <h3>{data.laji}</h3>
            <p>Lajin suurin suojeluarvosumma: {data.suurin_suojeluarvosumma} euroa</p>
            
            <table className="saaliitTaulu">
              <thead>
                <tr>
                  <th>Paikkakunta</th>
                  <th>Määrä</th>
                </tr>
              </thead>
              <tbody>
              {data.rekisteroidyt_saaliit.map((rekisteroidyt_saaliit) => {
              return (
              <tr key={rekisteroidyt_saaliit.id}>
                <td>{rekisteroidyt_saaliit.paikkakunta}</td>
                <td>{rekisteroidyt_saaliit.maara}</td>
              </tr> 
              );
            }
            )}
            </tbody>
            </table>
          </div>
        );
      })}
      <div className="footer">
        <footer>
        <img src="SeAMK_logo_valkoinen_fi_en.png" alt="SeAMK logo" width="103" height="35"></img>
        </footer>
      </div>
    </div>
      
    )
  }
  
  export default Saaliit
  