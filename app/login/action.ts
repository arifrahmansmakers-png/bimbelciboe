'use server';

export interface LoginState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string;
    password?: string;
  };
}

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-])[A-Za-z\d@$!%*?&.#_\-]{8,}$/;

export async function loginAction(
  _: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email')?.toString().trim() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  const errors: LoginState['errors'] = {};

  if (!email) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Format email tidak valid.';
  }

  if (!password) {
    errors.password = 'Password wajib diisi.';
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password =
      'Password minimal 8 karakter, terdiri dari huruf besar, huruf kecil, angka, dan karakter khusus.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
  };
}