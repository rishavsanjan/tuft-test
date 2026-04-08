"use client"
import { Check, CornerLeftUpIcon, Square, SquareCheckBig, Trash2Icon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
interface Everyday {
  id: string
  date: number,
  note: string,
  tasks: {
    id: number,
    name: string,
    isDone: boolean
  }[]
}


function getCurrentMonthDays(): Everyday[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const everyday: Everyday[] = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, "0");
    const m = String(month + 1).padStart(2, "0");
    const y = String(year);
    return {
      id: `${day}${m}${y}`,
      date: i + 1,
      note: "",
      tasks: []
    };
  });

  return everyday
}



function getDaysToFirstMonday(): number {
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const firstWeekday = firstDay.getDay();

  return (firstWeekday - 1 + 7) % 7;
}

function isSunday(skip: number, currentDay: number): boolean {
  if ((skip + currentDay) % 7 === 0) {
    return true
  } else {
    return false
  }
}

export default function Home() {
  const [daysData, setDaysData] = useState<Everyday[]>(getCurrentMonthDays());
  const [selectedDay, setSelectedDay] = useState<Everyday>({
    id: "",
    date: 0,
    note: "",
    tasks: [],
  });
  const [activeTab, setActiveTab] = useState("notes");
  const [tasksLength, setTasksLength] = useState(() => {
    return selectedDay.tasks.length
  })
  const [taskName, setTaskName] = useState("")
  const [value, setValue] = useState(() => {
    return selectedDay.note;
  });
  const [hoverModel, setHoverModel] = useState<string | null>(null);
  const [ranges, setRanges] = useState<{ start: number; end: number }[]>([]);
  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const monthName = months[now.getMonth()];
  const daysToSkip = Array.from({ length: getDaysToFirstMonday() }, (_, i) => i + 1);


  console.log(ranges)

  function handleTaskUpdate(taskId: number) {
    setSelectedDay(prev => ({
      ...prev,
      tasks: prev.tasks.map(t =>
        t.id === taskId ? { ...t, isDone: !t.isDone } : t
      )
    }));
    setDaysData(prev =>
      prev.map(days =>
        days.id === selectedDay.id
          ?
          {
            ...days, tasks: days.tasks.map(t =>
              t.id === taskId ? { ...t, isDone: !t.isDone } : t
            )
          }
          :
          days
      )
    )

  }

  function handleTaskDelete(taskId: number) {
    setSelectedDay(prev => ({
      ...prev, tasks: prev.tasks.filter(t => t.id !== taskId)
    }))
    setDaysData(prev =>
      prev.map(d =>
        d.id === selectedDay.id ?
          { ...d, tasks: d.tasks.filter(t => t.id !== taskId) }
          : d
      )
    )
  }

  return (
    <div className="flex flex-col  items-center justify-center bg-[#EEEEEE] font-sans ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between   bg-white  sm:items-start shadow-2xl ">
        <div className="relative">
          <Image
            src="https://cdn.pixabay.com/photo/2017/04/27/01/15/mountaineering-2264151_1280.jpg"
            alt="Mountaineers on a snowy mountain"
            width={1500}
            height={0}
          />
          <span className="absolute text-black right-5 bottom-10 text-6xl ">{monthName}</span>
        </div>

        <div className="flex sm:flex-row flex-col justify-between w-full ">
          <div className="pl-4">
            <div className="flex  space-x-4">
              <button
                onClick={() => {
                  setActiveTab("notes")
                }}
                className={`${activeTab === "notes" && 'border-b-2 border-black'} text-black text-2xl `}>Notes</button>
              <button
                onClick={() => {
                  setActiveTab("tasks")
                }}
                className={`${activeTab === "tasks" && 'border-b-2 border-black'} text-black text-2xl `}>Tasks</button>
              <button
                onClick={() => {
                  setActiveTab("selector")
                }}
                className={`${activeTab === "selector" && 'border-b-2 border-black'} text-black text-2xl `}>Selector</button>
            </div>

            <div
              style={{
                position: "relative",
                width: "260px",
                marginTop: "30px",
              }}
            >

              {
                activeTab === "notes" &&
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
                  rows={8}
                  className="w-full resize-none bg-transparent text-black outline-none"
                  style={{
                    lineHeight: "32px",
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent 30px, black 30px, black 32px)",
                  }}
                />
              }
              {
                activeTab === "tasks" &&
                <>

                  <div className="flex flex-col space-y-4">
                    {
                      selectedDay.tasks.map((task) => {
                        return (
                          <div key={task.id} className="flex flex-row items-center justify-between">
                            <span className="text-black">{task.name}</span>
                            <div className="flex flex-row space-x-2">
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
                                  handleTaskDelete(task.id)
                                }}
                              >

                                <Trash2Icon color="red" />
                              </button>
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

                    {

                      <button
                        onClick={() => {
                          setTasksLength(prev => prev + 1)
                        }}
                        className=" bg-black p-3">
                        Add New Task
                      </button>
                    }

                  </div>

                </>
              }
              {activeTab === "selector" && (
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
              )}
            </div>
          </div>
          <ul className=" grid-cols-7 grid self-end space-x-4 space-y-4 " >
            {days.map((day) => (
              <li key={day} className="text-black">
                {day}
              </li>
            ))}
            {daysToSkip.map((item) => {
              return (
                <li key={item}></li>
              )
            })}
            {

              daysData.map((day) => {
                const isInRange = ranges.some(r => day.date >= r.start && day.date <= r.end);
                const isRangeStart = rangeStart === day.date;
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
                      ${selectedDay.date === day.date ? 'bg-gray-400 text-white' : ''}
                      text-2xl relative cursor-pointer
                    `}>
                    {day.date}

                    {hoverModel === day.id && (
                      <div
                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white border border-gray-300 shadow-lg rounded p-2 pointer-events-none text-sm text-black"
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
                    )}
                  </li>
                )

              })


            }

          </ul>
        </div>




      </main >
    </div >
  );
}
