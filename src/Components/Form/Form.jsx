import React,{useReducer,useCallback,useState} from 'react'
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
        return{...state,[action.name]:{...state[action.name],[action.subName]:action.value}}
    return{...state,[action.name]:action.value}
}

const initialValue={
    name:'', // input type text
    mailId:'', // input type e-mail
    qualification:'', //drop down select
    dateOfBirth:'', // input type date
    maritalStatus:'single', //radio button
    age:'', // input type number
    laptopOwnStatus:'yes', // radio button
    preferredFavouriteTravel:{
        car:true,
        bike:false,
        bus:false,
        train:false,
    }, // checkbox
    userImage:'' // file picker for img 
}

function Form(){

    const selectOptions=['B.E','M.E','BSC','B.TECH','M.TECH','B.COM','OTHER'];

    const [formData,dispatchFunction]=useReducer(reducerFunction,initialValue);

    const [userImageUrl,setUserImageUrl] = useState('');

    const {name,mailId,dateOfBirth,maritalStatus,age,laptopOwnStatus,preferredFavouriteTravel} = formData;

    const updateFormData=useCallback((event)=>{
        console.log(event.target.name+" "+event.target.value)
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

    const updateCheckBox=useCallback((event)=>{
        dispatchFunction({'name':'preferredFavouriteTravel','subName':event.target.name,'value':event.target.value})
    },[]);

    const updateUserImage=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.files[0]});
		setUserImageUrl(URL.createObjectURL(event.target.files[0]));
	},[])

    const submitHandler=(event)=>{
		event.preventDefault();
        console.log(formData);
    }


    return(
        <form className='form-container' onSubmit={submitHandler}>

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
                type='email'
                name='mailId'
                value={mailId}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Date of Birth"  isRequired={true}>
                <Input
                placeholder='your date of birth please'
                type='date'
                name='dateOfBirth'
                value={dateOfBirth}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Age"  isRequired={true}>
                <Input
                placeholder='enter your age please'
                type='number'
                name='age'
                value={age}
                onChange={updateFormData}
                />
            </FormSubContainer>

            <FormSubContainer title="Preferred Travel mode"  isRequired={true}>
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

            <FormSubContainer title="Do you have a Laptop ?" isRequired={true}>
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

            <FormSubContainer title="Marital Status" isRequired={true}>
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
            <FormSubContainer title="Your Qualification" isRequired={true}>
                <Select
                selectOptions={selectOptions}
                name="qualification"
                onChange={updateFormData}
                />
            </FormSubContainer>
            <FormSubContainer title="Pick your image" isRequired={true}>
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