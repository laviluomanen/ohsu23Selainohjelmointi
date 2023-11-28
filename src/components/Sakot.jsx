import { useState, useEffect } from 'react'
import axios from 'axios'

const sakotetutUrl = 'http://localhost:3001/sakotetut'

const Sakot = () => {
  const [sakotetut, setSakotetut] = useState([])
  const [newNimi, setNewNimi] = useState('')
  const [newIka, setNewIka] = useState('')
  const [newPaikkakunta, setNewPaikkakunta] = useState('')
  const [showAll] = useState('')
  const [filter, setFilter] = useState('')

  const sakotetutToShow = showAll
    ? sakotetut
    : sakotetut

    const sakotettavaObject = {
      id: sakotetut.length + Math.floor(Math.random() * 100),
      nimi: newNimi,
      ika: newIka,
      paikkakunta: newPaikkakunta
    }

  const addSakotettu = (event) => {
    event.preventDefault()

    let nimiHit = sakotetutToShow.find(o => o.nimi.toLowerCase() === sakotettavaObject.nimi.toLowerCase())
    let ikaHit = sakotetutToShow.find(o => o.ika === sakotettavaObject.ika)
    let paikkakuntaHit = sakotetutToShow.find(o => o.paikkakunta.toLowerCase() === sakotettavaObject.paikkakunta.toLowerCase())
    
    //Tarkastetaan, ettei hlo ole jo rekisterissa
    if(nimiHit){
      if(ikaHit){
        if(paikkakuntaHit){
          //alert(`${newNimi} iältään ${newIka} paikkakunnalta ${newPaikkakunta} on jo sakotettu!`)
          setNewNimi('')
          setNewIka('')
          setNewPaikkakunta('')
        }
      }
    }

    //Tarkistetaan, ettei yiksikään kentistä ole tyhjä
    if(sakotettavaObject.nimi.length === 0 || sakotettavaObject.ika.length === 0 || sakotettavaObject.paikkakunta.length === 0){
      alert(`Nimi, ikä tai paikkakunta puuttuu!`)
    }

    else{
      axios
        .post('http://localhost:3001/sakotetut', sakotettavaObject)
        .then(response => {
          console.log(response)
        })
      setNewNimi('')
      setNewIka('')
      setNewPaikkakunta('')
      setSakotetut(sakotetut.concat(sakotettavaObject))
    }

  }

  const deleteSakotettu = (kohde) => {
    axios
      .delete(`http://localhost:3001/sakotetut/${kohde.id}`)
      .then(response => {
        console.log(response)
      })
    setSakotetut(sakotetut => {
      return sakotetut.filter(sakotettu => sakotettu !== kohde)
    })
  }

    useEffect(() => {
        //console.log('effect')
        axios
        .get('http://localhost:3001/sakotetut')
        .then(response => {
          //console.log('promise fulfilled')
          setSakotetut(response.data)
        })
      }, [])

      const handleNimiChange = (event) => {
        setNewNimi(event.target.value)
      }
    
      const handleIkaChange = (event) => {
        setNewIka(event.target.value)
      }

      const handlePaikkakuntaChange = (event) => {
        setNewPaikkakunta(event.target.value)
      }

    return(
        <div className="sakotetutContainer">
          <div className="sakotetutInfo">
            <h1>Sakkorekisteri</h1>
            <p>Tältä sivulta löydät kalastusrajoitteita rikkoneita henkilöitä paikkakunnittain. Rekisteriin voi lisätä, tai siitä voi poistaa ihmisiä.</p>
          </div>

          <div className="sakotetunLisays">
          <form  onSubmit={addSakotettu}>
        <div>
        <h2>Anna sakkomerkintä</h2>
          <div>nimi: <input className="nimenLisays" value={newNimi} onChange={handleNimiChange}/></div>
          <div>ikä: <input className="ianLisays" value={newIka} onChange={handleIkaChange}/></div>
          <div>paikkakunta: <input className="paikkakunnanLisays" value={newPaikkakunta} onChange={handlePaikkakuntaChange}/></div>
          <button className="sakkoNappi" type="submit">add</button>
          </div>
      </form>
          </div>
          <div className="etsiJaLista">
          <div className="sakotetutFilter">
        <h2>Etsi sakotettuja kalastajia nimen perusteella</h2><input onChange={e => setFilter(e.target.value)} />
      </div>
          
      <div>
      <table  className="sakotetutTaulu">
        <thead>
            <tr>
              <th>Nimi</th>
              <th>Ikä</th>
              <th>Paikkakunta</th>
            </tr>
        </thead>
            <tbody className="sakotettuRivit">
            {sakotetutToShow.filter(hit => {
          return (
            hit.nimi.toLowerCase().includes(filter.toLowerCase())
          );
        }).map((data, id) => {
            return (
              <tr key={id}>
              <td>{data.nimi}</td>
              <td>{data.ika}</td>
              <td>{data.paikkakunta}</td>
              <td><button onClick={() => deleteSakotettu(data)} type="submit">Poista</button></td>
              </tr>
      );
    })}
    </tbody>
    </table>
      </div>
      </div>
        </div>
    )
}

export default Sakot