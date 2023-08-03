import React, { useEffect } from 'react'
import Task from './Task';
import { useState } from 'react';



const Home=()=>{

    const storageArray=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
    const [tasks,setTask]=useState(storageArray);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        setTask([...tasks,{title,description}])
    }
    const deleteTask=(index)=>{
        const filteredArray=tasks.filter((value,i)=>{
            return i!==index;
        })
        console.log(filteredArray)
        setTask(filteredArray);
    }

    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks))
    },[tasks])

    return( 
        <div className="container">
        <h1>Daily Goals</h1>

        <form onSubmit={submitHandler}>
            <input type="text" placeholder="Type here"  value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input type='textarea' placeholder="Description here" value={description} onChange={(e)=>{setDescription(e.target.value)}} ></input>
            <button type="submit">ADD</button>
        </form>

        {tasks.map((item,index)=>(
            <Task 
            key={index} 
            title={item.title} 
            description={item.description} 
            deleteTask={deleteTask} 
            index={index}
            />
        ))}

        </div>
    );
};
export default Home

