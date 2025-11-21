import { useState, useEffect } from 'react';
import './index.css';
import React from 'react';
function App() {
  const [tickets, setTickets] = useState([]);
  const [view, setView] = useState('URGENT'); 

  const API_URL = "https://survey-backend-YOURNAME.onrender.com/api/tickets";

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const displayedTickets = view === 'URGENT' 
    ? tickets.filter(t => t.priority === 'URGENT') 
    : tickets;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      

      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
           Support  Dashboard
        </h1>
        <p className="text-gray-500 font-medium">
          Real-time integration with <span className="text-green-600">SurveySparrow Webhooks</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex justify-center space-x-4 mb-10">
        <button 
          onClick={() => setView('URGENT')}
          className={`px-6 py-2 rounded-full font-bold transition-all duration-200 shadow-sm cursor-pointer
            ${view === 'URGENT' 
              ? 'bg-red-600 text-white ring-2 ring-red-300 shadow-md transform scale-105' 
              : 'bg-white text-gray-600 hover:bg-red-50 border border-gray-200'}`}
        >
           Urgent Action ({tickets.filter(t => t.priority === 'URGENT').length})
        </button>

        <button 
          onClick={() => setView('ALL')}
          className={`px-6 py-2 rounded-full font-bold transition-all duration-200 shadow-sm cursor-pointer
            ${view === 'ALL' 
              ? 'bg-gray-800 text-white ring-2 ring-gray-300 shadow-md transform scale-105' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
           All Tickets
        </button>
      </div>

      {/* TICKET GRID */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedTickets.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10">
            No tickets found in this view. Good job!
          </p>
        )}

        {displayedTickets.map((ticket) => (
          <div 
            key={ticket._id} 
            className={`relative bg-white p-6 rounded-xl shadow-sm border transition-all hover:shadow-md
              ${ticket.priority === 'URGENT' 
                ? 'border-l-8 border-l-red-500 border-t border-r border-b border-gray-100' 
                : 'border-l-8 border-l-green-500 border-gray-100'
              }`}
          >
            {/* CARD HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  {ticket.user || "Anonymous User"}
                </h3>
                <span className="text-xs text-gray-400">ID: {ticket._id.slice(-6)}</span>
              </div>
              
              {ticket.priority === 'URGENT' && (
                <span className="bg-red-100 text-red-700 text-xs font-black px-2 py-1 rounded-md animate-pulse">
                  CRITICAL
                </span>
              )}
            </div>

            {/* CARD BODY */}
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-sm text-gray-500">Issue Type</span>
                <span className="text-sm font-medium text-gray-800">{ticket.issue}</span>
              </div>
              
              <div className="flex justify-between pt-1">
                <span className="text-sm text-gray-500">System Down?</span>
                <span className={`text-sm font-bold 
                  ${ticket.status === 'Yes' ? 'text-red-600' : 'text-green-600'}`}>
                  {ticket.status}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;