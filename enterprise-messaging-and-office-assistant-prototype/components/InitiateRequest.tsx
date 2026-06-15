import React, { useState, useMemo } from 'react';
import { ChevronLeft, Search, X, FileDown, FileUp, FileCheck, Mail, Umbrella, Car, Plane, Globe, Database, MonitorCog } from 'lucide-react';

interface InitiateRequestProps {
  onBack: () => void;
}

interface EntryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  shadow: string;
}

const iconMap: Record<string, { icon: React.ReactNode; gradient: string; shadow: string }> = {
  '收文':           { icon: <FileDown size={22} />,    gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',   shadow: 'shadow-[0_4px_12px_rgba(59,130,246,0.4)]' },
  '发文':           { icon: <FileUp size={22} />,      gradient: 'bg-gradient-to-br from-indigo-400 to-indigo-600', shadow: 'shadow-[0_4px_12px_rgba(99,102,241,0.4)]' },
  '签报':           { icon: <FileCheck size={22} />,   gradient: 'bg-gradient-to-br from-red-400 to-red-600',    shadow: 'shadow-[0_4px_12px_rgba(248,113,113,0.4)]' },
  '联系函':         { icon: <Mail size={22} />,        gradient: 'bg-gradient-to-br from-teal-400 to-teal-600',   shadow: 'shadow-[0_4px_12px_rgba(45,212,191,0.4)]' },
  '国内休假':       { icon: <Umbrella size={22} />,    gradient: 'bg-gradient-to-br from-green-400 to-green-600',  shadow: 'shadow-[0_4px_12px_rgba(74,222,128,0.4)]' },
  '用车申请':       { icon: <Car size={22} />,         gradient: 'bg-gradient-to-br from-amber-400 to-amber-600',  shadow: 'shadow-[0_4px_12px_rgba(251,191,36,0.4)]' },
  '出差申请':       { icon: <Plane size={22} />,       gradient: 'bg-gradient-to-br from-sky-400 to-sky-600',    shadow: 'shadow-[0_4px_12px_rgba(56,189,248,0.4)]' },
  '出国境申请':     { icon: <Globe size={22} />,       gradient: 'bg-gradient-to-br from-purple-400 to-purple-600', shadow: 'shadow-[0_4px_12px_rgba(168,85,247,0.4)]' },
  '数据查询修改申请': { icon: <Database size={22} />,   gradient: 'bg-gradient-to-br from-cyan-400 to-cyan-600',   shadow: 'shadow-[0_4px_12px_rgba(34,211,238,0.4)]' },
  '系统需求申请':   { icon: <MonitorCog size={22} />,  gradient: 'bg-gradient-to-br from-rose-400 to-rose-600',   shadow: 'shadow-[0_4px_12px_rgba(251,113,133,0.4)]' },
};

const sections: { title: string; items: string[] }[] = [
  {
    title: '我常用的',
    items: ['发文', '签报', '用车申请', '国内休假'],
  },
  {
    title: '公文办理',
    items: ['收文', '发文', '签报', '联系函'],
  },
  {
    title: '人事出行',
    items: ['国内休假', '用车申请', '出差申请', '出国境申请'],
  },
  {
    title: '技术支撑',
    items: ['数据查询修改申请', '系统需求申请'],
  },
];

const makeEntry = (label: string): EntryItem => {
  const meta = iconMap[label];
  return {
    id: label,
    label,
    icon: meta.icon,
    gradient: meta.gradient,
    shadow: meta.shadow,
  };
};

const InitiateRequest: React.FC<InitiateRequestProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const handleEntryClick = (label: string) => {
    alert(`即将打开：${label}`);
  };

  // 搜索过滤
  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const kw = search.trim().toLowerCase();
    return sections
      .map(s => ({
        ...s,
        items: s.items.filter(item => item.toLowerCase().includes(kw)),
      }))
      .filter(s => s.items.length > 0);
  }, [search]);

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7]">
      {/* Header */}
      <header className="h-12 bg-white flex items-center justify-between px-2 border-b border-gray-100 z-[70] shrink-0">
        <button onClick={onBack} className="p-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-[#1A1A1A]">发起申请</h1>
        <div className="w-10" />
      </header>

      {/* 搜索框 */}
      <div className="bg-white px-4 pb-3 shrink-0">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索申请类型..."
            className="w-full h-9 pl-9 pr-8 bg-gray-100 rounded-lg text-[14px] outline-none focus:bg-gray-50 focus:ring-1 focus:ring-blue-300"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto">
        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={32} className="mb-3 opacity-30" />
            <span className="text-sm">未找到「{search}」相关申请</span>
          </div>
        ) : (
          filteredSections.map((section, si) => (
            <div key={section.title}>
              {/* 标题 */}
              <div className="px-4 pt-4 pb-2 flex items-center">
                <h2 className="text-[14px] font-bold text-[#1A1A1A]">{section.title}</h2>
              </div>

              {/* 入口网格 4列 */}
              <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-4 pb-4">
                {section.items.map(label => {
                  const entry = makeEntry(label);
                  return (
                    <button
                      key={`${section.title}-${entry.id}`}
                      onClick={() => handleEntryClick(entry.label)}
                      className="flex flex-col items-center py-1 active:opacity-70 transition-opacity"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${entry.gradient} ${entry.shadow} flex items-center justify-center mb-2 text-white`}>
                        {entry.icon}
                      </div>
                      <span className="text-[11px] text-gray-700 text-center leading-tight">
                        {entry.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 分隔线（非最后一项） */}
              {si < filteredSections.length - 1 && (
                <div className="mx-4 border-b border-gray-100" />
              )}
            </div>
          ))
        )}

        {!search && (
          <div className="text-center text-gray-400 text-xs py-6">
            更多申请类型即将接入...
          </div>
        )}
      </div>

      {/* 底部栏 */}
      <div className="shrink-0 bg-white border-t border-gray-100 flex justify-around items-center px-6 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] z-[80] h-16">
        <button className="flex flex-col items-center text-blue-500 flex-1">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[10px] font-medium">发起申请</span>
        </button>
        <button onClick={onBack} className="flex flex-col items-center text-gray-400 flex-1">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px]">工作中心</span>
        </button>
      </div>
    </div>
  );
};

export default InitiateRequest;
