import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, SlidersHorizontal, RefreshCw, Plus } from 'lucide-react';

interface ApprovalCenterProps {
  initialSystem?: string;
  onBack: () => void;
  onDetail: (id: string) => void;
}

// 任务数据类型
interface TaskItem {
  id: string;
  category: '公文' | '流程' | '业务';
  subType: string;
  isUrgent: boolean;
  status: string;
  statusColor: string;
  iconBg: string;
  iconColor: string;
  title: string;
  source: string;
  department: string;
  applicant: string;
  time: string;
  aiSummary: string;
  extraInfo?: { label: string; value: string } | null;
}

const ApprovalCenter: React.FC<ApprovalCenterProps> = ({ initialSystem = '全部', onBack, onDetail }) => {
  const [activeTab, setActiveTab] = useState('待处理');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // 高级筛选项状态
  const [advType, setAdvType] = useState('全部');
  const [advStatus, setAdvStatus] = useState('全部');
  const [advTime, setAdvTime] = useState('全部');
  const [advDept, setAdvDept] = useState('全部');
  const [appliedAdvFilter, setAppliedAdvFilter] = useState(false);

  useEffect(() => {
    if (initialSystem !== '全部') {
      setActiveFilter(initialSystem);
    }
  }, [initialSystem]);

  const tabs = ['待处理', '待阅', '已处理', '我发起'];

  const filters = [
    { name: '全部', hasDot: false },
    { name: '紧急', hasDot: true },
    { name: '公文', hasDot: false },
    { name: '流程', hasDot: false },
    { name: '业务', hasDot: false },
  ];

  // 所有任务卡片数据
  const allTasks: TaskItem[] = [
    {
      id: 'center_task_1',
      category: '公文',
      subType: '签报',
      isUrgent: true,
      status: '紧急',
      statusColor: 'text-red-500 bg-red-50',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      title: '关于建设新一代 XX 系统的请示签报',
      source: '来源：公文系统',
      department: '金融科技部',
      applicant: '王军',
      time: '09:00',
      aiSummary: '申请 OCR 能力建设，预算 80 万元，需科技部审批。',
      extraInfo: null,
    },
    {
      id: 'center_task_2',
      category: '流程',
      subType: '请假',
      isUrgent: false,
      status: '待批',
      statusColor: 'text-orange-500 bg-orange-50',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      title: '李明提交的个人事假申请',
      source: '来源：OA 办公',
      department: '零售金融部',
      applicant: '李明',
      time: '08:30',
      aiSummary: '请假 3 天，团队同期请假 1 人，符合制度。',
      extraInfo: { label: '请假时间', value: '05-22 至 05-24 (共 3 天)' },
    },
    {
      id: 'center_task_3',
      category: '业务',
      subType: '利率定价',
      isUrgent: true,
      status: '今日截止',
      statusColor: 'text-red-500 border border-red-200',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      title: 'XX 集团利率定价偏离申请',
      source: '来源：CRM 系统',
      department: '公司业务部',
      applicant: '陈飞',
      time: '昨天',
      aiSummary: '贷款金额 5000 万，申请下浮 20BP，超授权范围。',
      extraInfo: null,
    },
  ];

  const aiRecommendations = [
    {
      id: 'center_task_3',
      title: '利率定价偏离审批',
      tag: '今日 17:00 截止',
      tagColor: 'text-red-500 bg-red-50',
      desc: '涉及 5000 万授信',
    },
    {
      id: 'center_task_1',
      title: '发文审批：关于新一代...',
      tag: '已超时 2 天',
      tagColor: 'text-red-500 bg-red-50',
      desc: '请尽快处理',
    },
  ];

  const filteredTasks = allTasks.filter(task => {
    if (activeFilter === '紧急' && !task.isUrgent) return false;
    if (activeFilter === '公文' && task.category !== '公文') return false;
    if (activeFilter === '流程' && task.category !== '流程') return false;
    if (activeFilter === '业务' && task.category !== '业务') return false;
    return true;
  });

  const applyAdvancedFilter = () => {
    setAppliedAdvFilter(true);
    setShowAdvancedFilter(false);
  };

  const resetAdvancedFilter = () => {
    setAdvType('全部');
    setAdvStatus('全部');
    setAdvTime('全部');
    setAdvDept('全部');
    setAppliedAdvFilter(false);
    setShowAdvancedFilter(false);
  };

  const displayTasks = filteredTasks.filter(task => {
    if (!appliedAdvFilter) return true;
    if (advType !== '全部' && task.category !== advType) return false;
    return true;
  });

  const isFilterActive = (filterName: string) => activeFilter === filterName;

  const selectOption = (options: { label: string; value: string }[], current: string, setter: (v: string) => void) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setter(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            current === opt.value
              ? 'border border-blue-500 text-blue-500 bg-blue-50'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  const timeOptions = [
    { label: '全部', value: '全部' },
    { label: '今天', value: '今天' },
    { label: '近3天', value: '近3天' },
    { label: '近7天', value: '近7天' },
    { label: '近30天', value: '近30天' },
  ];

  const deptOptions = [
    { label: '全部', value: '全部' },
    { label: '金融科技部', value: '金融科技部' },
    { label: '零售金融部', value: '零售金融部' },
    { label: '公司业务部', value: '公司业务部' },
    { label: '风险管理部', value: '风险管理部' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] relative">
      {/* Header */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-100 z-[70] shrink-0">
        <button onClick={onBack} className="p-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-[#1A1A1A]">工作中心</h1>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600">
            <Search size={22} />
          </button>
          <button className="p-2 text-gray-600" onClick={() => setShowAdvancedFilter(true)}>
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </header>

      {/* 滚动内容区：统计栏 + AI推荐 + 置顶Tab+筛选 + 卡片列表 */}
      <div className="flex-1 overflow-y-auto">
        {/* 统计栏 */}
        <div className="bg-white px-4 py-4 flex justify-between text-center rounded-b-2xl shadow-sm mb-3">
          <div className="flex-1">
            <div className="text-gray-500 text-sm mb-1">待处理</div>
            <div className="text-3xl font-bold text-blue-500">18</div>
          </div>
          <div className="w-px bg-gray-100 my-2"></div>
          <div className="flex-1">
            <div className="text-gray-500 text-sm mb-1">待阅</div>
            <div className="text-3xl font-bold text-orange-400">5</div>
          </div>
          <div className="w-px bg-gray-100 my-2"></div>
          <div className="flex-1">
            <div className="text-gray-500 text-sm mb-1">超时</div>
            <div className="text-3xl font-bold text-red-500">2</div>
          </div>
        </div>

        {/* AI 推荐 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mx-4 p-4 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-blue-700 font-medium text-[14px]">
              <span className="mr-1">⭐ AI 推荐优先处理</span>
            </div>
            <button className="text-blue-500 text-sm flex items-center">
              <RefreshCw size={14} className="mr-1" /> 换一换
            </button>
          </div>

          <div className="flex overflow-x-auto space-x-3 no-scrollbar pb-1">
            {aiRecommendations.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onDetail(item.id)}
                className="bg-white min-w-[85%] rounded-xl p-3 shadow-sm flex items-start shrink-0 border border-white active:bg-gray-50 cursor-pointer"
              >
                <div className="bg-gray-100 text-gray-500 font-bold w-6 h-6 rounded flex items-center justify-center shrink-0 mr-3 text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{item.title}</h4>
                    <span className={`text-[10px] ${item.tagColor} px-1 py-0.5 rounded shrink-0 ml-2`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 标签页 + 筛选（合并为一个 sticky 块） */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          {/* 标签页切换 */}
          <div className="flex justify-around px-4 pt-2 border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-[14px] transition-colors ${
                  activeTab === tab
                    ? 'text-blue-500 font-medium border-b-2 border-blue-500'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 筛选 chip */}
          <div className="flex overflow-x-auto space-x-2 px-4 py-3 no-scrollbar">
            {filters.map(f => (
              <button
                key={f.name}
                onClick={() => setActiveFilter(f.name)}
                className={`px-4 py-1.5 rounded-full text-sm shrink-0 flex items-center transition-colors ${
                  isFilterActive(f.name)
                    ? 'border border-blue-500 text-blue-500 bg-blue-50'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {f.name}
                {f.hasDot && <span className="w-1.5 h-1.5 bg-red-500 rounded-full ml-1"></span>}
              </button>
            ))}
            <button
              onClick={() => setShowAdvancedFilter(true)}
              className={`px-4 py-1.5 rounded-full text-sm shrink-0 flex items-center ml-auto transition-colors ${
                appliedAdvFilter
                  ? 'border border-blue-500 text-blue-500 bg-blue-50'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              筛选
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* 任务卡片列表 */}
        <div className="px-4 py-3 space-y-4 pb-24">
          {displayTasks.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-12">暂无匹配的任务</div>
          ) : (
            displayTasks.map(task => (
              <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className={`${task.iconBg} p-2 rounded-xl mr-3 shrink-0`}>
                    <svg className={`w-6 h-6 ${task.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {task.category === '公文' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      ) : task.category === '流程' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex flex-wrap items-center gap-2 pr-2">
                        <span className={`text-xs font-medium ${task.statusColor} px-1.5 py-0.5 rounded`}>
                          {task.status}
                        </span>
                        <span className="text-xs font-medium text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                          {task.subType}
                        </span>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{task.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded mr-2">{task.source}</span>
                      <span>{task.department} · {task.applicant}</span>
                    </div>
                    {task.extraInfo && (
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {task.extraInfo.value}
                      </div>
                    )}
                    <div className="bg-blue-50/50 rounded-lg p-2.5 flex justify-between items-center mt-2 border border-blue-50">
                      <p className="text-xs text-gray-500 flex-1 mr-2">
                        <span className="text-indigo-400 mr-1">⭐ AI 摘要：</span>{task.aiSummary}
                      </p>
                      <button
                        onClick={() => onDetail(task.id)}
                        className="text-blue-500 text-sm font-medium shrink-0"
                      >
                        处理 &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {displayTasks.length > 0 && (
            <div className="text-center text-gray-400 text-sm py-4">没有更多啦</div>
          )}
        </div>
      </div>

      {/* 高级筛选弹窗 */}
      {showAdvancedFilter && (
        <div className="absolute inset-0 z-[200] bg-black/40 flex flex-col justify-end" onClick={() => setShowAdvancedFilter(false)}>
          <div className="bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-250 max-h-[80%] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <button onClick={resetAdvancedFilter} className="text-gray-500 text-[15px]">重置</button>
              <h2 className="text-[17px] font-bold text-[#1A1A1A]">高级筛选</h2>
              <button onClick={() => setShowAdvancedFilter(false)} className="text-gray-400">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-5">
              <div>
                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3">审批类型</h3>
                {selectOption(
                  [{ label: '全部', value: '全部' }, { label: '公文', value: '公文' }, { label: '流程', value: '流程' }, { label: '业务', value: '业务' }],
                  advType, setAdvType
                )}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3">状态</h3>
                {selectOption(
                  [{ label: '全部', value: '全部' }, { label: '待处理', value: '待处理' }, { label: '待阅', value: '待阅' }, { label: '已处理', value: '已处理' }],
                  advStatus, setAdvStatus
                )}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3">时间</h3>
                {selectOption(timeOptions, advTime, setAdvTime)}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3">发起部门</h3>
                {selectOption(deptOptions, advDept, setAdvDept)}
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={applyAdvancedFilter}
                className="w-full py-3 bg-blue-600 text-white font-bold text-[16px] rounded-xl active:bg-blue-700"
              >
                确认筛选
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="shrink-0 bg-white border-t border-gray-100 flex justify-around items-center px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] z-[80] h-16">
        <button className="flex flex-col items-center text-gray-400 flex-1">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px]">首页</span>
        </button>
        <button className="flex flex-col items-center text-blue-500 flex-1">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] font-medium">工作中心</span>
        </button>
        <button className="flex flex-col items-center flex-1 -mt-6">
          <div className="bg-blue-600 rounded-full p-3 shadow-lg text-white mb-1 border-4 border-white">
            <Plus size={24} />
          </div>
          <span className="text-[10px] text-gray-500">发起</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 flex-1">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px]">我的</span>
        </button>
      </div>
    </div>
  );
};

export default ApprovalCenter;
