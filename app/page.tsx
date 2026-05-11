"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  Variants,
} from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Shirt,
  ListOrdered,
  MessageSquare,
  Send,
  ExternalLink,
  Grid,
  Layout,
  Volume2,
  VolumeX,
  Video,
  Play,
  Filter,
} from "lucide-react";

function SmoothDivider({
  from,
  to,
  accent = "#C5A059",
}: {
  from: string;
  to: string;
  accent?: string;
}) {
  return (
    <div
      className="relative h-20 sm:h-28 w-full overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C240,120 480,40 720,90 C960,140 1200,50 1440,100 L1440,0 L0,0 Z"
          fill={from}
        />
        <path
          d="M0,70 C260,130 520,60 760,100 C1040,150 1240,90 1440,120 L1440,160 L0,160 Z"
          fill={to}
        />
        <path
          d="M0,88 C300,135 520,78 760,108 C1020,140 1240,102 1440,122"
          fill="none"
          stroke={accent}
          strokeOpacity="0.22"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function FlipNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ rotateX: -90, opacity: 0, y: 8 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        exit={{ rotateX: 90, opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="block origin-center"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function ReimaginedGraduation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // STATE ALUR ANIMASI (Amplop -> Cinematic -> Web)
  const [introState, setIntroState] = useState<
    "envelope" | "cinematic" | "done"
  >("envelope");
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // STATE BARU UNTUK FILTER GALERI
  const [activeFilter, setActiveFilter] = useState("Semua");
  const filterCategories = ["Semua", "Momen Moklet", "Prakerin", "Project TKJ"];

  const galleryImages = [
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
    { src: "/images/hero.jpeg", category: "Momen Moklet" },
  ];

  const filteredGallery =
    activeFilter === "Semua"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");

  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Bapak & Ibu Guru",
      text: "Selamat dan sukses selalu untuk Salsabila! Semoga ilmu yang didapat berkah dan bermanfaat untuk masa depan.",
      time: "2 jam yang lalu",
    },
    {
      name: "Teman Sebangku",
      text: "Happy graduation Sal!! Jangan lupain kenangan kita selama di Moklet ya, sukses terus!",
      time: "5 jam yang lalu",
    },
  ]);

  const quoteText =
    "Bukan sekadar tentang selembar ijazah. Ini adalah bukti perjuangan, tawa, dan air mata yang kita ukir bersama di SMK Telkom Malang. Terbanglah tinggi, karena dunia menanti karya nyata kita.";
  const quoteWords = quoteText.split(" ");

  const quoteVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  useEffect(() => {
    // CEK SESSION STORAGE: Jika sebelumnya sudah buka amplop, langsung skip ke halaman utama
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("introPlayed") === "true"
    ) {
      setIntroState("done");
      setIsFlapOpen(true);
    }

    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");
    if (toParam) {
      setGuestName(toParam);
    }

    const targetDate = new Date("June 11, 2026 07:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
      } else {
        setTimeLeft({
          hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
          jam: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- EFEK BARU: PAUSE/PLAY AUDIO SAAT KELUAR TAB/BROWSER ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Jika tab di-minimize atau pindah ke tab lain, lagu dipause
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        // Jika kembali ke tab undangan, lagu dilanjut (hanya jika sblmnya lg play)
        if (isPlaying && audioRef.current) {
          audioRef.current.play().catch((err) => console.log(err));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);
  // -------------------------------------------------------------

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return;
    setIsFlapOpen(true);

    // SIMPAN STATE: Kasih tau browser kalau amplop udah pernah dibuka
    if (typeof window !== "undefined") {
      sessionStorage.setItem("introPlayed", "true");
    }

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => console.log("Audio play error:", error));
    }

    setTimeout(() => {
      setIntroState("cinematic");
      setTimeout(() => {
        setIntroState("done");
      }, 2800);
    }, 1200);
  };

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const addToCalendar = () => {
    const event = {
      text: "Wisuda Angkatan 32 SMK Telkom Malang",
      dates: "20260611T070000Z/20260611T120000Z",
      location: "Graha Cakrawala Universitas Negeri Malang",
    };

    window.open(
      `https://www.google.com/calendar/render?action=TEMPLATE&text=${event.text}&dates=${event.dates}&location=${event.location}`,
      "_blank",
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newMessage.trim()) {
      setMessages([
        {
          name: newName,
          text: newMessage,
          time: "Baru saja",
        },
        ...messages,
      ]);
      setNewName("");
      setNewMessage("");

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    }
  };

  if (!isMounted) return <div className="min-h-screen w-full bg-[#2D0A0A]" />;

  return (
    <main
      ref={containerRef}
      className="relative bg-[#FCFAFA] font-serif text-[#1A1A1A] w-full max-w-[100vw] overflow-x-hidden"
    >
      <AnimatePresence>
        {introState !== "done" && (
          <motion.div
            key="master-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-[#1a0505] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Ornamen Kiri Atas */}
            <motion.img
              src="/flower.png"
              className="absolute -top-20 -left-20 w-72 sm:w-[400px] opacity-15 -rotate-45 mix-blend-screen pointer-events-none"
              alt=""
            />
            {/* Background Ornamen Kanan Bawah */}
            <motion.img
              src="/flower.png"
              className="absolute -bottom-20 -right-20 w-72 sm:w-[400px] opacity-15 rotate-[135deg] mix-blend-screen pointer-events-none"
              alt=""
            />

            <AnimatePresence>
              {introState === "envelope" && (
                <motion.div
                  key="envelope-container"
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: "easeIn" }}
                  className="relative flex flex-col items-center justify-center cursor-pointer z-10"
                  onClick={handleOpenEnvelope}
                >
                  <div className="text-[#C5A059] font-serif italic mb-10 text-2xl sm:text-3xl tracking-widest text-center opacity-90 drop-shadow-lg">
                    You're Invited
                  </div>

                  {/* KONTEN AMPLOP */}
                  <div className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[260px] drop-shadow-2xl transition-transform duration-300 hover:scale-105">
                    {/* --- HIASAN BUNGA 1 (KIRI BAWAH) --- */}
                    <img
                      src="/bunga2.png"
                      alt="Bunga Kiri Bawah"
                      className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 w-24 sm:w-32 z-40 pointer-events-none drop-shadow-lg object-contain"
                    />

                    {/* --- HIASAN BUNGA 2 (KANAN ATAS) --- */}
                    <img
                      src="/bunga22.png"
                      alt="Bunga Kanan Atas"
                      className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 w-24 sm:w-32 z-40 pointer-events-none drop-shadow-lg object-contain"
                    />

                    <div className="absolute inset-0 bg-[#E0DDD8] rounded-md shadow-inner" />
                    <div className="absolute bottom-0 w-0 h-0 border-l-[150px] sm:border-l-[200px] border-r-[150px] sm:border-r-[200px] border-b-[120px] sm:border-b-[160px] border-l-transparent border-r-transparent border-b-[#E8E5E1] z-10 drop-shadow-sm" />
                    <div className="absolute top-0 left-0 w-0 h-0 border-y-[100px] sm:border-y-[130px] border-l-[150px] sm:border-l-[200px] border-y-transparent border-l-[#F3F1EF] z-10 drop-shadow-md" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-y-[100px] sm:border-y-[130px] border-r-[150px] sm:border-r-[200px] border-y-transparent border-r-[#F3F1EF] z-10 drop-shadow-md" />

                    <motion.div
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: isFlapOpen ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      style={{ transformOrigin: "top" }}
                      className="absolute top-0 left-0 w-0 h-0 border-l-[150px] sm:border-l-[200px] border-r-[150px] sm:border-r-[200px] border-t-[120px] sm:border-t-[150px] border-l-transparent border-r-transparent border-t-[#DCD8D3] z-20 drop-shadow-lg"
                    />

                    <motion.div
                      animate={{
                        opacity: isFlapOpen ? 0 : 1,
                        scale: isFlapOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-[110px] sm:top-[140px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-[#581010] rounded-full z-30 shadow-[0_4px_15px_rgba(0,0,0,0.4)] border-[3px] border-[#430c0c] flex items-center justify-center"
                    >
                      <span className="text-[#C5A059] font-serif italic font-bold text-lg">
                        32
                      </span>
                    </motion.div>
                  </div>

                  <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-14 text-[#C5A059] text-xs sm:text-sm uppercase tracking-[0.4em] font-sans font-bold"
                  >
                    Click to Open
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {introState === "cinematic" && (
                <motion.div
                  key="cinematic-text"
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute flex flex-col items-center z-20"
                >
                  <h1
                    className="text-5xl sm:text-7xl text-[#C5A059] font-serif italic tracking-widest text-center"
                    style={{ textShadow: "0 0 30px rgba(197, 160, 89, 0.4)" }}
                  >
                    Luminex 32
                  </h1>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 1.5,
                      delay: 0.6,
                      ease: "easeInOut",
                    }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mt-5"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => {
              const isGold = Math.random() > 0.5;
              const isMaroon = Math.random() > 0.8;
              const left = Math.random() * 100;
              const duration = 2 + Math.random() * 3;
              const delay = Math.random() * 0.4;
              const bgColor = isMaroon
                ? "bg-[#581010]"
                : isGold
                  ? "bg-[#C5A059]"
                  : "bg-[#F3D890]";
              return (
                <motion.div
                  key={i}
                  initial={{ y: -50, x: left + "vw", rotate: 0, opacity: 1 }}
                  animate={{
                    y: "110vh",
                    x: left + (Math.random() * 30 - 15) + "vw",
                    rotate: Math.random() * 720,
                    opacity: 0,
                  }}
                  transition={{ duration, delay, ease: "easeIn" }}
                  className={`absolute top-0 w-2 h-4 sm:w-3 sm:h-6 rounded-sm ${bgColor} shadow-lg`}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#C5A059] z-[100] origin-left"
      />

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (audioRef.current) {
              isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all text-[#581010]"
        >
          {isPlaying ? (
            <Volume2 size={20} className="animate-pulse" />
          ) : (
            <VolumeX size={20} />
          )}
        </button>
        <audio ref={audioRef} src="/tulus.mp3?v=1" loop />
      </div>

      <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-[#2D0A0A] px-4 sm:px-8 lg:px-0 py-24 lg:py-0">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
          <motion.img
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/flower.png"
            className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-72 md:w-[450px] lg:w-[500px] mix-blend-screen"
            alt=""
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.8, rotate: 160 }}
            animate={{ opacity: 0.15, scale: 1, rotate: 180 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/flower.png"
            className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-72 md:w-[450px] lg:w-[500px] mix-blend-screen"
            alt=""
          />
        </div>

        <div className="relative w-full lg:w-1/2 h-auto lg:h-full flex items-center justify-center p-4 sm:p-8 lg:p-12 order-2 lg:order-1 z-10 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full aspect-[3/4] max-w-[280px] sm:max-w-sm lg:max-w-md bg-[#1a0505] border-4 border-[#C5A059] p-3 sm:p-4 shadow-[0_0_50px_rgba(197,160,89,0.25)] rounded-sm"
          >
            <div className="relative w-full h-full border border-[#C5A059]/40 rounded-sm overflow-hidden bg-[#2D0A0A]">
              <img
                src="/images/hero.jpeg"
                className="w-full h-full object-cover"
                alt="hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A0A]/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <div className="relative w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center px-4 sm:px-12 lg:px-20 z-10 text-white order-1 lg:order-2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="space-y-4 lg:space-y-6"
          >
            <img
              src="/logotelkom.png"
              alt="Logo SMK Telkom"
              className="h-14 sm:h-16 md:h-20 lg:h-20 mb-4 lg:mb-6 mx-auto lg:mx-0 object-contain drop-shadow-lg"
            />

            <span className="inline-block px-4 py-1 border border-[#C5A059] text-[#C5A059] text-[10px] tracking-[0.4em] uppercase font-sans font-bold">
              SMK Telkom Malang
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.05] lg:leading-[0.95]">
              WISUDA <br />
              <span className="text-[#C5A059] italic font-light">
                ANGKATAN 32
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-light opacity-60 max-w-sm mx-auto lg:mx-0 italic mt-4 leading-relaxed">
              Celebrating the transition of Class 32 from students to future
              leaders.
            </p>
          </motion.div>
        </div>
      </section>

      <SmoothDivider from="#2D0A0A" to="#FFFDF9" />

      <section className="relative z-20 bg-[#FFFDF9] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl leading-snug">
              Yth. {guestName} <br />
              <span className="text-[#C5A059] italic">
                Kelas XII Angkatan XXXII
              </span>
            </h2>

            <div className="w-16 h-[2px] bg-[#581010] mx-auto my-6 opacity-30" />

            <h3 className="text-2xl sm:text-3xl font-serif text-[#2D0A0A] mb-6">
              [ Nama Siswa ]
            </h3>

            <p className="text-gray-500 italic max-w-xl mx-auto text-sm">
              "Sebuah akhir hanyalah awal dari petualangan yang baru. Kami
              mengundang Bapak/Ibu untuk menjadi saksi langkah pertama
              putra-putri kita."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12 w-full">
            {[
              {
                icon: Calendar,
                label: "Tanggal",
                value: "11 Juni 2026",
                extra: "Kamis",
                theme: "light",
              },
              {
                icon: Clock,
                label: "Waktu",
                value: "07:00 — 12:00",
                extra: "WIB (Pagi)",
                theme: "dark",
              },
              {
                icon: MapPin,
                label: "Lokasi",
                value: "Graha Cakrawala",
                extra: "Kota Malang",
                theme: "light",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.1,
                  margin: "0px 0px -50px 0px",
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -7, scale: 1.018 }}
                whileTap={{ scale: 0.97 }}
                className={`group cursor-pointer rounded-[2rem] sm:rounded-[2.5rem] p-[1.5px] w-full ${
                  item.theme === "dark"
                    ? "bg-gradient-to-br from-[#C5A059]/90 via-[#ffffff]/20 to-[#581010]"
                    : "bg-gradient-to-br from-[#C5A059]/65 via-white to-[#581010]/25"
                } shadow-[0_16px_42px_rgba(88,16,16,0.13)] hover:shadow-[0_26px_70px_rgba(88,16,16,0.22)] transition-shadow duration-500`}
              >
                <div
                  className={`h-full p-6 sm:p-8 md:p-10 rounded-[calc(2rem-1.5px)] sm:rounded-[calc(2.5rem-1.5px)] text-center border transition-all duration-500 ${
                    item.theme === "dark"
                      ? "bg-[#581010] text-white border-[#C5A059]/15 group-hover:bg-[#641313]"
                      : "bg-white text-[#333] border-white group-hover:bg-[#fffaf4]"
                  }`}
                >
                  <item.icon
                    className="mx-auto text-[#C5A059] mb-4 transition-transform duration-500 group-hover:scale-110"
                    size={28}
                  />

                  <p className="text-[10px] uppercase tracking-widest mb-1 opacity-50 font-sans font-bold">
                    {item.label}
                  </p>

                  <p className="text-lg font-bold">{item.value}</p>

                  <p className="text-[10px] italic opacity-50">{item.extra}</p>

                  {item.label === "Tanggal" && (
                    <button
                      onClick={addToCalendar}
                      className="mt-3 text-[9px] font-sans font-bold underline tracking-tighter hover:text-[#C5A059]"
                    >
                      + GOOGLE CALENDAR
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.1,
                margin: "0px 0px -50px 0px",
              }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.012 }}
              whileTap={{ scale: 0.975 }}
              className="group cursor-pointer rounded-3xl p-[1.5px] bg-gradient-to-r from-[#581010]/70 via-[#C5A059]/25 to-white shadow-[0_14px_38px_rgba(88,16,16,0.13)] hover:shadow-[0_24px_60px_rgba(88,16,16,0.24)] transition-shadow duration-500 w-full"
            >
              <div className="h-full w-full bg-white rounded-[calc(1.5rem-1.5px)] p-6 border border-white flex gap-4 items-center transition-all duration-500 group-hover:bg-[#fff7f7]">
                <Users
                  className="text-[#581010] shrink-0 transition-transform duration-500 group-hover:scale-110"
                  size={22}
                />

                <p className="text-[12px] font-sans text-gray-600">
                  Maksimal 2 pendamping. Harap tunjukkan kartu akses digital.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.1,
                margin: "0px 0px -50px 0px",
              }}
              transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.012 }}
              whileTap={{ scale: 0.975 }}
              className="group cursor-pointer rounded-3xl p-[1.5px] bg-gradient-to-r from-[#C5A059]/75 via-[#C5A059]/25 to-white shadow-[0_14px_38px_rgba(197,160,89,0.16)] hover:shadow-[0_24px_60px_rgba(197,160,89,0.30)] transition-shadow duration-500 w-full"
            >
              <div className="h-full w-full bg-white rounded-[calc(1.5rem-1.5px)] p-6 border border-white flex gap-4 items-center transition-all duration-500 group-hover:bg-[#fffaf2]">
                <Shirt
                  className="text-[#C5A059] shrink-0 transition-transform duration-500 group-hover:scale-110"
                  size={22}
                />

                <p className="text-[12px] font-sans text-gray-600">
                  Pria: Batik Lengan Panjang. Wanita: Sopan & Rapi.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-gradient-to-br from-[#2D0A0A] to-[#1a0505] p-8 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] text-center shadow-[0_20px_50px_rgba(88,16,16,0.2)] border border-[#C5A059]/20 relative overflow-hidden"
          >
            <Video
              className="absolute -left-10 -bottom-10 text-white/5"
              size={150}
            />
            <Video
              className="absolute -right-10 -top-10 text-white/5"
              size={150}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-4">
                <Video className="text-[#C5A059]" size={28} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3">
                Live Streaming
              </h3>
              <p className="text-sm font-light text-white/70 max-w-md mx-auto mb-8">
                Bagi kerabat dan sahabat yang berhalangan hadir secara fisik,
                Anda dapat menyaksikan momen bahagia kami secara virtual melalui
                tautan berikut.
              </p>
              <Link href="https://youtube.com/live" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#C5A059] text-[#2D0A0A] rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-3 transition-colors"
                >
                  <Play size={16} />
                  Tonton Siaran Langsung
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SmoothDivider from="#FFFDF9" to="#2D0A0A" />

      <section className="relative py-14 sm:py-24 px-4 sm:px-6 bg-[#2D0A0A] text-white overflow-hidden w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 w-full flex flex-col items-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.95]">
              Menuju Hari <br />
              <span className="text-[#C5A059]">Besar Kita</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-[280px] sm:max-w-none mx-auto">
              {Object.entries(timeLeft).map(([label, value]) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="bg-white/5 w-full p-4 sm:p-6 rounded-2xl border border-white/10 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-[#C5A059] min-h-[44px] [perspective:700px]">
                    <FlipNumber value={value} />
                  </p>

                  <p className="text-[8px] sm:text-[9px] uppercase tracking-widest opacity-40">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link href="/konfirmasi" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="mt-6 sm:mt-8 px-8 sm:px-12 py-4 sm:py-5 bg-[#C5A059] text-[#2D0A0A] rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_18px_45px_rgba(197,160,89,0.26)] transition-all whitespace-nowrap"
              >
                Konfirmasi Kehadiran
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <SmoothDivider from="#2D0A0A" to="#FCFAFA" />

      <section className="pb-20 sm:pb-24 px-4 sm:px-6 bg-[#FCFAFA] w-full overflow-hidden">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-8">
            <p className="text-[#C5A059] text-[10px] tracking-widest font-bold uppercase mb-2">
              Event Location
            </p>

            <h3 className="text-2xl font-bold">Denah Lokasi</h3>
          </div>

          <div className="w-full h-[260px] sm:h-[320px] md:h-[400px] rounded-[1.8rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative">
            {/* GOOGLE MAPS EMBED YANG BENAR UNTUK GRAHA CAKRAWALA UM */}
            <iframe
              src="https://maps.google.com/maps?q=Graha%20Cakrawala%20UM,%20Malang&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="flex justify-center mt-8">
            {/* LINK TOMBOL GOOGLE MAPS UNTUK GRAHA CAKRAWALA UM */}
            <Link
              href="https://www.google.com/maps/search/?api=1&query=Graha+Cakrawala+UM,+Malang"
              target="_blank"
            >
              <button className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-white border border-gray-200 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest hover:bg-gray-50 transition-all shadow-sm whitespace-nowrap">
                <MapPin size={14} className="text-[#581010]" />
                PETUNJUK GOOGLE MAPS
                <ExternalLink size={12} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <SmoothDivider from="#FCFAFA" to="#2D0A0A" />

      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#2D0A0A] overflow-hidden w-full">
        <div className="relative max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <ListOrdered className="text-[#C5A059] shrink-0" size={32} />

            <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase text-white">
              Susunan Acara
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
            {[
              "Pembukaan & Prosesi",
              "Menyanyikan Indonesia Raya",
              "Laporan Akademik",
              "Sambutan Kepala Sekolah",
              "Pengukuhan Wisudawan",
              "Janji Wisudawan",
              "Penyerahan Siswa",
              "Doa & Penutup",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.1,
                  margin: "0px 0px -50px 0px",
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-[1.7rem] p-[1.5px] w-full bg-gradient-to-r from-[#C5A059]/80 via-[#F3D890]/40 to-[#581010]/60 shadow-[0_18px_45px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_65px_rgba(197,160,89,0.25)] transition-shadow duration-500"
              >
                <div className="relative w-full overflow-hidden rounded-[calc(1.7rem-1.5px)] bg-[#431010]/95 border border-[#C5A059]/20 px-6 sm:px-8 py-6 sm:py-7 flex items-center gap-5">
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#F3D890]/80 to-transparent opacity-70" />

                  <span className="text-[#C5A059] text-lg sm:text-xl font-bold tracking-widest min-w-[42px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="h-12 w-px bg-[#C5A059]/30" />

                  <p className="text-white text-base sm:text-lg font-bold">
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SmoothDivider from="#2D0A0A" to="#0a0202" />

      <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#0a0202] text-center flex items-center justify-center min-h-[60vh] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={quoteVariants}
          className="max-w-4xl mx-auto relative z-10 px-2"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#C5A059] leading-relaxed sm:leading-relaxed italic">
            {quoteWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-2 sm:mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 1.5 },
              },
            }}
            className="w-24 h-[1px] bg-[#C5A059]/40 mx-auto mt-10 mb-6"
          />
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1, delay: 2 } },
            }}
            className="text-white/40 text-xs sm:text-sm tracking-[0.3em] uppercase font-sans font-bold"
          >
            Angkatan 32 • Moklet
          </motion.p>
        </motion.div>
      </section>

      <SmoothDivider from="#0a0202" to="#FCFAFA" />

      <section className="py-16 px-4 sm:px-6 bg-[#FCFAFA] w-full overflow-hidden">
        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#C5A059] text-[10px] tracking-[0.4em] uppercase font-bold mb-2">
              Our Journey
            </p>
            <h3 className="text-3xl sm:text-4xl italic text-[#333] mb-4">
              Cinematic Video
            </h3>
            <p className="text-gray-500 italic max-w-xl mx-auto text-sm mb-10">
              Menyaksikan kembali jejak langkah, suka, duka, dan tawa bersama
              selama menempuh pendidikan di SMK Telkom Malang.
            </p>

            {/* KOTAK PUTIH DENGAN TULISAN "Video" */}
            <div className="w-full max-w-3xl mx-auto aspect-video rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white shadow-[0_20px_50px_rgba(88,16,16,0.15)] bg-white flex items-center justify-center relative">
              <span className="text-[#333] font-serif italic text-2xl sm:text-4xl opacity-50">
                Video
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#FCFAFA] overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full text-center md:text-left">
          <div>
            <h3 className="text-3xl sm:text-4xl italic text-[#333]">
              Galeri Kenangan
            </h3>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#581010] rounded-full text-[11px] sm:text-[12px] font-black tracking-widest uppercase text-[#581010] hover:bg-[#581010] hover:text-white transition-colors shadow-[0_10px_25px_rgba(88,16,16,0.12)] whitespace-nowrap"
          >
            {showAll ? (
              <>
                <Layout size={18} />
                Kembali
              </>
            ) : (
              <>
                <Grid size={18} />
                Lihat Semua
              </>
            )}
          </motion.button>
        </div>

        <div className="relative px-4 sm:px-6 w-full min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {!showAll ? (
              <motion.div
                key="carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-5 sm:gap-7 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <AnimatePresence>
                  {filteredGallery.map((img, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      key={img.src + index}
                      className="group relative min-w-[82vw] sm:min-w-[360px] md:min-w-[450px] aspect-video rounded-[2rem] p-[1px] bg-gradient-to-br from-[#C5A059]/60 to-[#581010]/25 shadow-[0_12px_30px_rgba(88,16,16,0.12)] snap-center overflow-hidden"
                    >
                      <div className="relative w-full h-full rounded-[calc(2rem-1px)] overflow-hidden bg-[#F3F1EF]">
                        <img
                          src={img.src}
                          className="w-full h-full object-cover"
                          alt={`gallery-${index}`}
                          loading="lazy"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A0A]/60 via-transparent to-transparent" />
                        <div className="absolute left-5 bottom-5">
                          <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.2em] font-sans font-black bg-white/90 px-3 py-1 rounded-full inline-block mb-2 shadow-sm">
                            {img.category}
                          </p>
                          <h4 className="text-white text-lg italic leading-none mt-1">
                            Luminex 32
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredGallery.length === 0 && (
                  <div className="w-full text-center py-10 text-gray-400 italic">
                    Tidak ada foto di kategori ini.
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 w-full"
              >
                <AnimatePresence>
                  {filteredGallery.map((img, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      key={img.src + index}
                      className="group relative aspect-square rounded-[2rem] p-[1px] bg-gradient-to-br from-[#C5A059]/60 to-[#581010]/25 shadow-[0_12px_30px_rgba(88,16,16,0.12)] overflow-hidden w-full"
                    >
                      <div className="relative w-full h-full rounded-[calc(2rem-1px)] overflow-hidden bg-[#F3F1EF]">
                        <img
                          src={img.src}
                          className="w-full h-full object-cover"
                          alt={`gallery-${index}`}
                          loading="lazy"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A0A]/60 via-transparent to-transparent" />
                        <div className="absolute left-5 bottom-5">
                          <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.2em] font-sans font-black bg-white/90 px-3 py-1 rounded-full inline-block mb-2 shadow-sm">
                            {img.category}
                          </p>
                          <h4 className="text-white text-lg italic leading-none mt-1">
                            Class 32
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SmoothDivider from="#FCFAFA" to="#2D0A0A" />

      <section
        id="kesan-pesan"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-[#2D0A0A] text-white w-full overflow-hidden"
      >
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/5 p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl flex flex-col w-full"
          >
            <h3 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
              <MessageSquare className="text-[#C5A059]" />
              Kesan & Pesan
            </h3>

            <form onSubmit={handleSendMessage} className="space-y-4 w-full">
              <input
                type="text"
                placeholder="Nama Anda"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] transition-all placeholder:text-white/30"
              />

              <textarea
                rows={3}
                placeholder="Tuliskan beberapa pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] transition-all resize-none placeholder:text-white/30"
              />

              <button
                type="submit"
                className="w-full py-4 bg-white text-[#2D0A0A] rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-2"
              >
                Kirim Pesan
                <Send size={14} />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/10 w-full">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-[#C5A059]">
                Pesan Masuk ({messages.length})
              </h4>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar w-full">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-black/20 rounded-2xl p-5 border border-white/5 w-full"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-[#C5A059] text-sm">
                        {msg.name}
                      </p>
                      <span className="text-[10px] opacity-40 whitespace-nowrap ml-4">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed font-light break-words">
                      "{msg.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.4); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 89, 0.8); 
        }
      `,
        }}
      />

      <SmoothDivider from="#2D0A0A" to="#FFFFFF" />

      <footer className="py-16 bg-white text-center border-t border-gray-50 w-full">
        <div className="mb-6 flex justify-center gap-6 opacity-20 grayscale">
          <img src="/ypt-logo.png" className="h-8" alt="YPT" />

          <img src="/logo-telkom-schools.png" className="h-8" alt="Moklet" />
        </div>

        <p className="text-[10px] tracking-[0.5em] sm:tracking-[1em] uppercase text-gray-300 font-bold px-4">
          MOKLET • ANGKATAN 32 • 2026
        </p>
      </footer>
    </main>
  );
}
