import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { playSound } from '../utils/sound';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [bookingCode, setBookingCode] = useState('');

  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    const code = `FB-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#D4AF37]/50 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2px] shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 bg-[#111111] border-b border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-display-lg text-lg text-[#F5F5F0] uppercase tracking-wider">
              {confirmed ? 'RESERVATION CONFIRMED' : 'RESERVE A DINE-IN TABLE'}
            </h2>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Close reservation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Info Badge */}
            <div className="bg-[#0A0A0A] p-3.5 border border-[#2A2A2A] rounded-[2px] text-xs font-body-md text-[#A0A0A0]">
              <p className="font-menu-item-title text-[#F5F5F0] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {RESTAURANT_INFO.address}
              </p>
              <p className="text-[11px] text-[#A0A0A0] mt-0.5">
                Artisanal Wood-Fired Dining Experience • Open 12h às 02h
              </p>
            </div>

            {/* Inputs: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Inês Fernandes"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                  CONTACT PHONE *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 937 864 615"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                />
              </div>
            </div>

            {/* Date & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                  RESERVATION DATE *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                  NUMBER OF GUESTS *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest (Solo)' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1.5">
                SELECT ARRIVAL TIME SLOT *
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setTime(slot);
                    }}
                    className={`py-2 text-xs font-label-caps rounded-[2px] transition-all cursor-pointer ${
                      time === slot
                        ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold border border-[#D4AF37]'
                        : 'bg-[#0A0A0A] text-[#A0A0A0] border border-[#2A2A2A] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                SPECIAL OCCASION / SEATING REQUEST (OPTIONAL)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Birthday celebration, near the wood oven, quiet corner..."
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-[#2A2A2A]">
              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-4 tracking-[0.2em] transition-all red-brutal-shadow cursor-pointer flex items-center justify-center gap-2 rounded-[2px]"
              >
                <span>CONFIRM TABLE RESERVATION</span>
              </button>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-[#4ADE80]/20 border border-[#4ADE80] rounded-full flex items-center justify-center text-[#4ADE80] mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="bg-[#D4AF37] text-[#0A0A0A] font-label-caps text-xs px-3 py-1 font-bold rounded-[2px]">
                CODE: {bookingCode}
              </span>
              <h3 className="font-display-lg text-2xl text-[#F5F5F0] uppercase mt-3">
                Your Table is Reserved!
              </h3>
              <p className="font-body-md text-sm text-[#A0A0A0] mt-1 max-w-sm mx-auto">
                We are excited to welcome you, {name || 'Guest'}, on {date} at {time} for {guests} guests.
              </p>
            </div>

            <div className="bg-[#0A0A0A] p-4 border border-[#2A2A2A] rounded-[2px] text-xs font-body-md text-[#A0A0A0] max-w-sm mx-auto text-left space-y-1">
              <p><strong className="text-[#F5F5F0]">Location:</strong> {RESTAURANT_INFO.address}</p>
              <p><strong className="text-[#F5F5F0]">Phone:</strong> {RESTAURANT_INFO.phone}</p>
              <p><strong className="text-[#F5F5F0]">Notes:</strong> {notes || 'Standard table'}</p>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs py-3 px-8 rounded-[2px] transition-all cursor-pointer"
            >
              DONE
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
