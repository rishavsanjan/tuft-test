"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import { Everyday } from "@/types/types";
import Notes from "./components/Notes";
import Task from "./components/Task";
import { getCurrentMonthDays, getDaysToFirstMonday } from "@/utils/util";
import Selector from "./components/Selector";
import Dates from "./components/Dates";



export default function Home() {
  const [daysData, setDaysData] = useState<Everyday[]>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("calendar-data");
      if (savedData) return JSON.parse(savedData);
    }
    return getCurrentMonthDays();
  });
  const [selectedDay, setSelectedDay] = useState<Everyday>({
    id: "",
    date: 0,
    note: "",
    tasks: [],
  });
  const [activeTab, setActiveTab] = useState<"notes" | "tasks" | "selector">("notes");

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

  
  useEffect(() => {
    localStorage.setItem("calendar-data", JSON.stringify(daysData));
  }, [daysData]);

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
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between   bg-white  sm:items-start shadow-2xl ">
        <div className="relative">
          <Image
            src="https://cdn.pixabay.com/photo/2017/04/27/01/15/mountaineering-2264151_1280.jpg"
            alt="Mountaineers on a snowy mountain"
            width={1500}
            height={0}
          />
          <span className="absolute text-black right-5 bottom-10 text-6xl ">{monthName}</span>
        </div>

        <div className="flex sm:flex-row space-y-4 flex-col justify-between w-full ">
          <div className="pl-4">

            {/* Tabs */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div

              style={{
                position: "relative",
                width: "260px",
                marginTop: "30px",
              }}
            >
              {
                selectedDay.id === "" &&
                <span className=" text-xl text-gray-400">Select a date</span>
              }
              {
                activeTab === "notes" && selectedDay.id &&
                <Notes value={value} setValue={setValue} setDaysData={setDaysData} selectedDay={selectedDay} />
              }
              {
                activeTab === "tasks" && selectedDay.id &&
                <Task
                  setDaysData={setDaysData}
                  selectedDay={selectedDay}
                  setTaskName={setTaskName}
                  taskName={taskName}
                  handleTaskDelete={handleTaskDelete}
                  handleTaskUpdate={handleTaskUpdate}
                  setSelectedDay={setSelectedDay}
                />
              }
              {activeTab === "selector" && selectedDay.id && (
                <Selector
                  isSelectingRange={isSelectingRange}
                  setIsSelectingRange={setIsSelectingRange}
                  rangeStart={rangeStart}
                  setRangeStart={setRangeStart}
                  ranges={ranges}
                  setRanges={setRanges}
                />
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

              daysData.map((day) => (
                <Dates
                  key={day.id}
                  ranges={ranges}
                  day={day}
                  rangeStart={rangeStart}
                  setRangeStart={setRangeStart}
                  setHoverModel={setHoverModel}
                  isSelectingRange={isSelectingRange}
                  setRanges={setRanges}
                  setSelectedDay={setSelectedDay}
                  selectedDay={selectedDay}
                  hoverModel={hoverModel}
                  setValue={setValue}
                />
              ))
            }

          </ul>
        </div>




      </main >
    </div >
  );
}
