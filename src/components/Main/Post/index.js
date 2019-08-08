import React, { useState, useEffect } from 'react'
import { Editor, EditorState, convertToRaw } from 'draft-js'
import { apiServer } from '../../../constants'
import 'draft-js/dist/Draft.css'


const Post = () => {
	const username = localStorage.getItem('username')
	if(!username) window.location.href = '/'
	
	const [menus, setMenus] = useState([])
	const [menu, setMenu] = useState()
	const [title, setTitle] = useState('')
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [placeholder, setPlaceholder] = useState('Klik disini untuk menulis konten...')

	useEffect(() => {
		const getMenus = async () => {
			try {
				const res = await fetch(`${ apiServer }/menus/`)
				if(!res.ok) throw Error('Gagal Mengambil Data...')
				const data = await res.json()
				setMenus(data)
				setMenu(data[0]._id)
			} catch (err) {
				console.error(err)
			}
		}
		getMenus()
	}, [])

	const options = menus.map(menu => <option value={ menu._id } key={ menu._id }>{ menu.name }</option>)

	const saveContent = async e => {
		e.preventDefault()
		try {
			const currentContent = convertToRaw(editorState.getCurrentContent())
			currentContent.blocks = currentContent.blocks.map(blocks => {
				blocks.text = blocks.text.replace(/\t|\n/g, '').trim()
				return blocks
			})
			const body = JSON.stringify(currentContent)
			const res = await fetch(`${ apiServer }/contents/add`, {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ menu, title, body  })
			})
			if(!res.ok) throw Error('Gagal Mengambil Data...')
			alert('Data Berhasil Disimpan...')
			setTitle('')
			setEditorState(EditorState.createEmpty())
		} catch (err) {
			console.error(err)
		}
	}

	return(
		<div className="Content">
			<div className="header">
				<div className="code">
					<select onChange={ e => setMenu(e.target.value) }>
						{ options }
					</select>
				</div>
				<div className="title">
					<input 
						type="text" 
						placeholder="Masukkan Judul..." 
						autoCorrect="off"
						spellCheck="false"
						value={ title }
						onChange={ e => setTitle(e.target.value.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')) }
						onFocus={ e => e.target.placeholder = '' }
						onBlur={ e => e.target.placeholder = 'Masukkan Judul...' }
					/>
				</div>
				<div className="post">
					<button onClick={ saveContent }>Simpan</button>
				</div>
			</div>
			<div className="body">
				<Editor 
					editorState={ editorState }
					onChange={ state => setEditorState(state) }
					onFocus={ () => setPlaceholder('') }
					onBlur={ () => setPlaceholder('Klik disini untuk menulis konten...') }
					placeholder={ placeholder }
				/>
			</div>
		</div>
	)
}
export default Post