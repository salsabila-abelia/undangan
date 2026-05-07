"use client";

import React from "react";
import { motion } from "framer-motion";
import { QrCode, ArrowLeft, Download } from "lucide-react"; // <-- Tambah icon Download
import { useRouter } from "next/navigation";

export default function KonfirmasiKehadiran() {
  // Nama otomatis yang menempel pada tiket tamu
  const studentName = "Salsabila Abelia Yocelyn";
  const studentClass = "Kelas XII - Angkatan 32";
  const router = useRouter();

  // FUNGSI UNTUK DOWNLOAD GAMBAR QR CODE
  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = "/qr-code.png"; // Pastikan nama file ini sesuai dengan yang ada di folder public kamu
    link.download = "Tiket_Akses_Angkatan_32.png"; // Nama file saat di-download tamu
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#2D0A0A] font-serif text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ornamen yang elegan */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,#7A1A1A_0%,transparent_35%),radial-gradient(circle_at_bottom,#C5A059_0%,transparent_25%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-white/5 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center text-center"
      >
        <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-8 opacity-60" />

        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-2 text-[#C5A059]">
          Tiket Akses Masuk
        </h1>
        
        <p className="text-sm font-light opacity-80 mb-8 max-w-xs mx-auto">
          Simpan dan tunjukkan kode QR ini pada panitia saat registrasi di lokasi acara.
        </p>

        {/* Kotak Nama Siswa Otomatis */}
        <div className="w-full bg-black/30 rounded-2xl p-4 sm:p-5 mb-6 border border-[#C5A059]/20 shadow-inner">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-2 font-sans font-bold">
            Berlaku untuk:
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {studentName}
          </h3>
          <p className="text-sm text-[#C5A059] mt-1 italic">
            {studentClass}
          </p>
        </div>

        {/* Kotak QR Code */}
        <div className="bg-gradient-to-br from-[#C5A059]/30 to-white/10 p-1 rounded-3xl shadow-[0_16px_40px_rgba(197,160,89,0.15)] mb-8 w-full max-w-[280px]">
          <div className="bg-white p-5 rounded-[calc(1.5rem-4px)] flex items-center justify-center relative w-full aspect-square">
            <QrCode className="absolute text-[#2D0A0A]/5 w-3/4 h-3/4" />
            <img 
              src="/qr-code.png" 
              alt="QR Code Akses" 
              className="w-full h-full object-cover rounded-xl relative z-10"
            />
          </div>
        </div>

        {/* Deretan Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* Tombol Download */}
          <motion.button
            onClick={handleDownloadQR}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#C5A059] text-[#2D0A0A] rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(197,160,89,0.2)]"
          >
            <Download size={14} />
            Simpan Tiket
          </motion.button>

          {/* Tombol Kembali (Tutup Tab) */}
          <motion.button
            onClick={() => window.close()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#C5A059] text-[#C5A059] rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:bg-[#C5A059] hover:text-[#2D0A0A]"
          >
            <ArrowLeft size={14} />
            Kembali
          </motion.button>
        </div>
        
      </motion.div>
    </main>
  );
}