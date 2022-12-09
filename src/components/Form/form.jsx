import { useState } from 'react';
import './index.css';

function Form({serializeCb}) {

    const [formData, setFormData] = useState({
        name:'',
        lastName:'',
        phoneNumber:''
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(formData);
        serializeCb(formData)
        setFormData(
        {
            name:'',
            lastName:'',
            phoneNumber:''
        }
        )
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Введите данные</h3>
            <input
                type="text"
                name="name"
                placeholder="Имя"
                value = {formData.name}
                onChange = {handleChange}
          
            />

            <input
                type="text"
                name="lastName"
                placeholder="Фамилия"
                value = {formData.lastName}
                onChange = {handleChange}
            />

            <input
                type="number"
                name="phoneNumber"
                placeholder="Номер телефона"
                value = {formData.phoneNumber}
                onChange = {handleChange}

            />

            <button>Отправить</button>
        </form>
    );
};

export default Form;