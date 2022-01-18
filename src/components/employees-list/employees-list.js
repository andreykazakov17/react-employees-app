import EmployeesListItem from "../employees-list-item/employees-list-item";

import "./employees-list.css";

const EmployeesList = ({data}) => {

    const elements = data.map(item => {
        return (
            // Передать пропсы в компонент можно также при помощи spread-оператора - {...item}
            <EmployeesListItem {...item}/>
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;