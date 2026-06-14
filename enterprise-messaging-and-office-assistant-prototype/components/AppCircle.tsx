import React from 'react';
import { ChevronRight, ClipboardList, Search, Volume2 } from 'lucide-react';

interface AppCircleProps {
  onToApprovalCenter: (systemName?: string) => void;
}

const AppCircle: React.FC<AppCircleProps> = ({ onToApprovalCenter }) => {
  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] overflow-y-auto">
      {/* 顶部标识栏 */}
      <header className="h-12 bg-white flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
        <span className="text-[16px] font-bold text-[#1A1A1A]">广州银行</span>
        <button className="p-1 text-gray-500">
          <Search size={22} />
        </button>
      </header>

      {/* 工作中心入口 - 单行卡片 */}
      <button
        onClick={() => onToApprovalCenter('全部')}
        className="bg-white rounded-2xl mx-4 mt-4 px-4 py-3.5 shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <ClipboardList size={20} className="text-blue-500" />
          </div>
          <div className="text-left">
            <span className="text-[15px] font-bold text-[#1A1A1A]">工作中心</span>
            <span className="text-[12px] text-gray-400 ml-2">18项待处理 · 2项超时</span>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </button>

      {/* 公告模块 - 单行 */}
      <div className="bg-white rounded-2xl mx-4 mt-4 px-4 py-3 shadow-sm border border-gray-100 flex items-center">
        <div className="flex items-center space-x-2 shrink-0 mr-3">
          <Volume2 size={16} className="text-orange-500" />
          <span className="text-[14px] font-bold text-[#1A1A1A]">公告</span>
        </div>
        <div className="w-px h-4 bg-gray-200 shrink-0 mr-3" />
        <div className="overflow-hidden flex-1">
          <div className="whitespace-nowrap text-[13px] text-gray-500">
            该模块暂不改动
          </div>
        </div>
      </div>

      {/* 常用工具 */}
      <div className="bg-white rounded-2xl mx-4 mt-4 p-4 shadow-sm border border-gray-100">
        <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-3">常用工具</h2>
        <div className="bg-gray-50 rounded-xl py-10 flex items-center justify-center">
          <span className="text-sm text-gray-400">该模块暂不改动</span>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};

export default AppCircle;
