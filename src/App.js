import React, { useState, useEffect } from 'react';
import { TodoList } from '../src/TodoList';

function App() {
    const getLocalItems = () => {
        let list = localStorage.getItem('todo');
        if (list) {
            return JSON.parse(localStorage.getItem('todo'));
        } else {
            return [];
        }
    };

    const [inputList, setinputList] = useState('');

    const [Items, setItems] = useState(getLocalItems());

    const addItem = () => {
        setItems([...Items, inputList]);
        setinputList('');
    };

    const deleteItem = (id) => {
        const updatedItem = Items.filter((elem, index) => {
            return id !== index;
        });
        setItems(updatedItem);
    };

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(Items));
    }, [Items]);

    const handleInput = (e) => {
        setinputList(e.target.value);
    };

    return (
        <div className='main_div'>
            <div className='center_div'>
                <br />
                <h1>Todo List</h1>
                <br />
                <input type='text' placeholder='Add a Item' onChange={handleInput} value={inputList} />
                <button onClick={addItem}>+</button>

                <ol style={{ height: '55vh', 'overflow-y': 'auto', paddingRight: '10px' }}>
                    {/* <li>{inputList}</li> */}
                    {Items.map((itemval, index) => {
                        return <TodoList key={index} id={index} text={itemval} onselect={deleteItem} />;
                    })}
                </ol>
            </div>
        </div>
    );
}

export default App;
