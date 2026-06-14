import React, { useState } from 'react';
import { ChevronLeft, Check, X, Ban, CheckCheck, Undo2 } from 'lucide-react';

interface BatchApprovalProps {
  onBack: () => void;
  mode?: 'approval' | 'read';
}

interface TaskItem {
  id: string;
  category: '公文' | '流程' | '业务';
  subType: string;
  isUrgent: boolean;
  status: string;
  statusColor: string;
  iconColor: string;
  title: string;
  source: string;
  department: string;
  applicant: string;
  time: string;
  aiSummary: string;
  extraInfo?: { label: string; value: string } | null;
}

// 与工作中心完全一致的任务数据，按紧急 > 收文/发文/签报 > 请假/用车申请 > 其他排序
const allTasks: TaskItem[] = [
  // ===== 紧急任务 =====
  {
    id: 'center_task_1',
    category: '公文', subType: '签报', isUrgent: true,
    status: '紧急', statusColor: 'text-red-500 bg-red-50',
    iconColor: 'text-red-500',
    title: '关于建设新一代 XX 系统的请示签报',
    source: '来源：公文系统', department: '金融科技部', applicant: '王军',
    time: '09:00', aiSummary: '申请 OCR 能力建设，预算 80 万元，需科技部审批。',
    extraInfo: null,
  },
  {
    id: 'center_task_4',
    category: '公文', subType: '发文', isUrgent: true,
    status: '紧急', statusColor: 'text-red-500 bg-red-50',
    iconColor: 'text-red-500',
    title: '关于印发2024年度信息化建设计划的通知',
    source: '来源：公文系统', department: '信息科技部', applicant: '张伟',
    time: '08:15', aiSummary: '涉及全行系统升级，需各部门确认。',
    extraInfo: null,
  },
  {
    id: 'center_task_7',
    category: '公文', subType: '签报', isUrgent: true,
    status: '紧急', statusColor: 'text-red-500 bg-red-50',
    iconColor: 'text-red-500',
    title: '关于申请增加科技专项预算的签报',
    source: '来源：公文系统', department: '计划财务部', applicant: '赵刚',
    time: '10:30', aiSummary: '申请追加预算 500 万元。',
    extraInfo: null,
  },
  // ===== 收文/发文/签报（非紧急） =====
  {
    id: 'center_task_5',
    category: '公文', subType: '收文', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-blue-500',
    title: '银保监会关于加强金融科技风险管理的指导意见',
    source: '来源：公文系统', department: '合规部', applicant: '李强',
    time: '昨天', aiSummary: '需组织学习并落实相关要求。',
    extraInfo: null,
  },
  {
    id: 'center_task_6',
    category: '公文', subType: '发文', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-blue-500',
    title: '关于报送2024年第二季度经营分析报告的通知',
    source: '来源：公文系统', department: '办公室', applicant: '刘洋',
    time: '06-12', aiSummary: '请各部门于6月20日前提交数据。',
    extraInfo: null,
  },
  {
    id: 'center_task_10',
    category: '公文', subType: '收文', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-blue-500',
    title: '中国人民银行关于下调存款准备金率的通知',
    source: '来源：公文系统', department: '资金管理部', applicant: '孙磊',
    time: '06-11', aiSummary: '自6月25日起执行，需制定实施细则。',
    extraInfo: null,
  },
  {
    id: 'center_task_11',
    category: '公文', subType: '签报', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-blue-500',
    title: '关于采购新一代服务器设备的签报请示',
    source: '来源：公文系统', department: '基础设施部', applicant: '黄伟',
    time: '06-10', aiSummary: '老旧设备需替换，预算200万元。',
    extraInfo: null,
  },
  // ===== 请假/用车申请 =====
  {
    id: 'center_task_2',
    category: '流程', subType: '请假', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-orange-500',
    title: '李明提交的个人事假申请',
    source: '来源：OA 办公', department: '零售金融部', applicant: '李明',
    time: '08:30', aiSummary: '请假 3 天，团队同期请假 1 人，符合制度。',
    extraInfo: { label: '请假时间', value: '06-18 至 06-20 (共 3 天)' },
  },
  {
    id: 'center_task_8',
    category: '流程', subType: '用车申请', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-orange-500',
    title: '张海提交的因公外出用车申请',
    source: '来源：OA 办公', department: '市场拓展部', applicant: '张海',
    time: '昨天', aiSummary: '需前往客户现场，预计用车1天。',
    extraInfo: { label: '用车时间', value: '06-15 08:00-17:00' },
  },
  {
    id: 'center_task_9',
    category: '流程', subType: '用车申请', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-orange-500',
    title: '周敏提交的因公外出用车申请',
    source: '来源：OA 办公', department: '风险管理部', applicant: '周敏',
    time: '06-13', aiSummary: '需前往监管机构报送材料。',
    extraInfo: { label: '用车时间', value: '06-14 09:00-12:00' },
  },
  {
    id: 'center_task_12',
    category: '流程', subType: '请假', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-orange-500',
    title: '赵雷提交的带薪年假申请',
    source: '来源：OA 办公', department: '金融科技部', applicant: '赵雷',
    time: '06-12', aiSummary: '请假 5 天，已安排工作交接。',
    extraInfo: { label: '请假时间', value: '06-22 至 06-26 (共 5 天)' },
  },
  // ===== 业务类（其他） =====
  {
    id: 'center_task_3',
    category: '业务', subType: '利率定价', isUrgent: false,
    status: '', statusColor: '',
    iconColor: 'text-green-500',
    title: 'XX 集团利率定价偏离申请',
    source: '来源：CRM 系统', department: '公司业务部', applicant: '陈飞',
    time: '昨天', aiSummary: '贷款金额 5000 万，申请下浮 20BP，超授权范围。',
    extraInfo: null,
  },
];

