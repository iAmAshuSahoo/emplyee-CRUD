import EmployeeForm from '../components/EmployeeForm'

function Employee ({employees}) {
    // return <h1>Hi</h1>
    console.log(employees)
    return (
        <>
            <h1>List of Employee Data</h1>
            <EmployeeForm
                onAddorEdit={() => {}}
                currentIndex={"1"}
                list={[]}
                selectedEmployee={[]} />
            {employees.map(emp => {
                return (
                    <div key={emp.id}>
                        <h3>{emp.id} {emp.title}</h3>
                        <h3>{emp.name}</h3>
                        <hr />
                    </div>
                );
            })}
        </>
    );
}

export async function getStaticProps () {
    const response = await fetch('http://localhost:4000/employee');
    const data = await response.json();
    console.log(data);
    return {
        props: {
            employees: data
        }
    }
}

export default Employee