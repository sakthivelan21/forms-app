import React,{useReducer,useCallback,useState, useEffect, useRef} from 'react'
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import FilePicker from '../FilePicker/FilePicker';
import FormHeader from '../FormHeader/FormHeader';
import FormSubContainer from '../FormSubContainer/FormSubContainer';
import Input from '../Input/Input';
import RadioButton from '../RadioButton/RadioButton';
import Select from '../Select/Select';
import "./Form.css";

const reducerFunction=(state,action)=>{
	if(action.subName)
         return {...state,[action.name]:{...state[action.name],[action.subName]:!state[action.name][action.subName]}}
    return{...state,[action.name]:action.value}
}

const initialValue={
    name:'', // input type text
    mailId:'', // input type e-mail
    qualification:'', //drop down select
    dateOfBirth:'', // input type date
    maritalStatus:'', //radio button
    age:'', // input type number
    laptopOwnStatus:'', // radio button
    preferredFavouriteTravel:{
        car:false,
        bike:false,
        bus:true,
        train:false,
    }, // checkbox
    userImage:'' // file picker for img 
}

const initialValueValidation={
    name:false,
    mailId:false,
    qualification:false, 
    dateOfBirth:false, 
    maritalStatus:false, 
    age:false, 
    laptopOwnStatus:false, 
    preferredFavouriteTravel:{
        car:false,
        bike:false,
        bus:false,
        train:false,
    }, 
    userImage:false 
}

const reducerFunctionValidation=(state,action)=>{
	if(action.subName)
         return {...state,[action.name]:{...state[action.name],[action.subName]:state[action.name][action.subName]}}
    return{...state,[action.name]:action.value}
}



function Form(){

    const selectOptions=['B.E','M.E','BSC','B.TECH','M.TECH','B.COM','OTHER'];

    const [formData,dispatchFunction]=useReducer(reducerFunction,initialValue);

    const [userImageUrl,setUserImageUrl] = useState('');

    
    // validation support state
    const [invalidObject,setInvalidObject]=useReducer(reducerFunctionValidation,initialValueValidation);
    const [initialValueObject,setInitialValueObject]=useReducer(reducerFunctionValidation,initialValueValidation);
    const refObject={
        name:useRef(null),
        mailId:useRef(null),
        //qualification:useRef(null), 
        dateOfBirth:useRef(null), 
        //maritalStatus:useRef(null), 
        age:useRef(null), 
        //laptopOwnStatus:useRef(null), 
        //preferredFavouriteTravel:useRef(null),
        //userImage:useRef(null)
    }

    const {name,mailId,dateOfBirth,maritalStatus,age,laptopOwnStatus,preferredFavouriteTravel} = formData;

    const updateFormData=useCallback((event)=>{
        console.log(event.target.name+" "+event.target.value)
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

    const updateCheckBox=useCallback((event)=>{
        dispatchFunction({'name':'preferredFavouriteTravel','subName':event.target.name})
    },[]);

    const updateUserImage=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.files[0]});
		setUserImageUrl(URL.createObjectURL(event.target.files[0]));
	},[])

    const submitHandler=(event)=>{
		event.preventDefault();
        console.log(formData);
    }
    

    const handleMouseEvent=useCallback((event)=>{
        
        // console.log(name==='');
        // console.log(!isInitial);
        // console.log(!inputRef.current.contains(event.target))
        for(let key in refObject)
            if(!refObject[key].current.contains(event.target) && initialValueObject[key] && formData[key]==='')
            {
                setInvalidObject({name:key,value:true});
            }
    },[refObject,formData,initialValueObject]);

    const inputFocusEvent=(name)=>{
        if(!initialValueObject[name])
        {
            setInitialValueObject({name:name,value:true});
        }
    }

    useEffect(()=>{
        window.addEventListener('mouseup',handleMouseEvent);
        return ()=> window.removeEventListener('mouseup',handleMouseEvent);
    },[handleMouseEvent])


    return(
        <form className='form-container' onSubmit={submitHandler}>

            <FormHeader title='Contact Details Form'/>

            <FormSubContainer title="Name"  isRequired={true} invalid={invalidObject['name']}>
                <Input
                placeholder='your name please'
                type='text'
                name='name'
                value={name}
                inputFocusEvent={inputFocusEvent}
                inputRef={refObject.name}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="E-mail Id"  isRequired={true} invalid={invalidObject['mailId']}>
                <Input
                placeholder='your email-id please'
                type='email'
                name='mailId'
                value={mailId}
                inputFocusEvent={inputFocusEvent}
                inputRef={refObject.mailId}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Date of Birth"  isRequired={true} invalid={invalidObject['dateOfBirth']}>
                <Input
                placeholder='your date of birth please'
                type='date'
                name='dateOfBirth'
                value={dateOfBirth}
                inputFocusEvent={inputFocusEvent}
                inputRef={refObject.dateOfBirth}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Age"  isRequired={true} invalid={invalidObject['age']}>
                <Input
                placeholder='enter your age please'
                type='number'
                name='age'
                value={age}
                inputFocusEvent={inputFocusEvent}
                inputRef={refObject.age}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Preferred Travel mode"  isRequired={true} invalid={false}>
                {
                    Object.keys(preferredFavouriteTravel).map((key,index)=>
                        <CheckBox
                            key={index}
                            title={key}
                            checked={preferredFavouriteTravel[key]}
                            name={key}
                            value={key}
                            onChange={updateCheckBox}
                            />
                    )
                }
            </FormSubContainer>

            <FormSubContainer title="Do you have a Laptop ?" isRequired={true} invalid={false}>
                <RadioButton
                    title="Yes"
                    value="yes"
                    name="laptopOwnStatus"
                    checked={laptopOwnStatus}
                    onChange={updateFormData}
                />
                <RadioButton
                    title="No"
                    value="no"
                    checked={laptopOwnStatus}
                    name="laptopOwnStatus"
                    onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Marital Status" isRequired={true} invalid={false}>
                <RadioButton
                    title="Single"
                    value="single"
                    name="maritalStatus"
                    checked={maritalStatus}
                    onChange={updateFormData}
                />
                <RadioButton
                    title="Married"
                    value="married"
                    checked={maritalStatus}
                    name="maritalStatus"
                    onChange={updateFormData}
                />
            </FormSubContainer>
            <FormSubContainer title="Your Qualification" isRequired={true} invalid={false}>
                <Select
                selectOptions={selectOptions}
                name="qualification"
                onChange={updateFormData}
                />
            </FormSubContainer>
            <FormSubContainer title="Pick your image" isRequired={true} invalid={false}>
                <FilePicker
                    userImageUrl={userImageUrl}
                    updateUserImage={updateUserImage}
                    name="userImage"
                    acceptType="image/png, image/jpeg"

                />
            </FormSubContainer>
            <div className='form-submit-container'>
                <Button  classProp="clear-button">
                    Clear Form
                </Button>
                <Button type="submit" classProp="button">
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default React.memo(Form)