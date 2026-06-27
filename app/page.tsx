import Image from "next/image"
import Link from "next/link"
import { BookOpen, Moon, Heart, Zap, Users, Home, Utensils, MessageCircle, Volume2, Bookmark, Share2, ArrowRight, Download } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <Image src="/authentic-hadith-logo.png" alt="Authentic Hadith" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-sm md:text-base font-semibold text-[#0d2b1e]">Authentic Hadith</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[#0d2b1e] hover:text-[#2d5a3d] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-[#0d2b1e] text-white text-sm font-medium rounded-lg hover:bg-[#0a1f15] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="bg-[#0d2b1e] px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="text-white">
            <p className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-4">14,444 Authenticated Hadiths</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              The Sunnah,<br />Authenticated.
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              Browse, search, and understand authentic hadith — with Arabic text, scholarly grading, AI-powered explanation, and stories of the Prophets and Companions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/login"
                className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#0d2b1e] transition-colors text-center"
              >
                Download on App Store
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#0d2b1e] transition-colors text-center"
              >
                Get on Google Play
              </Link>
            </div>
            <p className="text-xs text-gray-300">Sahih Bukhari · Sahih Muslim</p>
          </div>

          {/* Right side — Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-72 h-96 bg-black rounded-3xl p-3 shadow-2xl border-8 border-gray-900">
              {/* Phone screen */}
              <div className="w-full h-full bg-[#0d2b1e] rounded-2xl overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="bg-[#0a1f15] px-4 py-2 text-white text-xs flex justify-between items-center border-b border-[#2d5a3d]">
                  <span>9:41</span>
                  <span>●●●●●</span>
                </div>

                {/* Header */}
                <div className="bg-[#0d2b1e] px-4 py-3 border-b border-[#2d5a3d]">
                  <p className="text-[#b8860b] text-xs font-semibold text-center">✦ Hadith of the Day</p>
                </div>

                {/* Badges */}
                <div className="px-4 pt-4 pb-2 flex gap-2">
                  <span className="px-2 py-1 bg-[#2d5a3d] text-[#b8860b] text-xs font-semibold rounded">Sahih Muslim #2710</span>
                  <span className="px-2 py-1 bg-[#3a7a52] text-white text-xs font-semibold rounded">Sahih</span>
                </div>

                {/* Arabic text */}
                <div className="px-4 py-3 text-white text-sm text-right leading-relaxed overflow-y-auto flex-1 border-l-2 border-[#b8860b]">
                  <p className="text-[0.85rem] text-white mb-3 text-right font-serif leading-loose">حَدَّثَنَا أَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ، حَدَّثَنَا غُنْدَرٌ، حَدَّثَنَا شُعْبَةُ، عَنْ سَعْدٍ، عَنْ سَهْلِ بْنِ سَعْدٍ قَالَ، قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِنَّ فِي الْجَنَّةِ بَابًا يُقَالُ لَهُ الرَّيَّانُ يَدْخُلُ مِنْهُ الصَّائِمُونَ</p>
                </div>

                {/* Translation & AI Summary */}
                <div className="px-4 py-2 border-t border-[#2d5a3d] space-y-2 text-xs">
                  <div>
                    <p className="text-[#b8860b] font-semibold mb-1">Narrator: Sahl B. Sa'd (May Allah be pleased with him)</p>
                    <p className="text-gray-300 leading-relaxed">The Prophet ﷺ said: "In Paradise there is a gate called Ar-Rayyan through which only the fasting people will enter on the Day of Resurrection."</p>
                  </div>
                  <div className="bg-[#1a3a2d] rounded p-2 mt-1">
                    <p className="text-[#b8860b] font-semibold mb-1">✨ AI Summary</p>
                    <p className="text-gray-300 text-[0.75rem] leading-snug">This hadith highlights the special honor given to those who fast regularly, showing fasting&apos;s spiritual value and the rewards awaiting the faithful in Paradise.</p>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="px-4 py-2 border-t border-[#2d5a3d] flex items-center justify-between text-gray-300">
                  <div className="flex gap-3">
                    <Volume2 className="w-4 h-4 cursor-pointer hover:text-[#b8860b] transition" />
                    <Bookmark className="w-4 h-4 cursor-pointer hover:text-[#b8860b] transition" />
                    <Share2 className="w-4 h-4 cursor-pointer hover:text-[#b8860b] transition" />
                  </div>
                  <p className="text-xs font-medium text-[#b8860b]">Read Full ›</p>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FEATURE STRIP */}
      <section className="bg-[#f5f0e8] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, number: "14,444", label: "Hadiths", desc: "Sahih Bukhari & Sahih Muslim" },
              { icon: Zap, number: "20", label: "Topics", desc: "From Prayer to Family to Business" },
              { icon: Moon, number: "365", label: "Sunnah Practices", desc: "Daily habits of the Prophet ﷺ" },
              { icon: MessageCircle, number: "AI", label: "HadithChat", desc: "Ask anything, answered from authentic sources" },
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 bg-[#0d2b1e]/10 rounded-lg mb-4">
                  <card.icon className="w-6 h-6 text-[#0d2b1e]" />
                </div>
                {card.number !== "AI" ? (
                  <p className="text-3xl font-bold text-[#0d2b1e] mb-1">{card.number}</p>
                ) : (
                  <p className="text-3xl font-bold text-[#0d2b1e] mb-1">💬</p>
                )}
                <p className="font-semibold text-[#0d2b1e] mb-1">{card.label}</p>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — BROWSE BY TOPIC */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0d2b1e] font-semibold mb-3">Organized Knowledge</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0d2b1e] mb-6">Every topic. Every hadith. In one place.</h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              14,444 hadiths from Sahih Bukhari and Sahih Muslim, tagged and organized across 20 categories — from Salah & Prayer to Family & Marriage to Business & Trade. Each with Arabic, English, scholarly grading, and complete narrator chain.
            </p>
            <p className="text-sm text-gray-600 flex flex-wrap gap-3">
              <span>Salah & Prayer</span>
              <span>·</span>
              <span>Fasting & Ramadan</span>
              <span>·</span>
              <span>Iman & Aqeedah</span>
              <span>·</span>
              <span>Character & Manners</span>
              <span>·</span>
              <span>Dhikr & Dua</span>
              <span>·</span>
              <span>+ 13 more</span>
            </p>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-72 h-96 bg-black rounded-3xl p-3 shadow-2xl border-8 border-gray-900">
              <div className="w-full h-full bg-[#0d2b1e] rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-[#0a1f15] px-4 py-2 text-white text-xs flex justify-between items-center border-b border-[#2d5a3d]">
                  <span>9:41</span>
                  <span>●●●●●</span>
                </div>
                <div className="bg-[#0d2b1e] px-4 py-3 border-b border-[#2d5a3d]">
                  <p className="text-white text-sm font-semibold">Browse by Topic</p>
                  <p className="text-gray-400 text-xs mt-1">14,444 hadiths from Sahih Muslim & Sahih Bukhari</p>
                </div>
                <div className="px-4 py-3 overflow-y-auto flex-1 space-y-2">
                  {[
                    { icon: "🕌", name: "Salah & Prayer", ar: "الصلاة", count: "5787" },
                    { icon: "🌙", name: "Fasting & Ramadan", ar: "الصيام ورمضان", count: "1383" },
                    { icon: "❤️", name: "Character & Manners", ar: "الأخلاق والآداب", count: "1727" },
                    { icon: "👥", name: "Family & Marriage", ar: "الأسرة والزواج", count: "10414" },
                    { icon: "📿", name: "Dhikr & Dua", ar: "الذكر والدعاء", count: "1113" },
                    { icon: "🏘️", name: "Purification", ar: "الطهارة والنظافة", count: "1557" },
                  ].map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-[#2d5a3d]/50 cursor-pointer">
                      <span className="text-lg">{cat.icon}</span>
                      <div className="flex-1">
                        <p className="text-white text-xs font-semibold">{cat.name}</p>
                        <p className="text-gray-400 text-xs">{cat.ar}</p>
                      </div>
                      <p className="text-[#b8860b] text-xs font-bold">{cat.count}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — STORIES */}
      <section className="bg-[#0d2b1e] px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-3">Stories</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">13 Companions. 25 Prophets. Their full stories.</h2>
            <p className="text-base text-gray-300 max-w-2xl mx-auto">
              Multi-part narratives of the Sahaba and Prophets — with Quranic references, historical context, and reading time. From Abu Bakr as-Siddiq to Adam (peace be upon him).
            </p>
          </div>

          {/* Two phone mockups side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Companions */}
            <div className="flex justify-center">
              <div className="relative w-72 h-96 bg-black rounded-3xl p-3 shadow-2xl border-8 border-gray-900">
                <div className="w-full h-full bg-[#0d2b1e] rounded-2xl overflow-hidden flex flex-col">
                  <div className="bg-[#0a1f15] px-4 py-2 text-white text-xs flex justify-between items-center border-b border-[#2d5a3d]">
                    <span>9:41</span>
                    <span>●●●●●</span>
                  </div>
                  <div className="bg-[#0d2b1e] px-4 py-3 border-b border-[#2d5a3d]">
                    <p className="text-white text-sm font-semibold">Stories — Companions</p>
                  </div>
                  <div className="px-4 py-4 overflow-y-auto flex-1 space-y-3">
                    {[
                      { name: "Abu Bakr as-Siddiq", title: "The Truthful One", parts: "5 parts", time: "25 min", tags: "First Adult Male to Accept Islam · First Caliph" },
                      { name: "Khadijah bint Khuwaylid", title: "Mother of the Believers", parts: "4 parts", time: "20 min", tags: "First to Accept Islam · Prophet's Wife" },
                    ].map((comp, idx) => (
                      <div key={idx} className="bg-[#2d5a3d]/40 rounded-lg p-3 border border-[#2d5a3d] cursor-pointer hover:bg-[#2d5a3d]/60 transition">
                        <p className="text-white font-semibold text-sm">{comp.name}</p>
                        <p className="text-[#b8860b] text-xs mb-2">{comp.title}</p>
                        <p className="text-gray-300 text-xs mb-2">{comp.parts} · {comp.time}</p>
                        <p className="text-gray-400 text-xs">{comp.tags}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
              </div>
            </div>

            {/* Prophets */}
            <div className="flex justify-center">
              <div className="relative w-72 h-96 bg-black rounded-3xl p-3 shadow-2xl border-8 border-gray-900">
                <div className="w-full h-full bg-[#f5f0e8] rounded-2xl overflow-hidden flex flex-col">
                  <div className="bg-gray-100 px-4 py-2 text-gray-800 text-xs flex justify-between items-center border-b border-gray-200">
                    <span>9:41</span>
                    <span>●●●●●</span>
                  </div>
                  <div className="bg-white px-4 py-3 border-b border-gray-200">
                    <p className="text-gray-800 text-sm font-semibold">Stories — Prophets</p>
                  </div>
                  <div className="px-4 py-4 overflow-y-auto flex-1 space-y-2">
                    {[
                      { num: "1", name: "Adam", ar: "آدم", title: "Father of Humanity", parts: "4 parts", time: "20 min", quran: "25 mentions" },
                      { num: "2", name: "Idris", ar: "إدريس", title: "The Elevated One", parts: "2 parts", time: "8 min", quran: "2 mentions" },
                      { num: "3", name: "Nuh (Noah)", ar: "نوح", title: "The Grateful Servant", parts: "4 parts", time: "20 min", quran: "43 mentions" },
                    ].map((prophet, idx) => (
                      <div key={idx} className="border-l-4 border-[#0d2b1e] pl-3 py-1 cursor-pointer hover:bg-gray-50 transition">
                        <p className="text-gray-800 font-semibold text-sm">{prophet.num} · {prophet.name} <span className="text-gray-500 text-xs">{prophet.ar}</span></p>
                        <p className="text-gray-600 text-xs">{prophet.title}</p>
                        <p className="text-gray-500 text-xs">{prophet.parts} · {prophet.time} · {prophet.quran}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — SUNNAH PRACTICES */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-72 h-96 bg-black rounded-3xl p-3 shadow-2xl border-8 border-gray-900">
              <div className="w-full h-full bg-[#f5f0e8] rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-gray-100 px-4 py-2 text-gray-800 text-xs flex justify-between items-center border-b border-gray-200">
                  <span>9:41</span>
                  <span>●●●●●</span>
                </div>
                <div className="bg-white px-4 py-3 border-b border-gray-200">
                  <p className="text-gray-800 text-sm font-semibold">Sunnah Practices</p>
                  <p className="text-gray-600 text-xs mt-1">365 practices across 10 categories</p>
                </div>
                <div className="px-4 py-2 bg-gray-50 text-gray-700 text-xs leading-relaxed">
                  <p className="font-medium mb-2">Beyond the academic study of hadith, the Sunnah is the living tradition...</p>
                </div>
                <div className="px-4 py-3 overflow-y-auto flex-1 space-y-1">
                  {[
                    { icon: "🕌", name: "Sunnah of Salah", ar: "سنن الصلاة", count: "37" },
                    { icon: "❤️", name: "Sunnah of Character", ar: "سنن الأخلاق", count: "49" },
                    { icon: "🏘️", name: "Sunnah at Home", ar: "سنن المنزل", count: "28" },
                    { icon: "👥", name: "Sunnah with People", ar: "سنن المعاملات", count: "42" },
                    { icon: "🍽️", name: "Sunnah of Eating", ar: "سنن الطعام", count: "33" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 text-gray-800 text-xs hover:bg-gray-100 rounded cursor-pointer">
                      <span>{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">{item.ar}</p>
                      </div>
                      <p className="font-bold text-[#0d2b1e]">{item.count}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
            </div>
          </div>

          {/* Right text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0d2b1e] font-semibold mb-3">Sunnah Practices</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0d2b1e] mb-6">365 ways to live the Sunnah today.</h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              Not just reading — practicing. 365 authentic Sunnah acts organized into 10 categories: from how the Prophet ﷺ prayed, to how he ate, to how he treated his neighbors.
            </p>
            <p className="font-semibold text-[#c0392b]">The living tradition, not just the academic one.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — HADITHCHAT AI */}
      <section className="bg-[#0d2b1e] px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="text-white">
            <p className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-3">HadithChat</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Ask anything. Answered from authentic sources.</h2>
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              HadithChat is an AI built on the authentic hadith corpus. Ask about any topic — prayer, family, business, character — and get answers grounded in authenticated narrations, not opinion.
            </p>
            <div className="space-y-2">
              {[
                "What did the Prophet say about patience?",
                "How should I treat my neighbors?",
                "What is the ruling on fasting Mondays?",
              ].map((prompt, idx) => (
                <p key={idx} className="inline-block bg-[#2d5a3d] text-white text-xs px-3 py-2 rounded-full mr-2 mb-2">
                  {prompt}
                </p>
              ))}
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-72 h-96 bg-black rounded-3xl p-3 shadow-2xl border-8 border-gray-900">
              <div className="w-full h-full bg-[#0d2b1e] rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-[#0a1f15] px-4 py-2 text-white text-xs flex justify-between items-center border-b border-[#2d5a3d]">
                  <span>9:41</span>
                  <span>●●●●●</span>
                </div>
                <div className="bg-[#0d2b1e] px-4 py-3 border-b border-[#2d5a3d]">
                  <p className="text-white text-sm font-semibold">💬 HadithChat</p>
                </div>
                <div className="px-4 py-4 overflow-y-auto flex-1 space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#2d5a3d] text-white text-xs px-3 py-2 rounded-lg max-w-xs">Who is Jesus?</div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[#1a3d2a] text-gray-200 text-xs px-3 py-2 rounded-lg max-w-xs">
                      <p className="font-semibold text-[#b8860b] mb-1">In Islamic tradition:</p>
                      <p className="mb-2">Jesus (Isa) is one of the most important prophets. Born miraculously to Virgin Mary, he performed miracles by Allah's permission.</p>
                      <p>Muslims believe he was raised to heaven and will return before the Day of Judgment.</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-[#2d5a3d] flex gap-2">
                  <input type="text" placeholder="Ask about hadith..." className="flex-1 bg-[#2d5a3d] text-white text-xs px-2 py-1 rounded outline-none placeholder-gray-400" />
                  <button className="text-[#b8860b]">→</button>
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — DOWNLOAD CTA */}
      <section className="bg-[#0d2b1e] px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center text-white">
          <p className="text-4xl mb-6 text-[#b8860b]">✦</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Begin with knowledge.</h2>
          <p className="text-base text-gray-300 mb-8">Free to download. Built for every Muslim.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/login"
              className="px-6 py-3 bg-[#b8860b] text-black font-semibold rounded-lg hover:bg-[#d4a574] transition-colors"
            >
              Download on App Store
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-[#b8860b] text-black font-semibold rounded-lg hover:bg-[#d4a574] transition-colors"
            >
              Get on Google Play
            </Link>
          </div>
          <p className="text-sm text-gray-400">authentichadith.app</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Image src="/authentic-hadith-logo.png" alt="Authentic Hadith" width={40} height={40} className="w-8 h-8" />
              <span className="text-white font-semibold">Authentic Hadith</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Features</Link>
              <Link href="#" className="hover:text-white transition-colors">Stories</Link>
              <Link href="#" className="hover:text-white transition-colors">Sunnah</Link>
              <Link href="#" className="hover:text-white transition-colors">HadithChat</Link>
            </nav>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Authentic Hadith · Built with care for the Ummah</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
