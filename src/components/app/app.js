import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "Johny S.", salary: 800, increase: false, rise: false, id: 1},
                {name: "Alex M.", salary: 3000, increase: false, rise: false, id: 2},
                {name: "Carl J.", salary: 5000, increase: false, rise: false, id: 3}
            ]
        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            
            // Вариант удаления элемента из массива

            // const index = data.findIndex((elem) => elem.id === id);

            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];

            return {
                data: data.filter((item) => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {

        if (((name && salary) === undefined) || ((name && salary) === null) || ((name && salary) === "")) return;
        //if (name === undefined || name === null || name === "") return;

        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }

        this.setState(({data}) => {

            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        })
    }

    onToggleIncrease = (id) => {

        // 1-й вариант обновления state

        // this.setState(({data}) => {
        //     const index = data.findIndex((elem) => elem.id === id);

        //     const oldObj = data[index];
        //     const newObj = {...oldObj, increase: !oldObj.increase};
        //     const newArr = [...data.slice(0, index), newObj, ...data.slice(index + 1)];

        //     return {
        //         data: newArr
        //     }
        // })


        // 2-й вариант обновления state

        this.setState(({data}) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }


    // Обобщенный вариант метода onToggle

    // onToggleProp = (id, prop) => {
    //     this.setState(({data}) => ({
    //         data: data.map((item) => {
    //             if (item.id === id) {
    //                 return {...item, [prop]: !item[prop]}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    render() {

        const employees = this.state.data.length;
        const increased = this.state.data.filter((item) => item.increase).length;

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;