const BatchApproval: React.FC<BatchApprovalProps> = ({ onBack, mode = 'approval' }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState<'agree' | 'reject' | 'read' | null>(null);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === allTasks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allTasks.map(t => t.id)));
    }
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleBatchAgree = () => {
    if (showConfirm === 'agree') {
      // 执行批量同意
      alert(`已同意 ${selectedIds.size} 项任务`);
      setSelectedIds(new Set());
      setShowConfirm(null);
    } else {
      setShowConfirm('agree');
    }
  };

  const handleBatchReject = () => {
    if (showConfirm === 'reject') {
      // 执行批量退回
      alert(`已退回 ${selectedIds.size} 项任务`);
      setSelectedIds(new Set());
      setShowConfirm(null);
    } else {
      setShowConfirm('reject');
    }
  };

  const handleBatchRead = () => {
    if (showConfirm === 'read') {
      alert(`已标记 ${selectedIds.size} 项为已阅`);
      setSelectedIds(new Set());
      setShowConfirm(null);
    } else {
      setShowConfirm('read');
    }
  };

  const cancelAction = () => {
    if (showConfirm) {
      setShowConfirm(null);
    } else {
      deselectAll();
    }
  };

  const hasSelection = selectedIds.size > 0;

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] relative">
      {/* Header */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-100 z-[70] shrink-0">
        <button onClick={onBack} className="p-2 text-[#007AFF] flex items-center">
          <ChevronLeft size={24} />
          <span className="text-[16px] -ml-1">返回</span>
        </button>
        <div className="flex items-center space-x-2">
          <h1 className="text-[17px] font-bold text-[#1A1A1A]">批量处理</h1>
          {hasSelection && (
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
              {selectedIds.size}
            </span>
          )}
        </div>
        <button
          onClick={toggleSelectAll}
          className={`text-[14px] px-2 ${selectedIds.size === allTasks.length ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
        >
          {selectedIds.size === allTasks.length ? '取消全选' : '全选'}
        </button>
      </header>

      {/* 任务列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24">
        {allTasks.map(task => {
          const isSelected = selectedIds.has(task.id);
          return (
            <div
              key={task.id}
              onClick={() => toggleSelect(task.id)}
              className={`bg-white rounded-xl px-3 py-2.5 shadow-sm border transition-colors active:bg-gray-50 cursor-pointer ${
                isSelected ? 'border-blue-400 ring-1 ring-blue-100' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start">
                {/* 复选框 */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 mt-0.5 shrink-0 transition-colors ${
                  isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {isSelected && <Check size={12} className="text-white" />}
                </div>

                {/* 缩小后的图标 */}
                <svg className={`w-4 h-4 ${task.iconColor} mr-2 mt-0.5 shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  {task.category === '公文' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  ) : task.category === '流程' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>

                <div className="flex-1 min-w-0">
                  {/* 第一行：紧急标签（仅紧急任务）+ 标题 | 时间 */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5 pr-2 min-w-0">
                      {task.isUrgent && (
                        <span className="text-[11px] font-medium text-red-500 bg-red-50 px-1 py-0 rounded shrink-0">
                          紧急
                        </span>
                      )}
                      <h3 className="font-medium text-sm text-gray-900 truncate">{task.title}</h3>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0 ml-1">{task.time}</span>
                  </div>

                  {/* 第二行：类型标签 + 部门 · 申请人 */}
                  <div className="flex items-center text-xs text-gray-400 mt-0.5">
                    <span className="text-[11px] font-medium text-blue-500 bg-blue-50 px-1 py-0 rounded mr-1.5 shrink-0">
                      {task.subType}
                    </span>
                    <span className="truncate">{task.department} · {task.applicant}</span>
                  </div>

                  {task.extraInfo && (
                    <div className="flex items-center text-[11px] text-gray-500 mt-0.5">
                      <svg className="w-3 h-3 mr-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {task.extraInfo.value}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className="text-center text-gray-400 text-sm py-4">共 {allTasks.length} 项待处理任务</div>
      </div>

      {/* 底部操作栏 */}
      <div className="shrink-0 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-[80]">
        {hasSelection ? (
          <>
            {showConfirm ? (
              /* 二次确认状态 */
              <div className="px-4 py-3 space-y-3">
                <div className="text-center text-sm text-gray-600">
                  {showConfirm === 'read' ? (
                    <span>确认对选中的 <span className="font-bold text-blue-600">{selectedIds.size}</span> 项任务标记<b className="text-blue-600">已阅</b>？</span>
                  ) : showConfirm === 'agree' ? (
                    <span>确认对选中的 <span className="font-bold text-blue-600">{selectedIds.size}</span> 项任务执行<b className="text-green-600">同意</b>？</span>
                  ) : (
                    <span>确认对选中的 <span className="font-bold text-blue-600">{selectedIds.size}</span> 项任务执行<b className="text-red-500">退回</b>？</span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={cancelAction}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium flex items-center justify-center space-x-1.5 active:bg-gray-50"
                  >
                    <X size={18} />
                    <span>取消操作</span>
                  </button>
                  <button
                    onClick={showConfirm === 'read' ? handleBatchRead : showConfirm === 'agree' ? handleBatchAgree : handleBatchReject}
                    className={`flex-1 py-3 rounded-xl text-white font-bold flex items-center justify-center space-x-1.5 active:opacity-80 ${
                      showConfirm === 'read' ? 'bg-blue-500' : showConfirm === 'agree' ? 'bg-green-500' : 'bg-[#FF3B30]'
                    }`}
                  >
                    <CheckCheck size={18} />
                    <span>{showConfirm === 'read' ? '确认已阅' : showConfirm === 'agree' ? '确认同意' : '确认退回'}</span>
                  </button>
                </div>
              </div>
            ) : mode === 'read' ? (
              /* 待阅模式：取消 + 批量已阅 */
              <div className="flex space-x-3 px-4 py-3">
                <button
                  onClick={cancelAction}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-500 font-medium flex items-center justify-center space-x-1.5 active:bg-gray-50"
                >
                  <Ban size={18} />
                  <span>取消</span>
                </button>
                <button
                  onClick={handleBatchRead}
                  className="flex-[2] py-3 bg-blue-500 rounded-xl text-white font-bold flex items-center justify-center space-x-1.5 shadow-md active:bg-blue-600"
                >
                  <CheckCheck size={18} />
                  <span>批量已阅</span>
                </button>
              </div>
            ) : (
              /* 审批模式：取消 + 同意 + 退回 */
              <div className="flex space-x-3 px-4 py-3">
                <button
                  onClick={cancelAction}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-500 font-medium flex items-center justify-center space-x-1.5 active:bg-gray-50"
                >
                  <Ban size={18} />
                  <span>取消</span>
                </button>
                <button
                  onClick={handleBatchAgree}
                  className="flex-1 py-3 bg-green-500 rounded-xl text-white font-bold flex items-center justify-center space-x-1.5 shadow-md active:bg-green-600"
                >
                  <CheckCheck size={18} />
                  <span>同意</span>
                </button>
                <button
                  onClick={handleBatchReject}
                  className="flex-1 py-3 bg-[#FF3B30] rounded-xl text-white font-bold flex items-center justify-center space-x-1.5 shadow-md active:bg-red-600"
                >
                  <Undo2 size={18} />
                  <span>退回</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* 无选中状态：提示文字 */
          <div className="flex items-center justify-center py-4 text-sm text-gray-400">
            <Check size={16} className="mr-1.5" />
            请勾选需要批量处理的任务
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchApproval;
