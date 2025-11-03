export type AntrianItem = {
    id: number;
    nomor_antrian: string;
    status: 'menunggu' | 'proses' | 'selesai';
    tanggal: string;
    created_at: string;
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
export type AntrianResponse = {
    current_page: number;
    data: AntrianItem[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};
