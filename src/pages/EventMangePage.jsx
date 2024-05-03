import React from "react";
import EventModal from "../components/modals/event/EventModal";
import Table from "../components/shared/Table";
import useGetEvent from "../hooks/events/useGetEvent";

const EventMangePage = () => {
  const { events, eventsLoading } = useGetEvent();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="py-8 text-4xl text-white">All Events</h3>

        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn btn-outline btn-info"
        >
          Create New Hero
        </button>
      </div>
      <EventModal />
      <Table data={events} loading={eventsLoading} />
    </div>
  );
};

export default EventMangePage;
