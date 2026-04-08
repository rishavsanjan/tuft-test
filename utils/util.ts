import { Everyday } from "@/types/types";

export function getCurrentMonthDays(): Everyday[] {
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



export function getDaysToFirstMonday(): number {
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const firstWeekday = firstDay.getDay();

  return (firstWeekday - 1 + 7) % 7;
}

export function isSunday(skip: number, currentDay: number): boolean {
  if ((skip + currentDay) % 7 === 0) {
    return true
  } else {
    return false
  }
}

export const isToday = (dayNumber: number): boolean => {
  const today = new Date();
  return dayNumber === today.getDate();
};