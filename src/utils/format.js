export const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value) || 0);

export const formatDateTime = (isoDate) => {
  if (!isoDate) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
};

export const formatDate = (isoDate) => {
  if (!isoDate) return '-';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(isoDate));
};

export const formatDateKey = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(date);
};
