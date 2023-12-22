import React, { useEffect, useState } from 'react'

import { Task } from './Task'

const Home = () => {
    const initialArray = localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")) : []
    const [tasks, setTasks] = useState(initialArray)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const submitHandler = (e) => {
        e.preventDefault();
        
        console.log(title)
        console.log(description)
        setTasks([...tasks, { title: title, description: description }])
        console.log(tasks)
        setTitle("")
        setDescription("")
        // localStorage.setItem("tasks",JSON.stringify(tasks))
    }
    const deleteTask =(index)=>{
        const filterArray = tasks.filter((val,i)=>{
            return index !== i
        })
        setTasks(filterArray)
    }
    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks))
    },[tasks])
    return (
        <div className="container">
            <h1>Daily Goals</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />

                <textarea
                    name="desc"
                    id="desc"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                >

                </textarea>
                <button type="submit">Add List</button>
            </form>

            {tasks.map((items,index)=>(
                <Task key={index}
                    title={items.title} 
                    description = {items.description}
                    deleteTask={deleteTask}
                    index = {index}
                    />
                ))}
        </div>
    )
}

export default Home