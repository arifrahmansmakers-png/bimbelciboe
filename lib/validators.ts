import { PASSWORD_REGEX } from "./constants";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string) {
  return PASSWORD_REGEX.test(password);
}

export function isNotEmpty(value: string) {
  return value.trim().length > 0;
}