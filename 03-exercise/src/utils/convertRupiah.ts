const convertRupiah = (rupiah: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(rupiah);
};

export default convertRupiah;
