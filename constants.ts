
import type { SummaryCategory, Task, ScheduleItem } from './types';
import { ClockIcon, StarIcon, CalendarIcon, ArchiveBoxIcon, StarFilledIcon } from './components/Icons';

export const SUMMARY_CATEGORIES: SummaryCategory[] = [
  {
    title: 'Today',
    taskCount: 6,
    icon: ClockIcon,
    color: 'text-green-300',
    bgColor: 'bg-[#A3F5B8]/20',
  },
  {
    title: 'High Priorities',
    taskCount: 10,
    icon: StarIcon,
    color: 'text-red-300',
    bgColor: 'bg-[#F49488]/20',
  },
  {
    title: 'In Schedule',
    taskCount: 8,
    icon: CalendarIcon,
    color: 'text-yellow-300',
    bgColor: 'bg-[#FADE7B]/20',
  },
];

export const TODAY_TASKS: Task[] = [
  {
    id: 1,
    title: 'Landing Page Design',
    emoji: '😊',
    description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
    time: '10:00 pm to 11:00 pm',
    icon: StarFilledIcon,
    iconBgColor: 'bg-red-400/20 text-red-300',
  },
  {
    id: 2,
    title: 'Prototyping',
    emoji: '🙈',
    description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
    icon: ArchiveBoxIcon,
    iconBgColor: 'bg-yellow-400/20 text-yellow-300',
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
    {
        id: 1,
        title: 'Wireframing',
        description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
        startTime: '09:00',
        endTime: '10:30',
        color: 'border-red-400',
    },
    {
        id: 2,
        title: 'UI Design',
        description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
        startTime: '11:00',
        endTime: '12:30',
        color: 'border-blue-400',
    },
    {
        id: 3,
        title: 'Lunch',
        description: '',
        startTime: '13:00',
        endTime: '14:00',
        color: 'border-blue-400',
        isLunch: true,
    },
    {
        id: 4,
        title: 'Prototyping',
        description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
        startTime: '14:00',
        endTime: '15:30',
        color: 'border-yellow-400',
    },
    {
        id: 5,
        title: 'Usability Testing',
        description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
        startTime: '15:30',
        endTime: '16:30',
        color: 'border-green-400',
    },
    {
        id: 6,
        title: 'Meeting',
        description: 'Lorem ipsum dolor sit amet consectetur. Ipsum semper in quis semper metus amet purus facilisi non.',
        startTime: '17:00',
        endTime: '18:00',
        color: 'border-pink-400',
    },
];

export const DAYS = [
    { day: 'Mon', date: 25 },
    { day: 'Tue', date: 26 },
    { day: 'Wed', date: 27 },
    { day: 'Thu', date: 28 },
    { day: 'Fri', date: 29 },
];

export const COMMON_TASK_TITLES: string[] = [
    'Wireframing',
    'UI Design',
    'Prototyping',
    'Usability Testing',
    'Meeting',
    'Lunch',
    'Design Review',
    'Code Review',
    'Client Call',
    'Project Sync-up',
    'Brainstorming Session',
    'Research',
    'Content Creation',
    'Documentation',
];
