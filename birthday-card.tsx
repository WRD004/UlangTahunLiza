"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, Star, Gift, Cake, PartyPopper, Sparkles, Send, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Declare emailjs as global
declare global {
  interface Window {
    emailjs: any
  }
}

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [emailjsLoaded, setEmailjsLoaded] = useState(false)
  const [lifeTime, setLifeTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const audioRef = useRef<HTMLAudioElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Load EmailJS CDN
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
    script.onload = () => {
      // Initialize EmailJS with your public key
      window.emailjs.init("ULHZxMYqDRZY8X4QQ") // Ganti dengan public key EmailJS kamu
      setEmailjsLoaded(true)
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Auto-play music when component mounts
  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3 // Set volume to 30%
          await audioRef.current.play()
        } catch (error) {
          // Auto-play blocked by browser, user needs to interact first
          console.log("Auto-play blocked, waiting for user interaction")
        }
      }
    }

    // Try to play after a short delay
    const timer = setTimeout(playMusic, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate life time from birth date
  useEffect(() => {
    const birthDate = new Date("2005-07-06T00:00:00") // 6 Juli 2005

    const updateLifeTime = () => {
      const now = new Date()
      const diff = now.getTime() - birthDate.getTime()

      if (diff > 0) {
        const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
        const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000))
        const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
        const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
        const seconds = Math.floor((diff % (60 * 1000)) / 1000)

        setLifeTime({ years, months, days, hours, minutes, seconds })
      }
    }

    updateLifeTime()
    const interval = setInterval(updateLifeTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const slides = [
    {
      id: 1,
      title: "Selamat Ulang Tahun! 🎉",
      message: "Yeay Selamat Ulang Tahun Ke 20. Semoga apa yang disemogakan tersemogakan wkwkwk, Banyak hal yang tidak terduga pada tahun ini ",
      bgGradient: "from-pink-400 via-purple-500 to-indigo-600",
      icon: <Cake className="w-16 h-16 text-white" />,
      animation: "animate-bounce",
    },
    {
      id: 2,
      title: "Gejolak Kehidupan ✨",
      message:
        "Kamu sudah berjalan sejauh ini, dan itu bukan hal kecil. Setiap langkahmu, sekecil apa pun, itu tetap berarti. Seperti pepatah inggris Remember, even databases need downtime to rebuild indexes — so do you jadi gabisa bahasa inggris intinya take your time kalo gasalah ",
      bgGradient: "from-yellow-400 via-orange-500 to-red-500",
      icon: <Star className="w-16 h-16 text-white" />,
      animation: "animate-pulse",
    },
    {
      id: 3,
      title: "Another Year of Awesome! 🎊",
      message:
        "Satu tahun lagi penuh pencapaian luar biasa! Terus bersinar dan menginspirasi orang-orang di sekitarmu. Jangan biarkan satu debu membuat mu jatuh seperti fan laptopmu (sering dibersihin yee) dirimu jauh lebih berharga dari apapun kecuali ginjalkmu kamu jual",
      bgGradient: "from-green-400 via-blue-500 to-purple-600",
      icon: <PartyPopper className="w-16 h-16 text-white" />,
      animation: "animate-spin",
    },
    {
      id: 4,
      title: "Celebrate You! 💝",
      message:
        "Hari ini adalah hari untuk merayakan betapa istimewanya dirimu. Terima kasih telah menjadi bagian dari ceritaku thanks for every thing and little thing walaupun menurutmu kadang gapenting!. Dan kalo kamu ada masalah jangan dipendem sendiri ya kamu bisa ceritakan kediriku dan jangan malu aku terbuka untuk itu",
      bgGradient: "from-rose-400 via-pink-500 to-purple-600",
      icon: <Gift className="w-16 h-16 text-white" />,
      animation: "animate-bounce",
    },
    {
      id: 5,
      title: "Love & Joy 💖",
      message:
        "Semoga tahun baru dalam hidupmu dipenuhi dengan cinta, kegembiraan, dan berkah yang melimpah dari Yang Maha Kuasa.Aminn",
      bgGradient: "from-purple-400 via-pink-500 to-red-500",
      icon: <Heart className="w-16 h-16 text-white" />,
      animation: "animate-pulse",
    },
    {
      id: 6,
      title: "Make It Magical! ✨",
      message:
        "Jadikan setiap momen di tahun ini penuh keajaiban. Kamu memiliki kekuatan untuk membuat hidup ini luar biasa!",
      bgGradient: "from-indigo-400 via-purple-500 to-pink-500",
      icon: <Sparkles className="w-16 h-16 text-white" />,
      animation: "animate-spin",
    },
  ]

  const totalSlides = slides.length + 1 // +1 for the wish form slide

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handleSubmitWish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!emailjsLoaded || !window.emailjs) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    if (!formRef.current) {
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      // Menggunakan EmailJS CDN
      const result = await window.emailjs.sendForm(
        "service_ydyzj2q", // YOUR_SERVICE_ID
        "template_2me352f", // Ganti dengan template ID kamu
        formRef.current,
      )

      setSubmitStatus("success")
      formRef.current.reset()
    } catch (error) {
      console.error("Error sending wish:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isWishFormSlide = currentSlide === slides.length
  const currentSlideData = isWishFormSlide ? null : slides[currentSlide]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Music - Hidden */}
      <audio ref={audioRef} loop preload="auto" style={{ display: "none" }}>
        <source src="/nadhif-basmalah-bergema.mp3" type="audio/mpeg" />
        <source src="/nadhif-basmalah-bergema.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Life Time Counter */}
      <div className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white">
        <div className="text-center mb-2">
          <div className="text-xs text-white/70 mb-1">🎂 Waktu Hidup</div>
          <div className="text-xs text-white/60">Sejak 6 Juli 2005</div>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Tahun:</span>
            <span className="font-mono text-white font-bold">{lifeTime.years}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Bulan:</span>
            <span className="font-mono text-white font-bold">{lifeTime.months}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Hari:</span>
            <span className="font-mono text-white font-bold">{lifeTime.days}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Jam:</span>
            <span className="font-mono text-white font-bold">{lifeTime.hours}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Menit:</span>
            <span className="font-mono text-white font-bold">{lifeTime.minutes}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Detik:</span>
            <span className="font-mono text-white font-bold animate-pulse">{lifeTime.seconds}</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-white/20 text-center">
          <div className="text-xs text-white/60">⏰ Live Counter</div>
        </div>
      </div>

      {/* Animated Fireworks Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Firework explosions */}
        <div className="firework firework-1">
          <div className="explosion explosion-1"></div>
          <div className="explosion explosion-2"></div>
          <div className="explosion explosion-3"></div>
          <div className="explosion explosion-4"></div>
          <div className="explosion explosion-5"></div>
          <div className="explosion explosion-6"></div>
        </div>

        <div className="firework firework-2">
          <div className="explosion explosion-1"></div>
          <div className="explosion explosion-2"></div>
          <div className="explosion explosion-3"></div>
          <div className="explosion explosion-4"></div>
          <div className="explosion explosion-5"></div>
          <div className="explosion explosion-6"></div>
        </div>

        <div className="firework firework-3">
          <div className="explosion explosion-1"></div>
          <div className="explosion explosion-2"></div>
          <div className="explosion explosion-3"></div>
          <div className="explosion explosion-4"></div>
          <div className="explosion explosion-5"></div>
          <div className="explosion explosion-6"></div>
        </div>

        {/* Floating flowers */}
        <div className="flower flower-1">🌸</div>
        <div className="flower flower-2">🌺</div>
        <div className="flower flower-3">🌻</div>
        <div className="flower flower-4">🌷</div>
        <div className="flower flower-5">🌹</div>
        <div className="flower flower-6">🌼</div>
        <div className="flower flower-7">🌸</div>
        <div className="flower flower-8">🌺</div>

        {/* Sparkle effects */}
        <div className="sparkle sparkle-1">✨</div>
        <div className="sparkle sparkle-2">⭐</div>
        <div className="sparkle sparkle-3">💫</div>
        <div className="sparkle sparkle-4">🌟</div>
        <div className="sparkle sparkle-5">✨</div>
        <div className="sparkle sparkle-6">⭐</div>
      </div>

      <div className="relative w-full max-w-2xl z-10">
        {/* Main Card */}
        <Card className="relative overflow-hidden border-0 shadow-2xl backdrop-blur-sm bg-white/10">
          <CardContent className="p-0">
            {isWishFormSlide ? (
              // Wish Form Slide
              <div className="relative h-auto bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-8 text-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full animate-spin"></div>
                  <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 left-8 w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10">
                  <div className="mb-6 animate-bounce">
                    <Mail className="w-16 h-16 text-white mx-auto" />
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
                    Kirim Harapan & Doa 💌
                  </h1>

                  <p className="text-lg text-white/90 mb-6 animate-slide-up">
                    Tuliskan harapan dan doa terbaikmu!
                  </p>

                  <form ref={formRef} onSubmit={handleSubmitWish} className="space-y-4 text-left max-w-md mx-auto">
                    <div>
                      <Label htmlFor="from_name" className="text-white font-medium">
                        Nama Kamu
                      </Label>
                      <Input
                        id="from_name"
                        name="from_name"
                        type="text"
                        required
                        className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                        placeholder="Masukkan nama kamu..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white font-medium">
                        Harapan & Doa
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 resize-none"
                        placeholder="Tuliskan harapan dan doa terbaikmu di sini..."
                      />
                    </div>

                    {/* Hidden field for recipient email */}
                    <input type="hidden" name="to_email" value="wishcometruemagic@gmail.com" />

                    <Button
                      type="submit"
                      disabled={isSubmitting || !emailjsLoaded}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      {!emailjsLoaded ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Memuat...
                        </>
                      ) : isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Kirim Ucapan 🌈
                        </>
                      )}
                    </Button>

                    {submitStatus === "success" && (
                      <div className="text-center p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <p className="text-white font-medium">✨ Pesan terkirim! 🎉 ✨</p>
                        <p className="text-white/80 text-sm">Terima kasih telah berbagi harapan indah!</p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="text-center p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                        <p className="text-white font-medium">❌ Gagal mengirim harapan</p>
                        <p className="text-white/80 text-sm">Silakan coba lagi dalam beberapa saat.</p>
                      </div>
                    )}
                  </form>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6">
                  <Heart className="w-4 h-4 text-white/60 animate-pulse" />
                </div>
                <div className="absolute bottom-6 right-6">
                  <Star className="w-5 h-5 text-white/60 animate-spin" />
                </div>
              </div>
            ) : (
              // Regular Birthday Card Slides
              <div
                className={`relative h-96 bg-gradient-to-br ${currentSlideData?.bgGradient} flex flex-col items-center justify-center text-center p-8 transition-all duration-500 ${isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"}`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full animate-spin"></div>
                  <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 left-8 w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full animate-pulse"></div>
                </div>

                {/* Icon */}
                <div className={`mb-6 ${currentSlideData?.animation}`}>{currentSlideData?.icon}</div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
                  {currentSlideData?.title}
                </h1>

                {/* Message */}
                <p className="text-lg text-white/90 leading-relaxed max-w-md animate-slide-up">
                  {currentSlideData?.message}
                </p>

                {/* Decorative hearts */}
                <div className="absolute top-6 left-6">
                  <Heart className="w-4 h-4 text-white/60 animate-pulse" />
                </div>
                <div className="absolute bottom-6 right-6">
                  <Star className="w-5 h-5 text-white/60 animate-spin" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-white/70 text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes firework {
          0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
          50% { width: 0.5vmin; opacity: 1; }
          100% { width: var(--finalSize); opacity: 0; }
        }

        @keyframes fireworkPseudo {
          0% { transform: translate(var(--x), var(--initialY)) rotate(0deg); width: var(--initialSize); opacity: 1; }
          50% { width: 0.5vmin; opacity: 1; }
          100% { width: var(--finalSize); opacity: 0; transform: translate(var(--x), var(--initialY)) rotate(180deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }

        .firework {
          position: absolute;
          width: 0.5vmin;
          aspect-ratio: 1;
          background: radial-gradient(circle, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%);
          border-radius: 50%;
          animation: firework 2s infinite;
        }

        .firework-1 {
          --x: 20vw;
          --initialY: 60vh;
          --finalSize: 40vmin;
          --initialSize: 0.5vmin;
          animation-delay: 0s;
        }

        .firework-2 {
          --x: 70vw;
          --initialY: 40vh;
          --finalSize: 50vmin;
          --initialSize: 0.5vmin;
          animation-delay: 1s;
        }

        .firework-3 {
          --x: 45vw;
          --initialY: 70vh;
          --finalSize: 35vmin;
          --initialSize: 0.5vmin;
          animation-delay: 2s;
        }

        .explosion {
          position: absolute;
          width: 0.5vmin;
          aspect-ratio: 1;
          background: radial-gradient(circle, #ff6b6b, #4ecdc4);
          border-radius: 50%;
          animation: fireworkPseudo 2s infinite;
        }

        .explosion-1 { --x: 0vmin; --initialY: 0vmin; --finalSize: 20vmin; --initialSize: 0.5vmin; }
        .explosion-2 { --x: 10vmin; --initialY: 5vmin; --finalSize: 15vmin; --initialSize: 0.5vmin; }
        .explosion-3 { --x: -10vmin; --initialY: -5vmin; --finalSize: 25vmin; --initialSize: 0.5vmin; }
        .explosion-4 { --x: 15vmin; --initialY: -10vmin; --finalSize: 18vmin; --initialSize: 0.5vmin; }
        .explosion-5 { --x: -15vmin; --initialY: 10vmin; --finalSize: 22vmin; --initialSize: 0.5vmin; }
        .explosion-6 { --x: 5vmin; --initialY: -15vmin; --finalSize: 12vmin; --initialSize: 0.5vmin; }

        .flower {
          position: absolute;
          font-size: 2rem;
          animation: float 4s ease-in-out infinite;
          opacity: 0.7;
        }

        .flower-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .flower-2 { top: 20%; right: 15%; animation-delay: 0.5s; }
        .flower-3 { bottom: 30%; left: 20%; animation-delay: 1s; }
        .flower-4 { bottom: 20%; right: 10%; animation-delay: 1.5s; }
        .flower-5 { top: 50%; left: 5%; animation-delay: 2s; }
        .flower-6 { top: 30%; right: 5%; animation-delay: 2.5s; }
        .flower-7 { bottom: 50%; left: 15%; animation-delay: 3s; }
        .flower-8 { bottom: 10%; right: 25%; animation-delay: 3.5s; }

        .sparkle {
          position: absolute;
          font-size: 1.5rem;
          animation: sparkle 3s ease-in-out infinite;
        }

        .sparkle-1 { top: 15%; left: 25%; animation-delay: 0s; }
        .sparkle-2 { top: 25%; right: 20%; animation-delay: 0.8s; }
        .sparkle-3 { bottom: 35%; left: 30%; animation-delay: 1.6s; }
        .sparkle-4 { bottom: 25%; right: 15%; animation-delay: 2.4s; }
        .sparkle-5 { top: 60%; left: 10%; animation-delay: 3.2s; }
        .sparkle-6 { top: 40%; right: 8%; animation-delay: 4s; }
      `}</style>
    </div>
  )
}
