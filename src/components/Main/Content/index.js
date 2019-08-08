import React, { useState } from 'react'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { apiServer } from '../../../constants'
import './Content.css'

const Content = props => {
	const [title, setTitle] = useState(props.content.title)
	const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.content.body))))
	const handleBack = () => document.querySelector('.list-item a.active').click()
	const token = localStorage.getItem('username')

	const saveContent = async e => {
		e.preventDefault()
		try {
			const currentContent = convertToRaw(editorState.getCurrentContent())
			currentContent.blocks = currentContent.blocks.map(blocks => {
				blocks.text = blocks.text.replace(/\t|\n/g, '').trim()
				return blocks
			})
			const body = JSON.stringify(currentContent)
			const res = await fetch(`${ apiServer }/contents/update/${ props.content._id }`, {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, body  })
			})
			if(!res.ok) throw Error('Gagal Mengambil Data...')
			alert('Data Berhasil Disimpan...')			
		} catch (err) {
			console.error(err)
		}
	}
	
	return (
		<div className="Content">
			<div className="header">
				<div className="back">
					<button onClick={ handleBack }>Kembali</button>
				</div>
				<div className="title">
					<input 
						type="text" 
						placeholder="Masukkan Judul..." 
						autoCorrect="off"
						spellCheck="false"
						readOnly={ token ? false : true }
						value={ title }
						onChange={ e => setTitle(e.target.value) }
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
					readOnly={ token ? false : true }
					onChange={ state => setEditorState(state) }
				/>
			</div>
		</div>
	)
}
export default Content