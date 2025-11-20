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
    jenis_kelamin: 'P' | 'L';
    usia: number;
    poliklinik_id: number;
    keluhan_sakit: string;
};
export type Hari =
    | 'Senin'
    | 'Selasa'
    | 'Rabu'
    | 'Kamis'
    | 'Jumat'
    | 'Sabtu'
    | 'Minggu';

export type JadwalPraktik = Record<Hari, string[]>;

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
