import React, { useEffect, useState } from 'react';

const EmployeeForm = (props) => {

    const [empState, setEmpState] = useState({
        name: '',
        title: "",
        experience: "",
        id: ''
    })

    useEffect(() => {
        const { selectedEmployee } = props;
        setEmpState({ ...selectedEmployee })
    }, [props])

    const handleInputChange = e => {

        if (e.target.name === "name") {
            setEmpState({ ...empState, name: e.target.value })
        } else if (
            e.target.name === "title"
        ) {
            setEmpState({ ...empState, title: e.target.value })
        } else if (
            e.target.name === "experience"
        ) {
            setEmpState({ ...empState, experience: e.target.value })
        } 
    }

    const handleSubmit = e => {
        e.preventDefault();
        setEmpState({
            name: '',
            title: "",
            experience: "",
            id: ''
        })
        props.onAddorEdit(empState)
    }


    return (
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label> Employee Name* </label>
                <input name="name" value={empState.name} onChange={handleInputChange} />
                <label> Employee title</label>
                <input name="title" value={empState.title} onChange={handleInputChange} />
                <label> Employee experience (in years) </label>
                <input name="experience" value={empState.experience} onChange={handleInputChange} />
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
}


export default EmployeeForm;
