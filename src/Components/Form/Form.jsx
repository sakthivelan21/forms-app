import React,{useReducer,useCallback} from 'react'
import FormHeader from '../FormHeader/FormHeader';
import FormSubContainer from '../FormSubContainer/FormSubContainer';
import Input from '../Input/Input';
import "./Form.css";

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

const initialValue={
    name:'',
    mailId:''
}

function Form(){

    const [formData,dispatchFunction]=useReducer(reducerFunction,initialValue);

    const {name,mailId} = formData;

    const updateFormData=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

    return(
        <div className='form-container'>
            <FormHeader title='Contact Details Form'/>
            <FormSubContainer title="Name"  isRequired={true}>
                <Input
                placeholder='your name please'
                type='text'
                name='name'
                value={name}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="E-mail Id"  isRequired={true}>
                <Input
                placeholder='your email-id please'
                type='mail'
                name='mailId'
                value={mailId}
                onChange={updateFormData}
                />
            </FormSubContainer>
        </div>
    )
}

export default React.memo(Form)