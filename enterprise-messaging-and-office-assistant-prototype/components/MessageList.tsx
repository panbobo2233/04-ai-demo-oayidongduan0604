
import React from 'react';
import { Search, Plus, ShieldCheck, Bell, Smartphone, Lock } from 'lucide-react';
import { Page, ChatItem } from '../types';

interface MessageListProps {
  onNavigate: (page: Page) => void;
}

const MessageList: React.FC<MessageListProps> = ({ onNavigate }) => {
  const pinnedItems: ChatItem[] = [
    {
      id: 'work_notice',
      name: '工作通知',
      avatar: 'bg-blue-500',
      lastMessage: 'OA审批：潘逸梵提交的休假申请',
      time: '14:32',
      unreadCount: 1,
      isPinned: true,
      type: 'system'
    },
    {
      id: 'office_assistant',
      name: '办公助手',
      avatar: 'bg-orange-500',
      lastMessage: '每日待办汇总：目前您还有 8 项待办未处理',
      time: '09:00',
      isPinned: true,
      type: 'system'
    }
  ];

  const normalItems: ChatItem[] = [
    { id: '1', name: '潘逸梵', avatar: 'https://picsum.photos/id/64/100/100', lastMessage: '潘逸梵于12月20日 14:24截屏一次', time: '12月20日', type: 'user' },
  ];

  const renderAvatar = (item: ChatItem) => {
    if (item.id === 'work_notice') {
      return (
        <div className="w-12 h-12 rounded-lg bg-[#3078FF] flex items-center justify-center text-white shadow-sm">
          <Bell size={24} fill="currentColor" />
        </div>
      );
    }
    if (item.id === 'office_assistant') {
      return (
        <div className="w-12 h-12 rounded-lg bg-[#FF9500] flex items-center justify-center text-white shadow-sm">
          <ShieldCheck size={24} fill="currentColor" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="px-4 pt-6 pb-2 flex items-center justify-between border-b border-gray-100 bg-[#FBFBFB]">
        <div className="flex items-center space-x-1">
          <h1 className="text-xl font-bold text-[#1A1A1A]">交流圈</h1>
          <Smartphone size={16} className="text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <Lock size={20} className="text-gray-600" />
          <Search size={22} className="text-gray-600" />
          <Plus size={24} className="text-gray-600" />
        </div>
      </header>

      {/* Top Shortcuts Icons */}
      <div className="flex items-center px-4 py-2 space-x-6 border-b border-gray-50 bg-[#FBFBFB]">
        <div className="text-gray-400 font-bold text-lg"><img src="https://img.icons8.com/ios/50/737373/laptop.png" className="w-5 h-5 opacity-40" /></div>
        <div className="text-gray-400 font-bold text-lg">@</div>
        <div className="text-gray-400 text-lg">★</div>
        <div className="text-gray-400 text-lg">🕒</div>
      </div>

      {/* Pinned Items */}
      <div className="bg-[#F8F8F8]">
        {pinnedItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onNavigate(item.id === 'work_notice' ? Page.WORK_NOTICE : Page.OFFICE_ASSISTANT)}
            className="flex px-4 py-3 items-center active:bg-gray-100 transition-colors border-b border-white/50 relative"
          >
            {/* Pinned Badge (Obvious corner triangle) - Changed color to be more prominent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-t-gray-300 border-l-[14px] border-l-transparent"></div>
            
            <div className="relative">
              {renderAvatar(item)}
              {item.unreadCount && (
                <div className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-1 font-bold">
                  {item.unreadCount}
                </div>
              )}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[#1A1A1A] font-medium text-[16px]">{item.name}</span>
                <span className="text-gray-400 text-[11px]">{item.time}</span>
              </div>
              <p className="text-[#8E8E93] text-[13px] truncate">{item.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Normal Items */}
      <div className="flex-1">
        {normalItems.map((item) => (
          <div key={item.id} className="flex px-4 py-3 items-center active:bg-gray-50 border-b border-gray-50">
            <div className="relative">
              {renderAvatar(item)}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[#1A1A1A] font-medium text-[16px]">{item.name}</span>
                <span className="text-gray-400 text-[11px]">{item.time}</span>
              </div>
              <p className="text-[#8E8E93] text-[13px] truncate">{item.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
