import React from 'react'
import { Link } from 'react-router-dom'
import { apiServer } from '../../../constants'
import './MainMenu.css'

const MainMenus = props => {
	const handleDelete = async e => {
		try {
			const { id } = e.target.dataset
			const res = await fetch(`${ apiServer }/contents/delete/${ id }`, { method: 'delete' })
			if(!res.ok) throw Error({ errmsg: 'Gagal Menghapus Data..Link.' })
			alert('Berhasil Menghapus Data...')
			document.querySelector('.active').click()
		} catch (err) {
			console.error(err)
		}
	}

	const menus = props.menu.contents ? props.menu.contents.map(route => 
		<div className="menu" key={ route._id }>
			<Link to={`${ props.menu.code }/${ route.title.replace(/\s/g, '-').toLowerCase() }`} >
				{ route.title }
			</Link>
			{ localStorage.getItem('username') ?
				<span data-id={ route._id } className="delete" onClick={ handleDelete }>&times;</span>
			: null }
		</div>
	) : null

	return (
		<div className="MainMenu">
			{ menus }
		</div>
	)
}
export default MainMenus