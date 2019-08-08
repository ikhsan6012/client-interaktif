import React from 'react'
import logo from './logo.png'

import './NavBar.css'

export default () => {
	return (
		<div className="NavBar">
			<div className="logo">
				<img src={logo} alt="logo"/>
			</div>
			<div className="kop">
				<h3>KEMENTERIAN KEUANGAN REPUBLIK INDONESIA</h3>
				<h4>DIREKTORAT JENDERAL PAJAK</h4>
				<h5>KPP PRATAMA JAKARTA GROGOL PETAMBURAN</h5>
				<h6>Jalan Letjen S.Parman No. 102, Tomang, Grogol Petamburan, Jakarta Barat</h6>
				<h6>TELEPON 5630066, 5606755, FAKSIMILE 5650139</h6>
			</div>
		</div>
	)
}