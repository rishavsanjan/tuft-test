export interface Everyday {
  id: string
  date: number,
  note: string,
  tasks: {
    id: number,
    name: string,
    isDone: boolean
  }[]
}