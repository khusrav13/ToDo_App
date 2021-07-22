import React, {Component} from 'react';

import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ButtonAdd from '../btn-add/btn-add';

import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
         todoData: [
            this.createTodoItem('Drink Coffe'),
            this.createTodoItem('Make Awesome Apps'),
            this.createTodoItem('Build JS Projects'),
        ],
        term: '',
        filter: 'all' //active, all, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    deleteItem = (id) => {

        this.setState(({todoData}) => {

            const index = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, index), 
                ...todoData.slice(index + 1)];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        /// generate id and add element in array

        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
        
            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
    
        const oldItem = arr[idx];
        const newItem = {...oldItem,
          [propName]: !oldItem[propName]};
    
        return [
          ...arr.slice(0, idx),
          newItem,
          ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };
   
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
          return {
            todoData: this.toggleProperty(todoData, id, 'done')
          };
        });
      };


    search(items, term) {
        if (term.length === 0) {
            return items;
        };

        return items.filter((item) => {
            return item.label
                   .toLowerCase() 
                   .indexOf(term.toLowerCase()) > -1;

        });
    };


    onSearchChange = (term) => {
        this.setState({term});
    };

    filter(items, filter) {
        
        switch(filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item) => !item.done);
            case "done":
                return items.filter((item) => item.done);
            default:
                return items;

        };
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    }
    render() {

        const {todoData, term, filter } = this.state;

        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = this.state.todoData
                          .filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;
       
        return (
            <div className="todo-app">
                <AppHeader  toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList 
                todos={visibleItems} 
                onDeleted={this.deleteItem}
                onToggleDone={this.onToggleDone}
                onToggleImportant={this.onToggleImportant}/>
                <ButtonAdd onItemAdded={this.addItem}/>
            </div>
        );
    };
   
};