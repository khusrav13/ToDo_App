import React from 'react';

import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';

import './app.css'

const App = () => {

    const todoData = [
        {label : 'Drink Coffe', important: false, id: 1},
        {label : 'Make Awesome Apps', important: true, id: 2},
        {label : 'Build JS Projects', important: false, id: 3},
    ];

    return (
        <div className="todo-app">
            <AppHeader toDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>
            <TodoList todos={todoData} />
        </div>
    );
};

export default App;