

import saveToDo from "@/actions/create-todo/page";
import TodoList from "@/components/ToDos/page"
import Timetable from "@/components/calendar/timetable/page"
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import React, { useEffect, useState } from 'react';


const Dashboard = async () => {

  const toDos = await db.toDo.findMany()

    // const [calendarEvents, setCalendarEvents] = useState<{ title: string; id: string; start: string; allDay: boolean; }[]>([]);

    // const [timetableEvents, setTimetableEvents] = useState([]);
    

    // const fetchCalendarEvents = () => {
    //     // Implement your logic to fetch events
    //     // For now, let's assume you have a sample data
    //     const sampleEvents = [
    //       { title: 'event 1', id: '1', start: new Date().toISOString(), allDay: true },
    //       { title: 'event 2', id: '2', start: new Date().toISOString(), allDay: true },
    //       // Add more events as needed
    //     ];
    //     setCalendarEvents(sampleEvents);
    //   };
    
    //   useEffect(() => {
    //     fetchCalendarEvents();
    //   }, []);

    return(
        <>
        <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Todo List</h1>
        <div className='flex mb-4'>
          <form action={saveToDo}>
            <input
            id='title'
            name='title'
            placeholder="Write your todo here..."
            className="border-black border p-1"
            
            />
            <Button type="submit">
          Add Note
        </Button>
          </form>
          <div className="space-x-4">
            {toDos.map((toDo) => (
              <div key={toDo.id}
              className="flex justify-between items-center p-2 border-b"
              >
                {toDo.title}
               
                
              </div>
            
            ))}

          </div>
          </div>
          </div>
        
        <div className="fixed top-10 right-0 p-4 bg-white shadow-md">
        {/* <TodoList /> */}
        </div>

        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <section className="grid grid-cols-1 lg:grid-cols-2">
            {/* <Timetable events={timetableEvents} /> */}
            </section>
        </div>

        </>
    )

}

export default Dashboard