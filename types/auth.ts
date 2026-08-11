export type UserRole =
  | "member"
  | "admin"
  | "affiliate";

export interface CurrentUser {
  uid: string;

  email: string;

  name: string;

  role: UserRole;

  /**
   * SD | SMP | SMA
   */
  educationLevelId?: string | null;

  /**
   * Paket yang sedang aktif
   */
  packageId?: string | null;

  /**
   * Tanggal berakhir paket
   */
  packageExpiredAt?: string | null;

  /**
   * Foto profil
   */
  photoURL?: string | null;

  /**
   * Status akun
   */
  isActive?: boolean;
}