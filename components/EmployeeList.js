import EmployeeForm from './EmployeeForm';
import {useState, useEffect} from 'react';

function EmployeeList ({employees}) {
    const [empList, setEmpList] = useState(employees);
    const [crudStatus, setCrudStatus] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState({
        name: '',
        title: "",
        experience: "",
        id: ''
    });
    let currentIndex = null;

    // useEffect(() => {
    //     // const { selectedEmployee } = employees;
    //     setEmpList([...employees])
    // }, [employees]);

    const submitEmployee = async (empData, method) => {
        let empId = (method === 'PUT') ? `/${currentIndex}` : ''
        const response = await fetch(`http://localhost:4000/employee${empId}`, {
            method: method,
            body: JSON.stringify({...empData}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data && data.id && method === 'POST') setCrudStatus("Employee Added");
        else setCrudStatus("Employee Updated");
        setSelectedEmployee({
            name: '',
            title: "",
            experience: "",
            id: ''
        })
        fetchEmployee();
        setTimeout(() => {setCrudStatus("")}, 5000);
    }

    const onAddorEdit = (empData) => {
        const list = [...empList];
        const idExist = list.find(item => item.id === empData.id);
        const max = 0;
        console.log(idExist);
        if (idExist) {
            currentIndex = parseInt(idExist.id)
            list = list.map(item => {
                if (item.id === idExist) {
                    item = {...empData};
                }
                return item
            });
            setEmpList(list);
            submitEmployee(empData, 'PUT');
        } else {
            empList.forEach(element => {
                if (element.id > max) max = element.id
            });
            empData.id = max+1;
            list.push(empData);
            setEmpList(list);
            submitEmployee(empData, 'POST');
        }
    }

    const fetchEmployee = async () => {
        const response = await fetch('http://localhost:4000/employee');
        const data = await response.json();
        setEmpList(data);
    }

    const deleteCrud = async (element) => {
        const resp = await fetch(`http://localhost:4000/employee/${element.id}`, { method: 'DELETE' });
        const data = await resp.json();
        setCrudStatus("Employee Deleted !!!");
        fetchEmployee();
        setTimeout(() => {setCrudStatus("")}, 5000);
    }

    const deleteRecord = (index) => {
        const list = [...empList];
        deleteCrud(list[index])
        // const newArr = list.filter((_,i) => i !== index);
        // setEmpList(newArr);
    }
    console.log(employees)

    const editRecord = (index) => {
        setSelectedEmployee(empList[index]);
        currentIndex = index;
    }

    return (
        <>
            <h1>List of Employee Data</h1>
            <EmployeeForm
                onAddorEdit={onAddorEdit}
                currentIndex={currentIndex}
                selectedEmployee={selectedEmployee} />
            <div>{crudStatus}</div>
            {empList.map((emp, index) => {
                return (
                    <div key={emp.id}>
                        <h3>{emp.id} {emp.title}</h3>
                        <h3>{emp.name}</h3>
                        <button onClick={() => deleteRecord(index)}>Delete</button>
                        <button onClick={() => editRecord(index)}>Edit</button>
                        <hr />
                    </div>
                );
            })}
        </>
    );
}

export default EmployeeList