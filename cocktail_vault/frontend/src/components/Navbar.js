import React from 'react'
import './Navbar.css'

function Navbar(){
    return(
        <nav className='Navbar'>
            <div className='Navbar-logo'>Cocktail Vault</div>
            <ul className='Navbar-menu'>
                <li>Explore</li>
                <li>Inventory</li>
                <li>Sign In</li>
            </ul>
        </nav>
    )
}

export default Navbar