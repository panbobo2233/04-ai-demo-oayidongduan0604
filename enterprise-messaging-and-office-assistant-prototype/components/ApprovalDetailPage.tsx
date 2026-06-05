
import React from 'react';
import { ChevronLeft, Info, FileText, CheckCircle2 } from 'lucide-react';

interface ApprovalDetailPageProps {
  taskId: string | null;
  onBack: () => void;
}

const ApprovalDetailPage: React.FC<ApprovalDetailPageProps> = ({ taskId, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-100">
        <button onClick={onBack} className="p-2 text-[#007AFF] flex items-center">
          <ChevronLeft size={24} />
          <span className="text-[16px] -ml-1">工作通知</span>
        </button>
        <h1 className="text-[17px] font-bold text-[#1A1A1A]">审批详情</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-20">
        {/* Task Summary */}
        <section className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-[#1A1A1A]">2024年度软开办公系统优化项目</h2>
              <p className="text-[13px] text-[#8E8E93]">流水号: SP-20240520-00821</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="text-[12px] text-gray-400">申请人</p>
              <p className="text-[14px] font-medium">张晓明</p>
            </div>
            <div>
              <p className="text-[12px] text-gray-400">所属部门</p>
              <p className="text-[14px] font-medium">产品研发部</p>
            </div>
            <div>
              <p className="text-[12px] text-gray-400">申请时间</p>
              <p className="text-[14px] font-medium">2024-05-20 14:15</p>
            </div>
            <div>
              <p className="text-[12px] text-gray-400">审批类型</p>
              <p className="text-[14px] font-medium">立项审批</p>
            </div>
          </div>
        </section>

        {/* Content Details */}
        <section className="space-y-3">
          <h3 className="text-[15px] font-bold flex items-center text-[#1A1A1A]">
            <Info size={16} className="mr-1 text-blue-500" />
            申请说明
          </h3>
          <div className="text-[14px] text-gray-600 leading-relaxed bg-white border border-gray-100 p-4 rounded-xl">
            该项目旨在解决当前公司内部消息系统在高峰期的延迟问题，并引入AI办公助手模块以提高中高层领导的待办处理效率。预计周期3个月，预算50万元。
          </div>
        </section>

        {/* Process Flow */}
        <section className="space-y-3">
          <h3 className="text-[15px] font-bold flex items-center text-[#1A1A1A]">
            <CheckCircle2 size={16} className="mr-1 text-green-500" />
            审批流程
          </h3>
          <div className="space-y-4 relative ml-4 border-l border-dashed border-gray-300 pl-6 pb-2">
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-[14px] font-bold">发起申请</p>
              <p className="text-[12px] text-gray-400">张晓明 05-20 14:15</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-[14px] font-bold">部门负责人审批</p>
              <p className="text-[12px] text-gray-400">王经理 (已通过) 05-20 16:30</p>
              <p className="text-[12px] bg-gray-50 p-2 mt-1 rounded italic text-gray-500">"项目非常有必要，同意立项。"</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <p className="text-[14px] font-bold text-blue-600">等待分管领导审批 (我)</p>
              <p className="text-[12px] text-gray-400">当前环节</p>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 flex space-x-3 z-50 shadow-lg">
        <button className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium active:bg-gray-50">转交</button>
        <button className="flex-1 py-3 bg-[#FF3B30] rounded-xl text-white font-bold active:bg-red-600 shadow-md">驳回申请</button>
        <button className="flex-2 py-3 bg-[#3078FF] rounded-xl text-white font-bold active:bg-blue-700 shadow-md px-6">批准立项</button>
      </div>
    </div>
  );
};

export default ApprovalDetailPage;
