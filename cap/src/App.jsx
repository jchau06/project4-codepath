import { useState } from 'react'
import './App.css'
import RequestBox from './components/RequestBox';
import BanList from "./components/BanList";

function App() {
  const [banAttributes, setBanAttributes] = useState([])

  function handleBanAttribute(attr) {
    setBanAttributes((prev) => prev.includes(attr) ? prev : [...prev, attr]);
  }

  function handleUnbanAttribute(attr) {
    setBanAttributes((prev) => prev.filter((a) => a !== attr));
  }


  return (
    <>
     <div className="background-wrapper">
        <div className='app-wrapper'>
          <div className="content">
            <h1>Dog Discovery</h1>
            <h3>Find your favorite dog today!</h3>
            <h4>🐶🐕🐾🦴🐩🐶🦮🐕‍🦺🐾🐶</h4>
            <div>
              <RequestBox 
                onBanAttribute={handleBanAttribute}
                banAttributes={banAttributes}/>
            </div>
          </div>
          <BanList
            banAttributes={banAttributes}
            onUnbanAttribute={handleUnbanAttribute}
          />

        </div>
     </div>
    </>
  )
}

export default App
