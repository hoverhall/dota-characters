import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as CP from './componentProvider'
import './App.css';
import './css/styleProvider.css'
import { Routes, Route } from 'react-router';

import { useState, useEffect } from 'react'
import { selectApi, asyncData } from './features/profile/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const [localData, setLocalData] = useState([])

  const async_data = useSelector(selectApi)
  useEffect(() => {
      dispatch(asyncData())
  }, [dispatch])

  useEffect(() => {
      setLocalData(async_data)
  }, [async_data])

  return (
    <BrowserRouter>
      <div className="App">
        <CP.Header />
        <CP.Main>
          <Routes>
            <Route path={'/'} element={<CP.Home />} />
            <Route path={'/characters'} element={<CP.Profile />} />
            {localData.length > 0 && localData.map((item, i) => {
              
              return (<Route key={i} path={'/'+item.name} element={<CP.Card data={item} />} />)
            })}
          </Routes>
        </CP.Main>
      </div>
    </BrowserRouter>
  );
}

export default App;
