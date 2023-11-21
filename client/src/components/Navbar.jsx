import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/images/logo.svg"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <img src={logo} className="logo" />
      <ul className='menu-items'>
        <li className='menu-item'>
          <NavLink to="/transaction">Transactions</NavLink>
        </li>
        <li className='menu-item'>
          <NavLink to="/address">Addresses</NavLink>
        </li>
        <li className='menu-item'>
          <NavLink to="/wallet">Wallet</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar