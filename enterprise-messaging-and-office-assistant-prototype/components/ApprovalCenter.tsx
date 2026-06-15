import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, Search, Plus, ListChecks, X } from 'lucide-react';

interface ApprovalCenterProps {
  initialSystem?: string;
  onBack: () => void;
  onDetail: (id: string) => void;
  onBatchApproval: (tab: string) => void;
  onInitiateRequest: () => void;
}

// 任务数据类型
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
  tabCategory?: '待处理' | '待阅' | '已处理' | '我发起';
  readStatus?: '待查阅' | '已查阅';
  extraInfo?: { label: string; value: string } | null;
}

const ApprovalCenter: React.FC<ApprovalCenterProps> = ({ initialSystem = '全部', onBack, onDetail, onBatchApproval, onInitiateRequest }) => {
  const [activeTab, setActiveTab] = useState('待处理');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [drawerCategory, setDrawerCategory] = useState('全部');
  const [drawerSubType, setDrawerSubType] = useState<string | null>(null);
  const [activeSubType, setActiveSubType] = useState<string | null>(null);
  const [readFilter, setReadFilter] = useState<'全部' | '待查阅' | '已查阅'>('待查阅');
  const [showReadPicker, setShowReadPicker] = useState(false);

  // 高级筛选项状态
  const [advType, setAdvType] = useState('全部');
  const [advTime, setAdvTime] = useState('全部');
  const [advDept, setAdvDept] = useState('全部');
  const [advUrgent, setAdvUrgent] = useState('全部');
  const [appliedAdvFilter, setAppliedAdvFilter] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 10);
    }
  }, []);

  useEffect(() => {
    if (initialSystem !== '全部') {
      setActiveFilter(initialSystem);
    }
  }, [initialSystem]);

  const tabs = ['待处理', '已处理', '我发起', '待阅'];

  // 系统分类树：一级为系统，二级为子系统下的类型
  const systemCategories: Record<string, string[]> = {
    '全部': [],
    'OA系统': ['收文', '发文', '签报', '请假', '报销', '用印', '出差', '用车申请', '利率定价', '合同审批', '授信审批'],
  };

  // 二级分类排序：收发签放前面
  const prioritySubTypes = ['收文', '发文', '签报'];
  const sortSubTypes = (subs: string[]): string[] => {
    const priority = subs.filter(s => prioritySubTypes.includes(s));
    const rest = subs.filter(s => !prioritySubTypes.includes(s));
    return [...priority, ...rest];
  };

  const mainCategories = Object.keys(systemCategories);

  // 所有任务卡片数据（排序：紧急 > 收文/发文/签报 > 请假/用车申请 > 其他）
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
      tabCategory: '待处理', extraInfo: null,
    },
    // ===== 待阅任务 =====
    {
      id: 'read_task_1',
      category: '公文', subType: '发文', isUrgent: false,
      status: '', statusColor: '',
      iconColor: 'text-blue-500',
      title: '关于印发2024年第一季度考核结果的通知',
      source: '来源：公文系统', department: '人力资源部', applicant: '陈芳',
      time: '06-10', aiSummary: '考核结果已发布，请查阅确认。',
      tabCategory: '待阅', readStatus: '待查阅', extraInfo: null,
    },
    {
      id: 'read_task_2',
      category: '公文', subType: '收文', isUrgent: true,
      status: '紧急', statusColor: 'text-red-500 bg-red-50',
      iconColor: 'text-red-500',
      title: '市金融局关于报送年度经营数据的紧急通知',
      source: '来源：公文系统', department: '合规部', applicant: '王磊',
      time: '06-13', aiSummary: '需在6月20日前完成数据报送。',
      tabCategory: '待阅', readStatus: '待查阅', extraInfo: null,
    },
    {
      id: 'read_task_3',
      category: '流程', subType: '用车申请', isUrgent: false,
      status: '', statusColor: '',
      iconColor: 'text-orange-500',
      title: '刘伟提交的因公外出用车申请',
      source: '来源：OA 办公', department: '运营管理部', applicant: '刘伟',
      time: '06-09', aiSummary: '用车已结束，请阅知。',
      tabCategory: '待阅', readStatus: '已查阅', extraInfo: null,
    },
    {
      id: 'read_task_4',
      category: '公文', subType: '签报', isUrgent: false,
      status: '', statusColor: '',
      iconColor: 'text-blue-500',
      title: '关于办公区域装修改造的签报请示',
      source: '来源：公文系统', department: '行政部', applicant: '杨洋',
      time: '06-08', aiSummary: '装修改造方案已审批通过。',
      tabCategory: '待阅', readStatus: '已查阅', extraInfo: null,
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
    // Tab 过滤：有 tabCategory 的任务只在匹配 tab 下显示
    if (task.tabCategory && task.tabCategory !== activeTab) return false;
    // 系统过滤
    if (activeFilter !== '全部') {
      const sysSubTypes = systemCategories[activeFilter];
      if (sysSubTypes && sysSubTypes.length > 0 && !sysSubTypes.includes(task.subType)) return false;
    }
    if (activeSubType && task.subType !== activeSubType) return false;
    // 待阅子筛选
    if (activeTab === '待阅' && readFilter !== '全部' && task.readStatus !== readFilter) return false;
    return true;
  });

  const applyAdvancedFilter = () => {
    setAppliedAdvFilter(true);
    setShowAdvancedFilter(false);
  };

  const resetAdvancedFilter = () => {
    setAdvType('全部');
    setAdvTime('全部');
    setAdvDept('全部');
    setAdvUrgent('全部');
    setAppliedAdvFilter(false);
    setShowAdvancedFilter(false);
  };

  const getSortOrder = (task: TaskItem): number => {
    if (task.isUrgent) return 0;
    if (task.subType === '收文' || task.subType === '发文' || task.subType === '签报') return 1;
    if (task.subType === '请假' || task.subType === '用车申请') return 2;
    return 3;
  };

  const displayTasks = filteredTasks
    .filter(task => {
      if (!appliedAdvFilter) return true;
      if (advType !== '全部' && task.category !== advType) return false;
      if (advUrgent === '是' && !task.isUrgent) return false;
      if (advUrgent === '否' && task.isUrgent) return false;
      return true;
    })
    .sort((a, b) => getSortOrder(a) - getSortOrder(b));

  const applyCategoryFilter = () => {
    setActiveFilter(drawerCategory);
    setActiveSubType(drawerSubType);
    setShowCategoryDrawer(false);
  };

  const resetCategoryFilter = () => {
    setDrawerCategory('全部');
    setDrawerSubType(null);
  };

  const getFilterLabel = () => {
    if (activeFilter === '全部' && !activeSubType) return '全部分类';
    if (activeSubType) return `${activeFilter} · ${activeSubType}`;
    return activeFilter;
  };

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
        <button className="p-2 text-gray-600">
          <Search size={22} />
        </button>
      </header>

      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto" ref={scrollRef} onScroll={handleScroll}>
        {/* 统计栏 */}
        <div className="bg-white rounded-2xl mx-4 mt-4 px-4 py-4 flex justify-between text-center shadow-sm border border-gray-100">
          <div className="flex-1">
            <div className="text-gray-500 text-sm mb-1">待处理</div>
            <div className="text-3xl font-bold text-blue-500">{allTasks.filter(t => !t.tabCategory || t.tabCategory === '待处理').length}</div>
          </div>
          <div className="w-px bg-gray-100 my-2"></div>
          <div className="flex-1">
            <div className="text-gray-500 text-sm mb-1">紧急</div>
            <div className="text-3xl font-bold text-orange-400">{allTasks.filter(t => t.isUrgent).length}</div>
          </div>
          <div className="w-px bg-gray-100 my-2"></div>
          <div className="flex-1">
            <div className="text-gray-500 text-sm mb-1">待阅</div>
            <div className="text-3xl font-bold text-red-500">{allTasks.filter(t => t.tabCategory === '待阅').length}</div>
          </div>
        </div>

        {/* AI 推荐 - 暂时隐藏 *
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
        */}

        {/* 标签页 + 筛选（sticky 块，滚动后变白） */}
        <div className={`sticky top-0 z-10 transition-colors duration-200 pb-2 ${isScrolled ? 'bg-white shadow-sm' : ''}`}>
          {/* 标签页切换 */}
          <div className="flex justify-around px-4 pt-2 border-b border-gray-100">
            {tabs.map(tab => {
              const count = tab === '待处理'
                ? allTasks.filter(t => !t.tabCategory || t.tabCategory === '待处理').length
                : tab === '待阅'
                ? allTasks.filter(t => t.tabCategory === '待阅').length
                : tab === '已处理'
                ? allTasks.filter(t => t.tabCategory === '已处理').length
                : allTasks.filter(t => t.tabCategory === '我发起').length;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setReadFilter('待查阅'); }}
                  className={`pb-2 text-[14px] transition-colors relative ${
                    activeTab === tab
                      ? 'text-blue-500 font-medium border-b-2 border-blue-500'
                      : 'text-gray-500'
                  }`}
                >
                  {tab}
                  {count > 0 && (
                    <span className={`absolute -top-0.5 -right-4 min-w-[16px] h-[16px] rounded-full text-[10px] font-bold flex items-center justify-center px-1 ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-white'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 分类筛选 */}
          <div className="flex items-center px-4 py-3">
            <div className="flex space-x-2 flex-1 min-w-0">
              <button
                onClick={() => {
                  setDrawerCategory(activeFilter);
                  setDrawerSubType(activeSubType);
                  setShowCategoryDrawer(true);
                }}
                className={`px-4 py-1.5 rounded-full text-sm shrink-0 flex items-center transition-colors ${
                  activeFilter !== '全部' || activeSubType
                    ? 'border border-blue-500 text-blue-500 bg-blue-50'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {getFilterLabel()}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeTab === '待阅' ? (
                <div className="relative shrink-0">
                  <button
                    onClick={() => setShowReadPicker(!showReadPicker)}
                    className={`px-4 py-1.5 rounded-full text-sm flex items-center transition-colors ${
                      readFilter !== '全部'
                        ? 'border border-blue-500 text-blue-500 bg-blue-50'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {readFilter === '待查阅' ? '仅查看待查阅' : readFilter}
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {showReadPicker && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-[100] min-w-[90px]">
                      {([
                        { label: '全部', value: '全部' },
                        { label: '仅查看待查阅', value: '待查阅' },
                        { label: '已阅', value: '已阅' },
                      ]).map(f => (
                        <button
                          key={f.value}
                          onClick={() => { setReadFilter(f.value as '全部' | '待查阅' | '已阅'); setShowReadPicker(false); }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                            readFilter === f.value
                              ? 'text-blue-500 bg-blue-50 font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAdvancedFilter(true)}
                  className={`px-4 py-1.5 rounded-full text-sm shrink-0 flex items-center transition-colors ${
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
              )}
              {/* 只看OA 快捷切换 */}
              <button
                onClick={() => {
                  if (activeFilter === 'OA系统') {
                    setActiveFilter('全部');
                    setActiveSubType(null);
                  } else {
                    setActiveFilter('OA系统');
                    setActiveSubType(null);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-sm shrink-0 flex items-center transition-colors ${
                  activeFilter === 'OA系统'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {activeFilter === 'OA系统' && (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                只看OA
              </button>
            </div>
            <button
              onClick={() => onBatchApproval(activeTab)}
              className="p-1.5 rounded-full bg-blue-500 text-white shrink-0 flex items-center justify-center ml-3"
              title="批量处理"
            >
              <ListChecks size={18} />
            </button>
          </div>
        </div>

        <div className="h-4" />
        {/* 任务卡片列表 */}
        <div className="px-4 pb-24 space-y-3">
          {displayTasks.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-12">暂无匹配的任务</div>
          ) : (
            displayTasks.map(task => (
              <div key={task.id} className="bg-white rounded-xl px-3 py-2.5 shadow-sm border border-gray-100">
                <div className="flex items-start">
                  {/* 缩小后的图标 - 与文字行高等同 */}
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
                      <div className="flex items-center gap-1 shrink-0 ml-1">
                        {task.readStatus === '已查阅' && (
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-1 py-0 rounded">已阅</span>
                        )}
                        {task.readStatus === '待查阅' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        )}
                        <span className="text-[11px] text-gray-400">{task.time}</span>
                      </div>
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

                    {/* 处理按钮 */}
                    <div className="flex justify-end mt-1">
                      <button
                        onClick={() => onDetail(task.id)}
                        className="text-blue-500 text-xs font-medium"
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

      {/* 分类抽屉 */}
      {showCategoryDrawer && (
        <div className="absolute inset-0 z-[200] bg-black/40 flex flex-col justify-end" onClick={() => setShowCategoryDrawer(false)}>
          <div className="bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-250 h-[55vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* 抽屉头部 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <button onClick={resetCategoryFilter} className="text-gray-500 text-[15px]">重置</button>
              <h2 className="text-[17px] font-bold text-[#1A1A1A]">全部分类</h2>
              <button onClick={() => setShowCategoryDrawer(false)} className="text-gray-400">
                <X size={24} />
              </button>
            </div>

            {/* 左右双栏分类选择（flex-1 min-h-0 确保不撑破容器） */}
            <div className="flex flex-1 min-h-0">
              {/* 左栏：一级分类（系统），独立滚动 */}
              <div className="w-[35%] border-r border-gray-100 overflow-y-auto">
                <div className="text-[12px] text-gray-400 px-4 py-2">系统</div>
                {mainCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setDrawerCategory(cat);
                      setDrawerSubType(null);
                    }}
                    className={`w-full text-left px-4 py-3 text-[14px] transition-colors flex items-center justify-between ${
                      drawerCategory === cat
                        ? 'text-blue-600 font-medium bg-blue-50'
                        : 'text-gray-700'
                    }`}
                  >
                    <span>{cat}</span>
                    {drawerCategory === cat && (
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* 右栏：二级子分类（列表式），独立滚动 */}
              <div className="w-[65%] overflow-y-auto">
                {drawerCategory === '全部' ? (
                  <div className="flex items-center justify-center h-full text-sm text-gray-400">
                    显示全部任务
                  </div>
                ) : systemCategories[drawerCategory]?.length > 0 ? (
                  <div>
                    <div className="text-[12px] text-gray-400 px-4 py-2 sticky top-0 bg-white">{drawerCategory} - 类型</div>
                    <div className="space-y-0.5 px-1">
                      <button
                        onClick={() => setDrawerSubType(null)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] flex items-center justify-between transition-colors ${
                          !drawerSubType
                            ? 'text-blue-600 font-medium bg-blue-50'
                            : 'text-gray-700'
                        }`}
                      >
                        <span>全部</span>
                        {!drawerSubType && (
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      {sortSubTypes(systemCategories[drawerCategory]).map(sub => (
                        <button
                          key={sub}
                          onClick={() => setDrawerSubType(drawerSubType === sub ? null : sub)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] flex items-center justify-between transition-colors ${
                            drawerSubType === sub
                              ? 'text-blue-600 font-medium bg-blue-50'
                              : 'text-gray-700'
                          }`}
                        >
                          <span>{sub}</span>
                          {drawerSubType === sub && (
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-gray-400">
                    暂无子分类
                  </div>
                )}
              </div>
            </div>

            {/* 当前选中预览 */}
            <div className="bg-gray-50 rounded-xl mx-5 px-4 py-3 flex items-center justify-between my-3 shrink-0">
              <span className="text-sm text-gray-500">当前选择</span>
              <span className="text-sm font-medium text-blue-600">
                {drawerSubType ? `${drawerCategory} · ${drawerSubType}` : drawerCategory}
              </span>
            </div>

            {/* 确认按钮 */}
            <div className="px-5 py-4 border-t border-gray-100 shrink-0">
              <button
                onClick={applyCategoryFilter}
                className="w-full py-3 bg-blue-600 text-white font-bold text-[16px] rounded-xl active:bg-blue-700"
              >
                确认分类
              </button>
            </div>
          </div>
        </div>
      )}

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
                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3">是否紧急</h3>
                {selectOption(
                  [{ label: '全部', value: '全部' }, { label: '是', value: '是' }, { label: '否', value: '否' }],
                  advUrgent, setAdvUrgent
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
      <div className="shrink-0 bg-white border-t border-gray-100 flex justify-around items-center px-6 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] z-[80] h-16">
        <button onClick={onInitiateRequest} className="flex flex-col items-center text-gray-400 flex-1">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[10px]">发起申请</span>
        </button>
        <button className="flex flex-col items-center text-blue-500 flex-1">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] font-medium">工作中心</span>
        </button>
      </div>
    </div>
  );
};

export default ApprovalCenter;
