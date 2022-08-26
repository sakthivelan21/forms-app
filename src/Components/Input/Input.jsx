import React from 'react';
import './Input.css';

function Input({placeholder,type,onChange,value,name}){
    return(
        <input 
        name={name}
        className='form-input'
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        />
    )
}

export default React.memo(Input);