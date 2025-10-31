
import React from 'react';
import type { ScheduleItem } from '../types';
import { SCHEDULE_ITEMS, DAYS } from '../constants';
import { ChevronDownIcon, PlusIcon } from './Icons';

interface ScheduleCardProps {
  item: ScheduleItem;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ item }) => {
  const { title, description, startTime, endTime, color, isLunch } = item;

  return (
    <div className={`flex items-start gap-4 mb-4 border-l-4 ${color} pl-4 py-2`}>
      <div className="text-sm text-gray-400 w-16 text-right pr-4">
        <p>{startTime}</p>
        <p className="mt-6">{endTime}</p>
      </div>
      <div className={`flex-1 ${isLunch ? 'bg-indigo-500/10' : 'bg-[#0D0F14]'} p-4 rounded-2xl`}>
        {isLunch ? (
          <div className="flex items-center justify-center h-full">
            <p className="font-bold text-indigo-400">Lunch Time 🥪</p>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-white mb-1">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </>
        )}
      </div>
    </div>
  );
};

const Schedule: React.FC = () => {
  return (
    <div className="bg-[#1A1C22] rounded-3xl p-6 h-full border border-gray-800">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">My Schedule</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-gray-400 text-sm hover:text-white">
            <span>This Week</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button className="bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex justify-between mb-8">
        {DAYS.map((dayInfo, index) => (
          <div key={index} className={`text-center p-3 rounded-xl cursor-pointer ${index === 2 ? 'bg-indigo-500' : 'hover:bg-gray-700/50'}`}>
            <p className={`text-sm ${index === 2 ? 'text-white' : 'text-gray-400'}`}>{dayInfo.day}</p>
            <p className="font-bold text-lg text-white mt-1">{dayInfo.date}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {SCHEDULE_ITEMS.map(item => (
          <ScheduleCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
