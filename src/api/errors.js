export class ApiError extends Error {
  constructor({ code, message, details, status }) {
    super(message || 'Terjadi kesalahan');
    this.name = 'ApiError';
    this.code = code || 'UNKNOWN';
    this.details = details || null;
    this.status = status || 0;
  }
}

export const normalizeApiError = (error) => {
  if (error instanceof ApiError) return error;

  const payload = error?.response?.data?.error;
  if (payload) {
    return new ApiError({
      code: payload.code,
      message: payload.message,
      details: payload.details,
      status: error.response.status,
    });
  }

  if (error?.code === 'ECONNABORTED') {
    return new ApiError({ code: 'TIMEOUT', message: 'Koneksi terlalu lama. Coba lagi.' });
  }

  if (!error?.response) {
    return new ApiError({
      code: 'NETWORK',
      message: 'Tidak dapat terhubung ke server. Periksa koneksi Anda.',
    });
  }

  return new ApiError({
    code: 'UNKNOWN',
    message: 'Terjadi kesalahan pada server.',
    status: error.response.status,
  });
};
