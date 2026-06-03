export type Role = 'RESIDENT' | 'EMPLOYEE' | 'DEPT_ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export const ROLE_REDIRECT: Record<Role, string> = {
  RESIDENT: '/dashboard/resident',
  EMPLOYEE: '/dashboard/employee',
  DEPT_ADMIN: '/dashboard/dept-admin',
  SUPER_ADMIN: '/dashboard/super-admin',
};

export const ROLE_LABELS: Record<Role, string> = {
  RESIDENT: 'Resident',
  EMPLOYEE: 'Employee',
  DEPT_ADMIN: 'Department Admin',
  SUPER_ADMIN: 'Super Admin',
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  RESIDENT: 'Access city services, pay bills, submit requests & track issues.',
  EMPLOYEE: 'Manage tasks, field work orders, and service requests.',
  DEPT_ADMIN: 'Oversee department operations, staff, and service metrics.',
  SUPER_ADMIN: 'Full platform control — users, departments, and city-wide settings.',
};

export const ROLE_ICONS: Record<Role, string> = {
  RESIDENT: 'ti-home-2',
  EMPLOYEE: 'ti-briefcase',
  DEPT_ADMIN: 'ti-building',
  SUPER_ADMIN: 'ti-settings-2',
};

export const ROLE_PORTAL_LABELS: Record<Role, string> = {
  RESIDENT: 'Citizen Portal',
  EMPLOYEE: 'Staff Portal',
  DEPT_ADMIN: 'Department Portal',
  SUPER_ADMIN: 'Admin Console',
};
