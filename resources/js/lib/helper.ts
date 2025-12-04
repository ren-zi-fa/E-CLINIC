export const parseJadwal = (jadwalStr: string) => {
    if (jadwalStr === '-') {
        return { aktif: false, jamMulai: '08:00', jamSelesai: '17:00' };
    }
    const times = jadwalStr.split(', ').map((s) => s.trim());
    const [jamMulai, jamSelesai1] = times[0].split(' - ');
    const jamSelesai = times[1]?.split(' - ')[1] || jamSelesai1;
    return { aktif: true, jamMulai, jamSelesai };
};
