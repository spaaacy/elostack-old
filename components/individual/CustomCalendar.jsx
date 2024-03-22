"use client";

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo, Event } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Dummy data for available interview slots
const myEventsList = [
  {
    id: 0,
    title: 'Available Slot',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    // Custom styling for events
    className: 'bg-green-200 text-green-800',
  },
  // Add more slots as needed
];

const CustomCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowModal(true); // Show modal on slot selection
  };

  const eventStyleGetter = (event) => {
    return {
      className: event.className,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {showModal && selectedSlot && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Confirm Interview Slot"
          content={`Do you want to confirm this slot: ${selectedSlot.start.toLocaleString()} - ${selectedSlot.end.toLocaleString()}?`}
          // Add actions like 'Confirm' button which will handle the slot confirmation logic
        />
      )}
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => alert(event.title)}
        eventPropGetter={eventStyleGetter} // Custom styling for events
      />
    </div>
  );
};

export default CustomCalendar;