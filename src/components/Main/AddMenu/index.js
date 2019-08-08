import React from 'react'
import { apiServer } from '../../../constants'

const AddMenu = () => {
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const [code, name] = [...e.target.querySelectorAll('input')].map(el => el.value)
			const res = await fetch(`${ apiServer }/menus/add`, {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code: code.replace(' ', '-').toLowerCase(), name })
			})
			if(!res.ok) throw Error({ errmsg: 'Gagal Menyimpan Data...' })
			alert('Data Berhasil Disimpan...')
			window.location.href = '/add-menu'
		} catch (err) {
			console.error(err)
		}
	}
	
	return(
		<form onSubmit={ handleSubmit }>
			<input type="text" placeholder="Kode Menu"/>
			<input type="text" placeholder="Nama Menu"/>
			<input type="submit" value="Simpan"/>
		</form>
	)
}
export default AddMenu