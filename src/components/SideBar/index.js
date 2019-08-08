import React from 'react'
import { NavLink } from 'react-router-dom'
import { apiServer } from '../../constants'
import './SideBar.css'

const SideBar = props => {
	const username = localStorage.getItem('username')

	const handleDelete = async e => {
		try {
			const { id } = e.target.dataset
			const res = await fetch(`${ apiServer }/menus/delete/${ id }`, { method: 'delete' })
			if(!res.ok) throw Error({ errmsg: 'Gagal Menghapus Data..Link.' })
			alert('Berhasil Menghapus Data...')
			window.location.href = '/'
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="SideBar">
			<ul className="menu-list">
				<li className="list-item"><NavLink exact to="/">Home</NavLink></li>
				{ username ? <>
					<li className="list-item"><NavLink exact to="/add-menu">Tambah Menu</NavLink></li>
					<li className="list-item"><NavLink exact to="/post">Tambah Konten</NavLink></li>
				</> : null }
				{ props.menus.map(menu => (
					<li className="list-item" key={ menu._id }>
						<NavLink 
							id={ menu._id }
							to={`/${ menu.code }`}
							onClick={ props.getContents } >{ menu.name } </NavLink>
						{ username ? 
							<span data-id={ menu._id } className="delete" onClick={ handleDelete } >&times;</span>
						: null }
					</li>
				)) }
			</ul>
		</div>
	)
}
export default SideBar