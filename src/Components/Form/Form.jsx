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
         return {...state,[action.name]:{...state[action.name],[action.subName]:action.value}}
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
         return {...state,[action.name]:{...state[action.name],[action.subName]:action.value}}
    return{...state,[action.name]:action.value}
}



function Form(){

    const selectOptions=['B.E','M.E','BSC','B.TECH','M.TECH','B.COM','OTHER'];

    const [formData,dispatchFunction]=useReducer(reducerFunction,initialValue);

    const [userImageUrl,setUserImageUrl] = useState('');

    
    // validation support state
    const [invalidObject,setInvalidObject]=useReducer(reducerFunctionValidation,initialValueValidation);
    const [initialValueObject,setInitialValueObject]=useReducer(reducerFunctionValidation,initialValueValidation);
    const refObject=useRef({});

    const {name,mailId,dateOfBirth,maritalStatus,age,laptopOwnStatus,preferredFavouriteTravel} = formData;

    const updateFormData=useCallback((event)=>{
        // console.log(event.target.name+" "+event.target.value)
        if(event.target.value==='')
            setInvalidObject({name:event.target.name,value:true});
        else
            setInvalidObject({name:event.target.name,value:false});
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

    const updateCheckBox=useCallback((event)=>{
        dispatchFunction({'name':'preferredFavouriteTravel','subName':event.target.name,value:!preferredFavouriteTravel[event.target.name]})
    },[preferredFavouriteTravel]);

    const updateUserImage=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.files[0]});
		setUserImageUrl(URL.createObjectURL(event.target.files[0]));
	},[])

    const clearFormFunction=()=>{
        for (const [key, value] of Object.entries(initialValue)) 
        {
            if(key==='preferredFavouriteTravel')
            {
                for(let secondKey in value)
                {
                    dispatchFunction({'name':key,subName:secondKey,value:value[secondKey]});
                    setInitialValueObject({'name':key,subName:secondKey,value:initialValueValidation[key][secondKey]});
                }
                setInvalidObject({name:key,})
            }
            else{
                dispatchFunction({'name':key,'value':value})
                setInvalidObject({name:key,value:initialValueValidation[value]});
            }
        }

        setUserImageUrl('');

    }

    const submitHandler=(event)=>{
		event.preventDefault();
        console.log(formData);
    }
    
    

    const handleMouseEvent=useCallback((event)=>{
        for(let key in refObject.current)
            if(!refObject.current[key].contains(event.target) && initialValueObject[key] && formData[key]==='')
            {
                setInvalidObject({name:key,value:true});
            }
    },[formData,initialValueObject,refObject]);

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
                inputRef={ref=> refObject.current['name'] = ref}
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
                inputRef={ref=> refObject.current['mailId'] = ref}
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
                inputRef={ref=> refObject.current['dateOfBirth'] = ref}
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
                inputRef={ref=> refObject.current['age'] = ref}
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
            <FormSubContainer title="Your Qualification" isRequired={true} invalid={invalidObject['qualification']}>
                <Select
                selectOptions={selectOptions}
                name="qualification"
                onChange={updateFormData}
                selectRef={ref=> refObject.current['qualification'] = ref}
                />
            </FormSubContainer>
            <FormSubContainer title="Pick your image" isRequired={true} invalid={invalidObject['userImage']}>
                <FilePicker
                    userImageUrl={userImageUrl}
                    updateUserImage={updateUserImage}
                    name="userImage"
                    acceptType="image/png, image/jpeg"
                    filePickerRef={ref=> refObject.current['userImage'] = ref}

                />
            </FormSubContainer>
            <div className='form-submit-container'>
                <Button type="button" classProp="clear-button" clickHandler={clearFormFunction}>
                    Clear Form
                </Button>
                <Button type="submit" disabled={
                   !( name!=='' && mailId!=='' && dateOfBirth!=='' && maritalStatus!=='' && age!=='' && laptopOwnStatus!=='' && (preferredFavouriteTravel['car']===true || preferredFavouriteTravel['bus']===true || preferredFavouriteTravel['bike']===true || preferredFavouriteTravel['train']===true))
                } classProp="button">
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default React.memo(Form)