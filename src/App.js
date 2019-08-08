import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Main from './components/Main'
import Footer from './components/Footer'
import './App.css'

import { apiServer } from './constants'

const App = () => {
  const [menus, setMenus] = useState([])
  const [menu, setMenu] = useState({})
	
	useEffect(() => {
		const getMenus = async () => {
			try {
				const res = await fetch(`${ apiServer }/menus/`)
				if(!res.ok) throw Error('Gagal Mengambil Data...')
				const data = await res.json()
				setMenus(data)
			} catch (err) {
				console.error(err)
			}
		}
		getMenus()
  }, [])

  const getContents = async e => {
    try {
      const { id } = e.target
      const res = await fetch(`${ apiServer }/contents/?_id=${ id }`)
      if(!res.ok) throw Error('Gagal Mengambil Data...')
      const menu = await res.json()
      setMenu(menu)
    } catch (err) {
     console.error(err)
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <SideBar menus={ menus } getContents={ getContents }/>
        <Main menu={ menu } />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App