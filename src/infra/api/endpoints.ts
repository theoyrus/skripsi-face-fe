class EndPoints {
  static readonly BASEURL = import.meta.env.VITE_API_URL

  // Auth
  static readonly LOGIN = "/auth/login"
  static readonly JWT_REFRESH = "/auth/jwt/refresh"
  static readonly JWT_VERIFY = "/auth/jwt/verify"
  static readonly USER = "/auth/user"
  static readonly USER_ME = "/auth/users/me/"
  static readonly USER_CHANGE_EMAIL = "/auth/users/set_email/"
  static readonly USER_CHANGE_PASS = "/auth/users/set_password/"

  // Karyawan
  static readonly KARYAWAN = "/karyawan"
  static readonly KARYAWAN_ME = "/karyawan/me"
  static readonly DIVISI = "/divisi"

  // Face Recognition
  static readonly CITRAWAJAH = "/facerecog/citrawajah"
  static readonly TRAINING = "/facerecog/training"
  static readonly RECOGNIZE = "/facerecog/recognize"

  // Presensi
  static readonly PRESENSI = "/presensi"
  static readonly KEHADIRAN = "/presensi/kehadiran"
}

export default EndPoints
