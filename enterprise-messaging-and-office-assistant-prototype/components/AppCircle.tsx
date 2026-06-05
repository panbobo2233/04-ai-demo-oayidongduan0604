import React from 'react';
import { Bell, ChevronRight, Bot } from 'lucide-react';

interface AppCircleProps {
  onToApprovalCenter: (systemName?: string) => void;
}

const AppCircle: React.FC<AppCircleProps> = ({ onToApprovalCenter }) => {
  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] overflow-y-auto">
      {/* 我的工作台 - 蓝色渐变卡片 */}
      <div className="relative bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl p-5 text-white shadow-md mx-4 mt-4 overflow-hidden">
        {/* 标题行 */}
        <div className="flex items-center space-x-2 mb-4">
          <Bell size={20} className="text-white" fill="currentColor" />
          <span className="font-medium text-lg">我的工作</span>
        </div>

        {/* 统计数据行 */}
        <div className="flex justify-between items-center mb-6 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
          <div className="text-center flex-1 border-r border-white/20">
            <div className="text-sm text-blue-50">待处理</div>
            <div className="text-2xl font-bold mt-1 text-blue-600 bg-white rounded-lg mx-2 py-1 shadow-sm">18</div>
          </div>
          <div className="text-center flex-1 border-r border-white/20">
            <div className="text-sm text-blue-50">待阅</div>
            <div className="text-2xl font-bold mt-1 text-orange-500">5</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-sm text-blue-50">超时</div>
            <div className="text-2xl font-bold mt-1 text-red-500">2</div>
          </div>
        </div>

        {/* AI 提醒行 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-sm bg-white/20 px-3 py-1.5 rounded-full">
            <span className="mr-1">🤖 AI 提醒:</span> 今日有 2 项审批 17:00 前需处理
          </div>
          <button
            onClick={() => onToApprovalCenter('全部')}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition active:scale-95"
          >
            立即处理 &gt;
          </button>
        </div>
      </div>

      {/* AI 工作助手卡片 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mx-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center font-bold text-lg text-[#1A1A1A]">
            <Bot size={22} className="mr-2 text-blue-500" />
            AI 工作助手
          </div>
          <button className="text-gray-400 text-sm flex items-center">
            更多 <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-4">您有 18 条待办，建议优先处理以下事项：</p>

        {/* 建议列表 */}
        <div className="space-y-3">
          <div
            className="flex p-3 bg-gray-50 rounded-2xl items-start active:bg-gray-100 cursor-pointer"
            onClick={() => onToApprovalCenter('客户关系定价')}
          >
            <div className="bg-blue-100 text-blue-600 font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">1</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 truncate pr-2">利率定价偏离审批</h4>
                <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 shrink-0">今日 17:00 截止</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">涉及 5000 万授信</p>
            </div>
          </div>

          <div
            className="flex p-3 bg-gray-50 rounded-2xl items-start active:bg-gray-100 cursor-pointer"
            onClick={() => onToApprovalCenter('OA公文')}
          >
            <div className="bg-gray-200 text-gray-600 font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">2</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 truncate pr-2">发文审批：关于新一代系统建设的请示</h4>
                <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 shrink-0">已超时 2 天</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">请尽快处理</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <button
            onClick={() => onToApprovalCenter('全部')}
            className="text-blue-500 text-sm font-medium"
          >
            查看全部建议 &gt;
          </button>
        </div>
      </div>

      {/* 底部留白 */}
      <div className="h-4" />
    </div>
  );
};

export default AppCircle;
