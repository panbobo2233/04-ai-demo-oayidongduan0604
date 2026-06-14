
import React, { useState } from 'react';
import MessageList from './components/MessageList';
import WorkNoticeDetail from './components/WorkNoticeDetail';
import OfficeAssistantDetail from './components/OfficeAssistantDetail';
import ApprovalDetailPage from './components/ApprovalDetailPage';
import ApprovalCenter from './components/ApprovalCenter';
import BatchApproval from './components/BatchApproval';
import InitiateRequest from './components/InitiateRequest';
import NotificationSettings from './components/NotificationSettings';
import AppCircle from './components/AppCircle';
import BottomNav from './components/BottomNav';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.MESSAGE_LIST);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [initialSystemFilter, setInitialSystemFilter] = useState<string>('全部');
  const [batchMode, setBatchMode] = useState<'approval' | 'read'>('approval');

  const navigateTo = (page: Page, taskId?: string) => {
    setCurrentPage(page);
    if (taskId) setSelectedTaskId(taskId);
  };

  const handleToApprovalCenter = (systemName: string = '全部') => {
    setInitialSystemFilter(systemName);
    setCurrentPage(Page.APPROVAL_CENTER);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.MESSAGE_LIST:
        return <MessageList onNavigate={navigateTo} />;
      case Page.WORK_NOTICE:
        return (
          <WorkNoticeDetail 
            onBack={() => setCurrentPage(Page.MESSAGE_LIST)} 
            onDetail={taskId => navigateTo(Page.APPROVAL_DETAIL, taskId)} 
          />
        );
      case Page.OFFICE_ASSISTANT:
        return (
          <OfficeAssistantDetail 
            onBack={() => setCurrentPage(Page.MESSAGE_LIST)} 
            onToSettings={() => setCurrentPage(Page.NOTIFICATION_SETTINGS)}
            onToApprovalCenter={handleToApprovalCenter}
          />
        );
      case Page.NOTIFICATION_SETTINGS:
        return <NotificationSettings onBack={() => setCurrentPage(Page.OFFICE_ASSISTANT)} />;
      case Page.APPROVAL_CENTER:
        return (
          <ApprovalCenter
            initialSystem={initialSystemFilter}
            onBack={() => setCurrentPage(Page.MESSAGE_LIST)}
            onDetail={taskId => navigateTo(Page.APPROVAL_DETAIL, taskId)}
            onBatchApproval={(tab) => {
              setBatchMode(tab === '待阅' ? 'read' : 'approval');
              setCurrentPage(Page.BATCH_APPROVAL);
            }}
            onInitiateRequest={() => setCurrentPage(Page.INITIATE_REQUEST)}
          />
        );
      case Page.BATCH_APPROVAL:
        return (
          <BatchApproval
            onBack={() => setCurrentPage(Page.APPROVAL_CENTER)}
            mode={batchMode}
          />
        );
      case Page.INITIATE_REQUEST:
        return (
          <InitiateRequest
            onBack={() => setCurrentPage(Page.APPROVAL_CENTER)}
          />
        );
      case Page.APPROVAL_DETAIL:
        return <ApprovalDetailPage taskId={selectedTaskId} onBack={() => setCurrentPage(Page.WORK_NOTICE)} />;
      case Page.APP_CIRCLE:
        return <AppCircle onToApprovalCenter={handleToApprovalCenter} />;
      default:
        return <MessageList onNavigate={navigateTo} />;
    }
  };

  // Only show global bottom nav on the Message List and App Circle pages
  const showGlobalBottomNav = currentPage === Page.MESSAGE_LIST || currentPage === Page.APP_CIRCLE;

  const getActiveTab = () => {
    if (currentPage === Page.APP_CIRCLE) return '应用圈';
    return '交流圈';
  };

  const handleBottomNav = (tab: string) => {
    if (tab === '应用圈') {
      setCurrentPage(Page.APP_CIRCLE);
    } else if (tab === '交流圈') {
      setCurrentPage(Page.MESSAGE_LIST);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 watermark z-[100] pointer-events-none"></div>

      <main className={`flex-1 overflow-y-auto ${showGlobalBottomNav ? 'pb-16' : ''}`}>
        {renderPage()}
      </main>

      {showGlobalBottomNav && <BottomNav activeTab={getActiveTab()} onNavigate={handleBottomNav} />}
    </div>
  );
};

export default App;
