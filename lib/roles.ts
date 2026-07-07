export const ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  AFFILIATE: "affiliate",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];