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
    id: number;
    nama: string;
    kode: string;
    is_open: boolean;
};

export type PatientRegisterRequired = {
    no_nik: string;
    nama_pasien: string;
    alamat: string;
    no_telp: string;
    jenis_kelamin: string;
    usia: number;
    poliklinik_id: number;
    keluhan_sakit: string;
};
export type Hari =
    | 'senin'
    | 'selasa'
    | 'rabu'
    | 'kamis'
    | 'jumat'
    | 'sabtu'
    | 'minggu';

export type JadwalPraktik = {
    senin: string;
    selasa: string;
    rabu: string;
    kamis: string;
    jumat: string;
    sabtu: string;
    minggu: string;
};

export type PoliklinikMonitor = {
    id: number;
    nama: string;
    is_open: boolean;
    nama_doktor: string;
    nomor_hp_doktor: string;
    doctor_id: number;
    spesialisasi: string;
    total_antrian: number;
    JadwalPraktik: JadwalPraktik;
    status: 'BUKA' | 'PENUH' | 'TUTUP';
};

export interface PaginateData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

type Dokter = {
    id: number;
    name: string;
    poliklinik_id;
    nama_poliklinik: string;
    no_sip: string;
    jadwal_praktik: JadwalPraktik;
    spesialisasi: string;
};
