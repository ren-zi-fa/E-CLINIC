export type AntrianItem = {
    id: number;
    nomor_antrian: string;
    status: 'menunggu' | 'proses' | 'selesai';
    tanggal: string;
    waktu_daftar: string;
    nama_pasien: string;
    nama_poliklinik: string;
    no_rm: string;
};
export type PaginationLink = {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
};

export type InitParam = {
    search: string;
    limit: number;
    col: string;
    sort: string;
};


export type Poliklinik = {
    id:number,
    nama:string,
    kode:string,
    isOpen:boolean
}
