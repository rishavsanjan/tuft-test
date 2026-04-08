import { Everyday } from '@/types/types';
import { getDaysToFirstMonday, isSunday, isToday } from '@/utils/util';
import React, { SetStateAction } from 'react'
import HoverModel from './HoverModel';

interface Props {
    ranges: { start: number; end: number }[]
    day: Everyday
    rangeStart: number | null
    setRangeStart: React.Dispatch<SetStateAction<number | null>>
    setHoverModel: React.Dispatch<SetStateAction<string | null>>,
    isSelectingRange: boolean
    setRanges: React.Dispatch<SetStateAction<{ start: number; end: number }[]>>
    setSelectedDay: React.Dispatch<SetStateAction<Everyday>>
    selectedDay: Everyday
    hoverModel: string | null
    setValue: React.Dispatch<SetStateAction<string>>

}



const Dates: React.FC<Props> = ({ ranges, day, rangeStart, setHoverModel, isSelectingRange, setRangeStart, setRanges, selectedDay, setSelectedDay, hoverModel, setValue }) => {
    const isInRange = ranges.some(r => day.date >= r.start && day.date <= r.end);
    const isRangeStart = rangeStart === day.date;

    const istoday = isToday(day.date)

    return (
        <li
            style={{ userSelect: "none" }}

            onMouseEnter={() => {
                setHoverModel(day.id)
            }}

            onMouseLeave={() => {
                setHoverModel(null)
            }}

            onClick={() => {
                if (isSelectingRange) {
                    if (rangeStart === null) {
                        setRangeStart(day.date);
                    } else {
                        const start = Math.min(rangeStart, day.date);
                        const end = Math.max(rangeStart, day.date);
                        setRanges(prev => [...prev, { start, end }]);
                        setRangeStart(null);
                    }
                } else {
                    setSelectedDay(day);
                    setValue(day.note);
                }
            }}
            key={day.id}
            className={`
                      ${isSunday(getDaysToFirstMonday(), day.date) ? 'text-red-500' : 'text-black'}
                      ${isInRange ? 'text-blue-500 ' : ''}
                      ${isRangeStart ? 'text-blue-500' : ''}
                      ${istoday ? 'text-green-500' : ''}
                      ${selectedDay.date === day.date ? ' text-cyan-500' : ''}
                      text-2xl relative cursor-pointer
                    `}>
            {day.date}

            {hoverModel === day.id && (
                <div className='hidden sm:block'>
                    <HoverModel day={day} />
                </div>

            )}
        </li>
    )
}

export default Dates