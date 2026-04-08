import React, { SetStateAction } from 'react'

interface Props {
    activeTab: "notes" | "tasks" | "selector",
    setActiveTab: React.Dispatch<SetStateAction<"notes" | "tasks" | "selector">>
}

const Tabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {

    return (
        <div className="flex  space-x-4">
           
            <button
                onClick={() => {
                    setActiveTab("notes")
                }}
                className={`${activeTab === "notes" ? 'border-b-2 border-gray-500 text-gray-500' : 'text-black'}  text-xl cursor-pointer`}>Notes</button>
            <button
                onClick={() => {
                    setActiveTab("tasks")
                }}
                className={`${activeTab === "tasks" ? 'border-b-2 border-gray-500 text-gray-500' : 'text-black'}  text-xl cursor-pointer`}>Tasks</button>
            <button
                onClick={() => {
                    setActiveTab("selector")
                }}
                className={`${activeTab === "selector" ? 'border-b-2 border-gray-500 text-gray-500' : 'text-black'}  text-xl cursor-pointer`}>Selector</button>
        </div>
    )
}

export default Tabs