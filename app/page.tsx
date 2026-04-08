"use client"
import Image from "next/image";
import { useState } from "react";
interface Everyday {
  id: number
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
    return {
      id: i + 1,
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


console.log(getDaysToFirstMonday());

export default function Home() {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const monthName = months[now.getMonth()];
  const daysToSkip = Array.from({ length: getDaysToFirstMonday() }, (_, i) => i + 1);

  const [daysData, setDaysData] = useState<Everyday[]>(getCurrentMonthDays());
  const [selectedDay, setSelectedDay] = useState<Everyday>({
    id: 0,
    date: 0,
    note: "",
    tasks: [],
  });
  const [activeTab, setActiveTab] = useState("notes");

  const [value, setValue] = useState(() => {
    return selectedDay.note;
  });

  console.log(selectedDay)
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
                className={`${activeTab === "notes" && 'border-b-2 border-black'} text-black text-3xl `}>Notes</button>
              <button
                onClick={() => {
                  setActiveTab("tasks")
                }}
                className={`${activeTab === "tasks" && 'border-b-2 border-black'} text-black text-3xl `}>Tasks</button>
            </div>

            <div
              style={{
                position: "relative",
                width: "260px",
                marginTop: "30px",
              }}
            >

              {
                activeTab === "notes" ?
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
                  :
                  <>
                    {
                      selectedDay.tasks.length === 0 &&
                      <button>
                        Add New Task
                      </button>
                    }
                  </>
              }

            </div>
          </div>
          <ul className=" grid-cols-7 grid self-end space-x-4 space-y-4" >
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
            {daysData.map((day) => (
              <li
                onClick={() => {
                  setSelectedDay(day);
                  setValue(day.note);
                }}
                key={day.id}
                className={`${isSunday(getDaysToFirstMonday(), day.date) ? 'text-red-500' : 'text-black '} text-4xl cursor-pointer  ${selectedDay.date === day.date && 'bg-gray-400 text-white'}`}>
                {day.date}
              </li>
            ))}
          </ul>
        </div>




      </main>
    </div>
  );
}
