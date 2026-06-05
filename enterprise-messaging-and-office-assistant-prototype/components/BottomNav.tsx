
import React from 'react';
import { MessageSquare, Users, Grid, Compass, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigate?: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { name: '交流圈', icon: <MessageSquare size={24} />, badge: '99+' },
    { name: '通讯录', icon: <Users size={24} /> },
    { name: '应用圈', icon: <Grid size={24} /> },
    { name: '工作圈', icon: <Compass size={24} />, badge: ' ' }, // Small dot badge
    { name: '我', icon: <User size={24} /> },
  ];

  const handleTabClick = (tabName: string) => {
    if (onNavigate) {
      onNavigate(tabName);
    }
  };

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[#F9F9F9] border-t border-gray-200 flex justify-around items-center px-2 z-[60]">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={`flex flex-col items-center justify-center relative flex-1 pt-1 ${
            activeTab === tab.name ? 'text-[#007AFF]' : 'text-[#8E8E93]'
          }`}
        >
          <div className="relative">
            {tab.icon}
            {tab.badge && (
              <span className={`absolute -top-1 -right-2 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-1 ${tab.badge === ' ' ? 'w-2 h-2 p-0' : ''}`}>
                {tab.badge}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">{tab.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
