
import React from 'react';
import { ChevronLeft, MoreHorizontal, Settings, LayoutGrid, ChevronRight, ClipboardList } from 'lucide-react';

interface OfficeAssistantDetailProps {
  onBack: () => void;
  onToSettings: () => void;
  onToApprovalCenter: (systemName?: string) => void;
}

const OfficeAssistantDetail: React.FC<OfficeAssistantDetailProps> = ({ onBack, onToSettings, onToApprovalCenter }) => {
  
  const systems = [
    { name: 'OA公文', count: 2 },
    { name: 'OA办公', count: 3 },
    { name: '客户关系定价', count: 1 }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] relative">
      {/* Header */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-200 z-[70]">
        <button onClick={onBack} className="p-2 text-[#007AFF] flex items-center">
          <ChevronLeft size={24} />
          <span className="text-[16px] -ml-1">交流圈</span>
        </button>
        <h1 className="text-[17px] font-bold text-[#1A1A1A]">办公助手</h1>
        <button className="p-2 text-[#1A1A1A]">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* Message Stream (Dialogue Style) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="text-center">
          <span className="text-[11px] text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full">今天 09:00</span>
        </div>

        {/* Office Assistant Message Entry */}
        <div className="flex items-start space-x-2">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-lg bg-[#FF9500] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#F28C00]">
            <span className="text-white text-[9px] font-bold leading-tight text-center px-1">办公<br/>助手</span>
          </div>
          
          <div className="flex-1 space-y-1">
            <span className="text-[12px] text-gray-500 ml-1">办公助手</span>
            
            {/* Daily Todo Summary Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              {/* Card Header */}
              <div className="p-4 bg-[#FF9500] text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ClipboardList size={20} className="text-white/90" />
                    <span className="font-bold text-[16px]">每日待办提醒</span>
                  </div>
                  <span className="text-[11px] opacity-80 font-medium">2024年5月21日</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-1 whitespace-nowrap overflow-hidden">
                  <span className="text-[14px] opacity-90 flex-shrink-0">目前您还有</span>
                  <span className="text-[32px] font-bold leading-none mx-1">8</span>
                  <span className="text-[14px] flex-shrink-0">项待处理任务</span>
                </div>
              </div>

              {/* Task Breakdown */}
              <div className="px-4 py-1">
                <div className="divide-y divide-gray-100">
                  {systems.map((sys, idx) => (
                    <button 
                      key={idx}
                      onClick={() => onToApprovalCenter(sys.name)}
                      className="w-full flex items-center justify-between py-4 active:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-[15px] text-gray-700">{sys.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[17px] text-[#1A1A1A]">{sys.count}</span>
                        <ChevronRight size={16} className="text-gray-300" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Footer Slogan */}
              <div className="px-5 py-4 border-t border-gray-100 bg-[#FBFBFB]">
                <p className="text-[14px] text-[#FF9500] font-bold text-center tracking-wide italic">
                  “ 一起同行，一起共赢。”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 flex items-center justify-between px-4 space-x-4 z-[90] pb-4">
        <button 
          onClick={onToSettings}
          className="flex-1 h-12 rounded-xl font-bold flex items-center justify-center space-x-2 bg-white border border-[#FF9500] text-[#FF9500] active:bg-orange-50 transition-colors"
        >
          <Settings size={18} />
          <span>通知设置</span>
        </button>
        
        <button 
          onClick={() => onToApprovalCenter('全部')}
          className="flex-1 h-12 rounded-xl font-bold flex items-center justify-center space-x-2 bg-[#FF9500] text-white shadow-md active:bg-[#E68600] transition-transform active:scale-95"
        >
          <LayoutGrid size={18} />
          <span>进入审批中心</span>
        </button>
      </div>
    </div>
  );
};

export default OfficeAssistantDetail;
