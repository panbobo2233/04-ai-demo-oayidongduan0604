
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, BellRing, Settings, ChevronRight, Clock, Plus, Trash2 } from 'lucide-react';

interface NotificationSettingsProps {
  onBack: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack }) => {
  const [times, setTimes] = useState<string[]>(['09:00']);

  const addTime = () => {
    setTimes([...times, '14:00']);
  };

  const removeTime = (index: number) => {
    if (times.length > 1) {
      setTimes(times.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7]">
      {/* Header - No timestamp as requested */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-200 z-[70]">
        <button onClick={onBack} className="p-2 text-[#007AFF] flex items-center">
          <ChevronLeft size={24} />
          <span className="text-[16px] -ml-1">办公助手</span>
        </button>
        <h1 className="text-[17px] font-bold text-[#1A1A1A]">通知设置</h1>
        <button className="p-2 text-[#1A1A1A]">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Settings Card */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center space-x-2 bg-gray-50/50">
            <Settings size={18} className="text-[#8E8E93]" />
            <span className="text-[15px] font-bold text-[#1A1A1A]">提醒规则配置</span>
          </div>
          
          <div className="divide-y divide-gray-50">
            {/* Multiple Times Setting */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BellRing size={20} className="text-orange-400" />
                  <div>
                    <p className="text-[15px] text-[#1A1A1A]">推送提醒时间</p>
                    <p className="text-[12px] text-gray-400">支持设置每日多个时间点</p>
                  </div>
                </div>
                <button onClick={addTime} className="text-[#007AFF] text-[13px] flex items-center bg-blue-50 px-2 py-1 rounded">
                  <Plus size={14} className="mr-0.5" /> 添加
                </button>
              </div>

              <div className="space-y-2 pl-8">
                {times.map((time, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg group">
                    <span className="text-[#007AFF] font-bold text-[16px]">{time}</span>
                    <button 
                      onClick={() => removeTime(index)}
                      className={`text-gray-300 active:text-red-500 transition-colors ${times.length === 1 ? 'hidden' : ''}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-blue-400" />
                <p className="text-[15px] text-[#1A1A1A]">推送频率</p>
              </div>
              <div className="flex items-center text-[#007AFF] font-medium text-[15px]">
                每个工作日 <ChevronRight size={18} className="ml-1 text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <p className="text-[12px] text-gray-400">系统将按照设置的时间点，定时向您推送当前最新的未处理待办汇总消息。</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
