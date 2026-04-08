import { Everyday } from '@/types/types'
import { Square, SquareCheckBig } from 'lucide-react'
import React from 'react'

interface Props {
    day:Everyday
}

const HoverModel:React.FC<Props> = ({day}) => {
    return (
        <div
            className=" absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white border border-gray-300 shadow-lg rounded p-2 pointer-events-none text-sm text-black"
            style={{ whiteSpace: "normal", lineHeight: "1.4" }}
        >
            <p className="font-semibold text-xs text-gray-500 mb-1">Note</p>
            <p>{day.note || "No note"}</p>

            <p className="font-semibold text-xs text-gray-500 mt-2 mb-1">
                Tasks {day.tasks.length > 0 ? `(${day.tasks.length})` : ""}
            </p>
            {day.tasks.length > 0 ? (
                <ul className="space-y-0.5">
                    {day.tasks.map(t => (
                        <li
                            key={t.id}
                            className={`flex items-center gap-1 ${t.isDone ? "line-through text-gray-400" : ""}`}>
                            <span>{t.isDone ? <SquareCheckBig color="green" /> : <Square color="black" />}</span>
                            <span>{t.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400">No tasks</p>
            )}
        </div>
    )
}

export default HoverModel