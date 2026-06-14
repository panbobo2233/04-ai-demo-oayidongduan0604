
export enum Page {
  MESSAGE_LIST = 'MESSAGE_LIST',
  WORK_NOTICE = 'WORK_NOTICE',
  OFFICE_ASSISTANT = 'OFFICE_ASSISTANT',
  APPROVAL_DETAIL = 'APPROVAL_DETAIL',
  APPROVAL_CENTER = 'APPROVAL_CENTER',
  NOTIFICATION_SETTINGS = 'NOTIFICATION_SETTINGS',
  APP_CIRCLE = 'APP_CIRCLE',
  BATCH_APPROVAL = 'BATCH_APPROVAL',
  INITIATE_REQUEST = 'INITIATE_REQUEST'
}

export interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isPinned?: boolean;
  type?: 'system' | 'user' | 'group';
}

export interface ApprovalTask {
  id: string;
  title: string;
  applicant: string;
  type: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}
