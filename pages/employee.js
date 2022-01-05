import EmployeeList from '../components/EmployeeList'

function Employee ({employees}) {
    // return <h1>Hi</h1>
    return (
        <>
            <EmployeeList 
                employees={employees || []} />
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