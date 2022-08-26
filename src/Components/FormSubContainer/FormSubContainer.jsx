import React from 'react';
import "./FormSubContainer.css";
function FormSubContainer({children,title , isRequired}){
    return(
        <div className='form-sub-container'>
            <h2 className='form-sub-container-heading'>{title} { isRequired && <span className="required">*</span>}</h2>
            {children}
        </div>
    )

}

export default React.memo(FormSubContainer);