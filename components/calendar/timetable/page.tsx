// Timetable.tsx

// import React from 'react';

// interface TimetableProps {
//   events: { title: string; start: Date | string; allDay: boolean; id: string | number }[];
// }

// const Timetable: React.FC<TimetableProps> = ({ events }) => {
//   const currentDate = new Date().toISOString().split('T')[0];

//   const todayEvents = events.filter((event) => {
//     const eventDate = new Date(event.start).toISOString().split('T')[0];
//     return eventDate === currentDate;
//   });

//   const today = new Date()

//   return (
//     <div className="bg-white p-5 rounded-xl">
//                 <h2>Today's Timetable</h2>
//                 <h6>{today.toDateString()}</h6>
//                 <ul>
//                     {todayEvents.map((event) => (
//                         <li key={event.id}>
//                             <p>{event.start.toString()}</p>

//                             <div className="bg-orange2 w-8/12 rounded-xl p-3 flex items-center gap-3">
//               <span className="bg-orange w-8 h-8 rounded-full"></span>
//               <div>
//                 <h4 className="font-bold text-lg">{event.title}</h4>
//                 <h6 className="text-sm">{event.start.toString()}</h6>
//               </div>
//             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     };

//     export default Timetable;


// Timetable.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

interface TimetableProps {
  timetableEvents: Event[];
}

const Timetable: React.FC<TimetableProps> = ({ timetableEvents }) => {
  return (
    <div>
      <h1>Timetable</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridDay',
        }}
        events={timetableEvents as EventSourceInput}
        initialView="dayGridDay"
      />
    </div>
  );
};

export default Timetable;
