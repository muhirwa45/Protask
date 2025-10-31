
import React from 'react';
import type { SummaryCategory, Task } from '../types';
import { SUMMARY_CATEGORIES, TODAY_TASKS } from '../constants';
import { CalendarGridIcon, SearchIcon, ClockIcon } from './Icons';

interface SummaryCardProps {
  category: SummaryCategory;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ category }) => {
  const { title, taskCount, icon: Icon, color, bgColor } = category;
  return (
    <div className={`rounded-3xl p-4 flex flex-col justify-between h-40 ${bgColor}`}>
      <div className={`${color.replace('text-', 'bg-').replace('300', '400')}/30 p-3 rounded-full w-12 h-12 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-gray-400 text-sm">{taskCount} Task</p>
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { title, emoji, description, time, icon: Icon, iconBgColor } = task;
  return (
    <div className="bg-[#1A1C22] p-5 rounded-3xl border border-gray-800">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-white">{title} <span className="ml-1">{emoji}</span></h3>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      {time && (
        <div className="flex items-center gap-2 text-sm bg-green-500/10 text-green-300 py-1.5 px-3 rounded-full w-fit">
          <ClockIcon className="w-4 h-4" />
          <span>{time}</span>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="bg-[#1A1C22] rounded-3xl p-6 h-full border border-gray-800">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img src="https://picsum.photos/id/237/200/300" alt="Elizabeth Stone" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="text-gray-400 text-sm">Good Morning, Elizabeth Stone</p>
            <h1 className="text-2xl font-bold text-white">You have <span className="text-indigo-400">24 tasks</span> this week 👍</h1>
          </div>
        </div>
        <button className="bg-indigo-500/20 p-3 rounded-xl text-indigo-400">
          <CalendarGridIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search a tasks......" 
          className="w-full bg-[#0D0F14] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {SUMMARY_CATEGORIES.map((category) => (
          <SummaryCard key={category.title} category={category} />
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Today's Task</h2>
          <button className="text-gray-400 hover:text-white text-sm">See all</button>
        </div>
        <div className="space-y-4">
          {TODAY_TASKS.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
