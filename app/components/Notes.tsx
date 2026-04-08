import { Everyday } from '@/types/types'
import React, { SetStateAction } from 'react'

interface Props {
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>,
    setDaysData: React.Dispatch<SetStateAction<Everyday[]>>,
    selectedDay: Everyday
}

const Notes: React.FC<Props> = ({ value, setValue, setDaysData, selectedDay }) => {
    return (
        <textarea
            value={value}
            onChange={(e) => {
                const newText = e.target.value
                setValue(newText)
                setDaysData(prev =>
                    prev.map(d =>
                        d.id === selectedDay.id
                            ? { ...d, note: newText }
                            : d
                    )
                )
            }}
            rows={6}
            className="w-full resize-none bg-transparent text-black outline-none"
            style={{
                lineHeight: "32px",
                backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 30px, black 1px, black 32px)",
            }}
        />
    )
}

export default Notes