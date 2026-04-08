import React, { SetStateAction } from 'react'

interface Props {
    isSelectingRange: boolean
    setIsSelectingRange: React.Dispatch<SetStateAction<boolean>>,
    rangeStart: number | null
    setRangeStart: React.Dispatch<SetStateAction<number | null>>
    ranges: { start: number; end: number }[]
    setRanges: React.Dispatch<SetStateAction<{ start: number; end: number }[]>>
}

const Selector: React.FC<Props> = ({ isSelectingRange, setIsSelectingRange, rangeStart, setRangeStart, ranges, setRanges }) => {
    return (
        <>
            <button
                onClick={() => {
                    setIsSelectingRange(prev => !prev);
                    setRangeStart(null);
                }}
                className={`text-black text-xl border px-2 ${isSelectingRange ? 'bg-blue-200' : ''}`}
            >
                Select Range
            </button>

            {isSelectingRange && (
                <p className="text-sm text-blue-500 mt-2">
                    {rangeStart === null ? 'Click a start date' : `Start: ${rangeStart} — now click an end date`}
                </p>
            )}

            <div className="mt-4 flex flex-col space-y-2">
                {ranges.length === 0 && (
                    <p className="text-sm text-gray-400">No ranges selected</p>
                )}
                {ranges.map((r, i) => (
                    <div key={i} className="flex items-center justify-between border px-2 py-1">
                        <span className="text-black text-sm">{r.start} → {r.end}</span>
                        <button
                            onClick={() => setRanges(prev => prev.filter((_, idx) => idx !== i))}
                            className="text-red-500 text-xs ml-4"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                {ranges.length > 0 && (
                    <button
                        onClick={() => setRanges([])}
                        className="text-red-500 text-sm border px-2 py-1 mt-1"
                    >
                        Clear All
                    </button>
                )}
            </div>
        </>
    )
}

export default Selector