import React, {useState} from 'react';

function SignupPage (){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleChange = (event)=>{
        const {name , value} = event.target;
        setFormData(prevState => ({
            ...prevstate,
            [name]: value 
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        //hanle form submission logic: sending the data to db
        console.log('Form submitted:', formData);
        alert('Signup successful!');
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
           
        </form>
    )

}

export default SignupPage;