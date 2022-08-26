import React from 'react';
import './Button.css';
function Button(props)
{
	const {type,children,clickHandler,classProp}=props;
	return(
		(type==='submit') ? 
			<button type={type} className={classProp}>{children}</button> :
			<button className={classProp} onClick={clickHandler}>{children}</button>
			
	)
	
}

export default React.memo(Button);