import { Everyday } from '@/types/types';
import { Check, Edit, Square, SquareCheckBig, Trash2Icon, X } from 'lucide-react';
import React, { SetStateAction, useState } from 'react'

interface Props {
    selectedDay: Everyday,
    setTaskName: React.Dispatch<SetStateAction<string>>,
    taskName: string
    setDaysData: React.Dispatch<SetStateAction<Everyday[]>>,
    setSelectedDay: React.Dispatch<SetStateAction<Everyday>>,
    handleTaskUpdate: (taskId: number) => void
    handleTaskDelete: (taskId: number) => void
}

const Task: React.FC<Props> = ({ selectedDay, setTaskName, setDaysData, taskName, setSelectedDay, handleTaskUpdate, handleTaskDelete }) => {
    const [isEditing, setIsEditing] = useState<null | number>(null);
    const [newName, setNewName] = useState("");
    return (
        <div className="flex flex-col space-y-4">
            {
                selectedDay.tasks.map((task) => {
                    return (
                        <div key={task.id} className="flex flex-row items-center justify-between">
                            {
                                isEditing ?
                                    <input
                                        className={`bg-taupe-300 placeholder:text-gray-600 text-black p-1`}
                                        onChange={(e) => {
                                            setNewName(e.target.value)
                                        }}
                                        type="text"
                                        placeholder="Enter new task name"
                                        value={newName}
                                    />
                                    :
                                    <span className="text-black">{task.name}</span>

                            }

                            <div className="flex flex-row space-x-2">
                                {
                                    isEditing ?
                                        <>
                                            <button
                                                onClick={() => {
                                                    setNewName("")
                                                }}
                                            >
                                                <X color="black" />
                                            </button>
                                            <button
                                                onClick={() => {

                                                    setSelectedDay(prev => ({
                                                        ...prev,
                                                        tasks: prev.tasks.map(t =>
                                                            t.id === task.id ? { ...t, name: newName } : t
                                                        )
                                                    }));
                                                    setDaysData(prev =>
                                                        prev.map(d =>
                                                            d.id === selectedDay.id ? {
                                                                ...d, tasks: d.tasks.map(t =>
                                                                    t.id === task.id ? { ...t, name: newName } : t
                                                                )
                                                            } : d
                                                        )
                                                    )
                                                    setNewName("")
                                                    setIsEditing(null)
                                                }}
                                            >
                                                <Check color="black" />
                                            </button>
                                        </>
                                        :

                                        <>
                                            {
                                                !task.isDone ?
                                                    <button
                                                        onClick={() => {

                                                            handleTaskUpdate(task.id);
                                                        }}
                                                    >
                                                        <Square color="black" />
                                                    </button>

                                                    :
                                                    <button
                                                        onClick={() => {
                                                            handleTaskUpdate(task.id);
                                                        }}
                                                    >
                                                        <SquareCheckBig color="green" />
                                                    </button>

                                            }
                                            <button
                                                onClick={() => {
                                                    setNewName(task.name)
                                                    setIsEditing(task.id)
                                                }}
                                            >
                                                <Edit color='black' />
                                            </button>


                                            <button
                                                onClick={() => {
                                                    handleTaskDelete(task.id)
                                                }}
                                            >

                                                <Trash2Icon color="red" />
                                            </button>
                                        </>
                                }

                            </div>

                        </div>
                    )
                })
            }
            {
                <div className="flex flex-row" >
                    <input
                        className={`bg-taupe-300 placeholder:text-gray-600 text-black p-1`}
                        onChange={(e) => {
                            setTaskName(e.target.value)
                        }}
                        type="text"
                        placeholder="Enter task name"
                        value={taskName}
                    />
                    <button
                        onClick={() => {
                            setTaskName("")
                        }}
                    >
                        <X color="black" />
                    </button>
                    <button
                        onClick={() => {
                            const newTask = {
                                id: selectedDay.tasks.length + 1,
                                name: taskName,
                                isDone: false
                            }
                            setSelectedDay(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }))
                            setDaysData(prev =>
                                prev.map(d =>
                                    d.id === selectedDay.id ? { ...d, tasks: [...d.tasks, newTask] } : d
                                )
                            )
                            setTaskName("")
                        }}
                    >
                        <Check color="black" />
                    </button>


                </div>



            }


        </div>
    )
}

export default Task