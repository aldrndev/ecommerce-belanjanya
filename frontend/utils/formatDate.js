export function formatDate(date) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatDateCancel(date) {
  const option = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("id-ID", option).replace(",", "");
}

export function formatDateOrder(date) {
  const option = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("id-ID", option);
}
