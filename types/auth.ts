export type UserRole =
  | "member"
  | "admin"
  | "partner";

export type AffiliateStatus =
  | "INACTIVE"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

export type PartnerStatus =
  | "INACTIVE"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

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

  /**
   * Status membership
   */
  membershipStatus?: string | null;

  /**
   * Tanggal membership berakhir
   */
  membershipExpiredAt?: string | null;

  /**
   * Apakah membership masih aktif
   */
  membershipActive?: boolean;

  /**
   * Status affiliate
   *
   * INACTIVE  = belum mendaftar
   * PENDING   = menunggu konfirmasi admin
   * ACTIVE    = sudah disetujui
   * REJECTED  = ditolak admin
   */
  affiliateStatus?: AffiliateStatus;

  /**
   * Apakah user dapat mengakses fitur affiliate
   */
  canAccessAffiliate?: boolean;

  /**
   * Status partner
   *
   * INACTIVE  = bukan partner
   * PENDING   = menunggu konfirmasi
   * ACTIVE    = partner aktif
   * REJECTED  = ditolak
   */
  partnerStatus?: PartnerStatus;

  /**
   * Apakah user dapat mengakses dashboard partner
   */
  canAccessPartner?: boolean;
}