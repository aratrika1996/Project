import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Address = ({addresses}) => {
  
  return (
    <div className='container'>
      <h1 className='title'>Blockchain Node Addresses</h1>
      
      {addresses.map((eachAddress) => (
        <div className='address-card'>
          <NavLink to={`/transfer/${eachAddress}`}><span className='address'>{eachAddress} 
          <FontAwesomeIcon icon={faChevronRight} />
          </span></NavLink>
        </div>
      ))}
    </div>
  )
}

export default Address