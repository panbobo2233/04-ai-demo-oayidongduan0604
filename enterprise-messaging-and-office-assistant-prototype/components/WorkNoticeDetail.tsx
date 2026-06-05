
import React, { useState } from 'react';
import { ChevronLeft, Filter, FileText, Calendar, Clock, ChevronRight, User, MoreHorizontal, Plus, Check, AlertCircle, DollarSign } from 'lucide-react';

interface WorkNoticeDetailProps {
  onBack: () => void;
  onDetail: (id: string) => void;
}

const WorkNoticeDetail: React.FC<WorkNoticeDetailProps> = ({ onBack, onDetail }) => {
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [activeSource, setActiveSource] = useState('全部');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const sources = [
    { name: '全部', id: 'all' },
    { name: 'OA公文', id: 'oa_doc' },
    { name: 'OA办公', id: 'oa_office' },
    { name: '客户关系定价', id: 'crm' }
  ];

  const handleRejectClick = () => {
    setShowRejectDialog(true);
  };

  const closeRejectDialog = () => {
    setShowRejectDialog(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] relative">
      {/* Header */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-200 relative z-[70]">
        <button onClick={onBack} className="p-2 text-[#007AFF] flex items-center">
          <ChevronLeft size={24} />
          <span className="text-[17px] -ml-1">交流圈</span>
        </button>
        <h1 className="text-[17px] font-bold text-[#1A1A1A]">工作通知</h1>
        <div className="flex items-center">
          <button onClick={() => setShowFilterOverlay(true)} className="p-2 text-[#1A1A1A]">
            <Filter size={20} />
          </button>
          <button className="p-2 text-[#1A1A1A]">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </header>

      {/* Filter Overlay Page */}
      {showFilterOverlay && (
        <div className="absolute inset-0 z-[100] bg-black/40 flex items-start justify-center pt-20 px-4" onClick={() => setShowFilterOverlay(false)}>
          <div className="bg-white w-full rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="font-bold text-[16px]">通知来源应用</span>
              <button onClick={() => setShowFilterOverlay(false)} className="text-gray-400">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-2 space-y-1">
              {sources.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setActiveSource(s.name); setShowFilterOverlay(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl active:bg-gray-50"
                >
                  <span className={`text-[15px] ${activeSource === s.name ? 'text-[#3078FF] font-bold' : 'text-gray-700'}`}>{s.name}</span>
                  {activeSource === s.name && <Check size={18} className="text-[#3078FF]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="absolute inset-0 z-[200] bg-black/50 flex items-center justify-center px-8">
          <div className="bg-white rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center space-y-2">
              <h3 className="font-bold text-[18px]">确认驳回?</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed px-2">
                默认退回至起草节点，如需其他操作请进入详情页处理。
              </p>
              
              {/* Added Button instead of the white box as requested */}
              <button 
                onClick={() => { closeRejectDialog(); onDetail('leave_001'); }}
                className="mt-4 flex items-center justify-center space-x-1 text-[#3078FF] text-[14px] font-bold py-2 w-full active:opacity-60"
              >
                <span>查看详情处理</span>
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex border-t border-gray-100">
              <button 
                onClick={closeRejectDialog}
                className="flex-1 py-4 text-[17px] text-[#007AFF] border-r border-gray-100 active:bg-gray-50"
              >
                取消
              </button>
              <button 
                onClick={closeRejectDialog}
                className="flex-1 py-4 text-[17px] text-[#007AFF] font-bold active:bg-gray-50"
              >
                确认驳回
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialogue Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center">
          <span className="text-[11px] text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full">14:32</span>
        </div>

        {/* 1. OA公文 (Official Document) Message */}
        {(activeSource === '全部' || activeSource === 'OA公文') && (
          <div className="flex items-start space-x-2">
            <div className="w-10 h-10 rounded-lg bg-[#3078FF] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <FileText size={20} />
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-[12px] text-gray-500 ml-1">OA公文</span>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-4 space-y-4">
                  <h2 className="text-[16px] font-bold text-[#1A1A1A] leading-tight">关于《2024年三季度数字化转型工作总结及四季度计划》的请示签报</h2>
                  
                  <div className="space-y-2 text-[14px]">
                    <div className="flex">
                      <span className="w-16 text-gray-400 flex-shrink-0">文号：</span>
                      <span className="text-gray-900">软开发〔2024〕128号</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-400 flex-shrink-0">拟稿人：</span>
                      <span className="text-gray-900">李文华 (办公室)</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-400 flex-shrink-0">紧急程度：</span>
                      <span className="text-[#FF3B30] font-medium">紧急</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onDetail('doc_001')}
                    className="w-full flex items-center justify-center py-2 text-[#3078FF] text-[15px] font-medium border-t border-gray-50 active:bg-gray-50 pt-4"
                  >
                    查看详情处理 <ChevronRight size={16} className="ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. OA办公 (Office Tasks / Leave Request) Message */}
        {(activeSource === '全部' || activeSource === 'OA办公') && (
          <div className="flex items-start space-x-2">
            <div className="w-10 h-10 rounded-lg bg-[#FF9500] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <User size={22} />
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-[12px] text-gray-500 ml-1">OA办公</span>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-4 space-y-4 pb-0">
                  <h2 className="text-[16px] font-bold text-[#1A1A1A] leading-tight">王亮提交的休假申请</h2>
                  
                  <div className="space-y-2 text-[14px]">
                    <div className="flex">
                      <span className="w-16 text-gray-400 flex-shrink-0">休假时间:</span>
                      <span className="text-[#FF3B30] font-medium">05-22 至 05-24</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-400 flex-shrink-0">时长:</span>
                      <span className="text-gray-900">3.0 天</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-400 flex-shrink-0">请假原因:</span>
                      <span className="text-gray-900 leading-relaxed">带家人外出旅游，已做好工作交接。</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onDetail('leave_001')}
                    className="w-full flex items-center justify-center py-4 text-[#3078FF] text-[15px] font-medium border-t border-gray-50 active:opacity-70"
                  >
                    查看详情处理 <ChevronRight size={16} className="ml-0.5" />
                  </button>
                </div>
                <div className="flex border-t border-gray-100 divide-x divide-gray-100">
                  <button 
                    onClick={handleRejectClick}
                    className="flex-1 py-3.5 text-[#FF3B30] text-[16px] font-medium active:bg-gray-50"
                  >
                    驳回
                  </button>
                  <button className="flex-1 py-3.5 text-[#3078FF] text-[16px] font-bold active:bg-gray-50">同意</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. 客户关系定价 (CRM Pricing) Message */}
        {(activeSource === '全部' || activeSource === '客户关系定价') && (
          <div className="flex items-start space-x-2">
            <div className="w-10 h-10 rounded-lg bg-[#34C759] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <DollarSign size={22} />
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-[12px] text-gray-500 ml-1">客户关系定价</span>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-4 space-y-4">
                  <h2 className="text-[16px] font-bold text-[#1A1A1A] leading-tight">XX集团战略合作利率定价偏离申请</h2>
                  
                  <div className="space-y-2 text-[14px]">
                    <div className="flex">
                      <span className="w-18 text-gray-400 flex-shrink-0">项目编号：</span>
                      <span className="text-gray-900">CRM-2024-0091</span>
                    </div>
                    <div className="flex">
                      <span className="w-18 text-gray-400 flex-shrink-0">客户名称：</span>
                      <span className="text-gray-900">某某实业控股集团</span>
                    </div>
                    <div className="flex">
                      <span className="w-18 text-gray-400 flex-shrink-0">拟定利率：</span>
                      <span className="text-[#34C759] font-bold">LPR-20BP</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onDetail('crm_001')}
                    className="w-full flex items-center justify-center py-2 text-[#3078FF] text-[15px] font-medium border-t border-gray-50 active:bg-gray-50 pt-4"
                  >
                    查看详情处理 <ChevronRight size={16} className="ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <span className="text-[11px] text-gray-300">昨天 09:15</span>
        </div>
      </div>
    </div>
  );
};

export default WorkNoticeDetail;
