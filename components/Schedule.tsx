import React, { useState } from 'react';
import type { ScheduleItem } from '../types';
import { SCHEDULE_ITEMS, DAYS, COMMON_TASK_TITLES } from '../constants';
import { ChevronDownIcon, PlusIcon } from './Icons';

const BORDER_COLORS = [
    'border-red-400',
    'border-blue-400',
    'border-yellow-400',
    'border-green-400',
    'border-pink-400',
    'border-purple-400',
    'border-indigo-400',
];

interface ScheduleCardProps {
  item: ScheduleItem;
  onClick: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onClick }) => {
  const { title, description, startTime, endTime, color, isLunch } = item;

  return (
    <div 
        className={`flex items-start gap-4 mb-4 border-l-4 ${color} pl-4 py-2 ${!isLunch ? 'cursor-pointer hover:bg-gray-800/50' : ''} transition-colors duration-200`}
        onClick={!isLunch ? onClick : undefined}
    >
      <div className="text-sm text-gray-400 w-16 text-right pr-4 shrink-0">
        <p>{startTime}</p>
        <p className="mt-6">{endTime}</p>
      </div>
      <div className={`flex-1 ${isLunch ? 'bg-indigo-500/10' : 'bg-[#0D0F14]'} p-4 rounded-2xl`}>
        {isLunch ? (
          <div className="flex items-center justify-center h-full">
            <p className="font-bold text-indigo-400">Lunch 🥪</p>
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
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(SCHEDULE_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', startTime: '', endTime: '' });
  const [editingTask, setEditingTask] = useState<ScheduleItem | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleOpenModal = (task: ScheduleItem | null = null) => {
    if (task) {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            startTime: task.startTime,
            endTime: task.endTime,
        });
    } else {
        setEditingTask(null);
        setNewTask({ title: '', description: '', startTime: '', endTime: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', startTime: '', endTime: '' });
    setEditingTask(null);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));

    if (name === 'title' && value) {
        const filteredSuggestions = COMMON_TASK_TITLES.filter(title =>
            title.toLowerCase().includes(value.toLowerCase()) && title.toLowerCase() !== value.toLowerCase()
        );
        setSuggestions(filteredSuggestions.slice(0, 5)); // Limit suggestions
    } else {
        setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewTask(prev => ({ ...prev, title: suggestion }));
    setSuggestions([]);
  };

  const handleSaveTask = () => {
    if (editingTask) {
        setScheduleItems(prevItems =>
            prevItems.map(item =>
                item.id === editingTask.id ? { ...item, ...newTask } : item
            )
        );
    } else {
        const newScheduleItem: ScheduleItem = {
            id: Date.now(),
            ...newTask,
            color: BORDER_COLORS[Math.floor(Math.random() * BORDER_COLORS.length)],
        };
        setScheduleItems(prevItems => [...prevItems, newScheduleItem]);
    }
    handleCloseModal();
  };
  
  const isFormValid = newTask.title && newTask.description && newTask.startTime && newTask.endTime;

  return (
    <div className="bg-[#1A1C22] rounded-3xl p-6 h-full border border-gray-800">
      <header className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-xl font-bold text-white">Today</h2>
            <p className="text-sm text-gray-400">Welcome Elizabeth</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-gray-400 text-sm hover:text-white">
            <span>March 2024</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button onClick={() => handleOpenModal()} className="bg-indigo-500 text-white rounded-lg py-2 px-4 flex items-center gap-2 text-sm font-semibold hover:bg-indigo-600 transition-colors">
            <PlusIcon className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </header>

      <div className="flex justify-between mb-8">
        {DAYS.map((dayInfo, index) => (
          <div key={index} className={`text-center p-3 rounded-xl cursor-pointer w-14 ${index === 2 ? 'bg-indigo-500' : 'hover:bg-gray-700/50'} transition-colors`}>
            <p className={`text-sm ${index === 2 ? 'text-white' : 'text-gray-400'}`}>{dayInfo.day}</p>
            <p className="font-bold text-lg text-white mt-1">{dayInfo.date}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {scheduleItems
            .sort((a,b) => a.startTime.localeCompare(b.startTime))
            .map(item => (
                <ScheduleCard key={item.id} item={item} onClick={() => handleOpenModal(item)} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#1A1C22] rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'Add Task'}</h3>
            
            <div className="relative mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={newTask.title}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full bg-[#0D0F14] border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-[#0D0F14] border border-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <li key={i} onClick={() => handleSuggestionClick(s)} className="px-3 py-2 cursor-pointer hover:bg-indigo-500/20 text-white">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full bg-[#0D0F14] border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-400 mb-1">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={newTask.startTime}
                  onChange={handleInputChange}
                  className="w-full bg-[#0D0F14] border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-400 mb-1">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={newTask.endTime}
                  onChange={handleInputChange}
                  className="w-full bg-[#0D0F14] border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <button onClick={handleCloseModal} className="bg-gray-700 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
              <button onClick={handleSaveTask} disabled={!isFormValid} className="bg-indigo-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
