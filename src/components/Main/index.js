import React from 'react'
import { Route } from 'react-router-dom'
import MainMenus from './MainMenus'
import Content from './Content'
import Home from './Home'
import Post from './Post'
import AddMenu from './AddMenu'
import { apiServer } from '../../constants'
import './Main.css'

const Login = () => {
	const handleLogin = async e => {
		e.preventDefault()
		try {
			const [username, password] = e.target.children
			const res = await fetch(`${ apiServer }/auth/login`, {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: username.value, password: password.value })
			})
			if(!res.ok) throw Error('Gagal Mengambil Data...')
			const user = await res.json()
			if(user.errmsg) return alert(user.errmsg)
			alert('Login Berhasil...')
			localStorage.setItem('username', user.username)
			window.location.href = '/'
		} catch (err) {
			console.error(err)
		}
	}
	
	return(
		<form onSubmit={ handleLogin }>
			<input type="text" placeholder="Username"/>
			<input type="password" placeholder="Password"/>
			<input type="submit" value="Login"/>
		</form>
	)
}

const Logout = () => {
	localStorage.removeItem('username')
	window.location.href = '/'
}

const Main = props => {
	const contentRoutes = props.menu.contents ? props.menu.contents.map(route => 
		<Route exact key={ route._id }
			path={`/${ props.menu.code }/${ route.title.replace(/\s/g, '-').toLowerCase() }`}
			component={ () => <Content content={ route } /> }
		/>
	) : null
	
	return (
		<div className="Main">
			<Route exact path="/" component={ Home } />
			<Route exact path={`/${ props.menu.code }`} component={ () => <MainMenus menu={ props.menu }/> } />
			{ contentRoutes }
			<Route exact path="/post" component={() => <Post />} />
			<Route exact path="/login" component={() => <Login />} />
			<Route exact path="/logout" component={() => <Logout />} />
			<Route exact path="/add-menu" component={() => <AddMenu />} />
		</div>
	)
}
export default Main