import React from 'react'
import {useState} from 'react'

const AddContact = ({ onAdd}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [work, setWork] = useState('true')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!firstName){
            alert('Please add First Name')
            return 
        }

        onAdd({firstName, lastName, email, work})
        setFirstName('')
        setLastName('')
        setEmail('')
        setWork(true)
    }

    return (
        <form className = 'add-form' onSubmit = {onSubmit}>
           
            <div className = 'form-control'>
                <label>Firstname</label>
                <input type = 'text' placeholder = 'Add FirstName'
                value = {firstName}
                onChange = {(e) => setFirstName(e.target.value)} />
            </div>
            <div className = 'form-control '>
                <label>Lastname</label>
                <input type = 'text' placeholder = 'Add Lastname'
                value = {lastName} 
                onChange = {(e) => setLastName(e.target.value)} />
            </div>
            <div className = 'form-control'>
                <label>Email</label>
                <input type = 'text' placeholder = 'Add Email' 
                value = {email} 
                onChange = {(e) => setEmail(e.target.value)}
                />
            </div>
            <div className = 'form-control form-control-check'>
                <label>Work</label>
                <input type = 'checkbox' 
                checked = {work}
                value = {work} 
                onChange = {(e) => setWork(e.currentTarget.checked)}/>
            </div>

            <input type = 'submit' value = 'Save Contact'
            className = 'btn btn-block'/>
        </form>
    )
}

export default AddContact
