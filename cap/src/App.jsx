import { useState } from 'react'
import './App.css'
import RequestBox from './components/RequestBox'

function App() {


  return (
    <>
     <div className="background-wrapper">
        <div className="content">
          <h1>Dog Discovery</h1>
          <h3>Find your favorite dog today!</h3>
          <h4>🐶🐕🐾🦴🐩🐶🦮🐕‍🦺🐾🐶</h4>
          <div>
            <RequestBox />
          </div>


        </div>
     </div>
    </>
  )
}

export default App
