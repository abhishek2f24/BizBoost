import Link from "next/link";
import { ArrowRight, Camera, Sparkles, Rocket, DollarSign, Zap, Play, CheckCircle2, Link as LinkIcon, Star, Check } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] selection:bg-[#FF5C00] selection:text-white font-body relative">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FF5C00] to-[#FF8C00] text-white text-center py-2 px-4 text-[13px] font-bold tracking-wide">
        🎉 Launching in India: Accept UPI, GST Invoices, and Cash on Delivery seamlessly with 0% extra transaction fees!
      </div>

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-[#FF5C00]/5 blur-[150px] animate-pulse-glow" />
      </div>

      {/* Nav */}
      <div className="flex justify-center pt-8 relative z-20">
        <nav className="bg-white/80 backdrop-blur-xl border border-black/10 rounded-full px-4 py-2 flex items-center gap-8 shadow-sm">
          <Link href="/" className="font-display font-bold text-[20px] tracking-tight flex items-center gap-2 pl-4 text-black">
            <div className="w-6 h-6 rounded bg-[#FF5C00] flex items-center justify-center text-white">
              <Zap size={14} className="fill-white" />
            </div>
            BizBoost<span className="text-[#FF5C00]">.ai</span>
          </Link>
          <div className="hidden md:flex gap-6 font-semibold text-[15px] text-[#2D2D2D]/70">
            <Link href="#how-it-works" className="hover:text-black transition-colors">How it works</Link>
            <Link href="#features" className="hover:text-black transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="#community" className="hover:text-black transition-colors">Community</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-[15px] font-bold px-4 hover:text-black transition-colors text-[#2D2D2D]/70">Login</Link>
            <Link href="/dashboard" className="bg-[#FF5C00] text-white hover:bg-[#FF5C00]/90 transition-colors rounded-full font-bold px-6 py-2 shadow-lg shadow-[#FF5C00]/20">
              Get started
            </Link>
          </div>
        </nav>
      </div>

      <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-[48px] md:text-[80px] leading-[1.1] font-display font-bold tracking-tight mb-6 text-black">
            Start selling from <br className="hidden md:block"/>
            <span className="italic font-light text-[#FF5C00]">a single photo</span>
          </h1>
          <p className="text-[18px] md:text-[22px] text-[#2D2D2D]/70 max-w-3xl mx-auto mb-12">
            BizBoost.ai builds your storefront, runs your Instagram ads, and handles UPI payments. All in minutes. Perfect for Indian creators.
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="flex items-center bg-white border border-black/10 rounded-full p-2 pl-6 shadow-xl transition-all focus-within:border-[#FF5C00]/50 focus-within:shadow-[0_0_30px_rgba(255,92,0,0.15)]">
              <Camera size={24} className="text-[#2D2D2D]/40 shrink-0" />
              <input 
                type="text" 
                placeholder="I want to sell vintage clothes|"
                className="bg-transparent border-none outline-none flex-1 px-4 text-black placeholder:text-[#2D2D2D]/40 text-[18px]"
              />
              <Link href="/dashboard" className="bg-[#FF5C00] text-white font-bold rounded-full px-6 py-3 flex items-center gap-2 hover:bg-[#FF5C00]/90 transition-colors whitespace-nowrap shadow-lg shadow-[#FF5C00]/30">
                Start for free <ArrowRight size={18} strokeWidth={3} />
              </Link>
            </div>
          </div>
          
          {/* Animated Business Counter */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex -space-x-4">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] object-cover" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] object-cover" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] object-cover" />
              <div className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] bg-black text-white flex items-center justify-center font-bold text-[12px]">+</div>
            </div>
            <div className="flex items-center gap-2 font-display text-[18px]">
              <div className="flex text-[#FF5C00]">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <span className="font-bold text-black animate-pulse">28,000+</span> 
              <span className="text-[#2D2D2D]/60">businesses built on BizBoost</span>
            </div>
          </div>
        </section>

        {/* Hero Mobile App Mockup */}
        <section className="mb-32 flex justify-center relative">
          <div className="w-full max-w-4xl pt-12 relative flex justify-center">
             {/* Phone Mockup Frame */}
             <div className="w-[320px] md:w-[380px] h-[650px] bg-black rounded-[50px] border-[8px] border-black shadow-2xl relative overflow-hidden flex flex-col z-10 ring-1 ring-black/5">
                {/* Dynamic Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[20px] z-20"></div>
                
                {/* Screen Content */}
                <div className="flex-1 bg-[#F9FAFB] w-full overflow-hidden flex flex-col relative rounded-[40px]">
                  {/* Mock Store Header */}
                  <div className="h-48 bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80] relative">
                    <div className="absolute bottom-[-30px] left-6 w-20 h-20 rounded-full bg-white p-1 shadow-lg">
                       <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=150&q=80" alt="Store Logo" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  {/* Mock Store Details */}
                  <div className="pt-12 px-6 pb-6 bg-white">
                    <h3 className="font-bold text-[22px] text-black">Aura Ceramics</h3>
                    <p className="text-[14px] text-gray-500 mb-4">Handcrafted pottery from Jaipur.</p>
                    <button className="w-full bg-[#FF5C00] text-white py-3 rounded-xl font-bold text-[14px] shadow-md shadow-[#FF5C00]/20">Follow Store</button>
                  </div>
                  {/* Mock Products Grid */}
                  <div className="flex-1 bg-gray-50 p-4">
                    <div className="font-bold text-[14px] mb-4 text-black">Featured Products</div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                         <div className="aspect-square rounded-lg bg-gray-100 mb-2 overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80" alt="Mug" className="w-full h-full object-cover" />
                         </div>
                         <div className="font-bold text-[12px] text-black">Speckled Mug</div>
                         <div className="text-[#25D366] font-bold text-[12px]">₹850</div>
                       </div>
                       <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                         <div className="aspect-square rounded-lg bg-gray-100 mb-2 overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80" alt="Bowl" className="w-full h-full object-cover" />
                         </div>
                         <div className="font-bold text-[12px] text-black">Matcha Bowl</div>
                         <div className="text-[#25D366] font-bold text-[12px]">₹1,200</div>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
             
             {/* Decorative UI elements floating around */}
             <div className="hidden md:flex absolute top-[20%] left-0 bg-white p-4 rounded-2xl shadow-xl border border-black/5 items-center gap-3 animate-float">
               <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                 <DollarSign size={20} />
               </div>
               <div>
                 <div className="text-[12px] text-gray-500 font-bold">New UPI Payment</div>
                 <div className="text-[16px] font-bold text-black">₹4,250 received</div>
               </div>
             </div>

             <div className="hidden md:flex absolute bottom-[20%] right-0 bg-white p-4 rounded-2xl shadow-xl border border-black/5 items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                 <Sparkles size={20} />
               </div>
               <div>
                 <div className="text-[12px] text-gray-500 font-bold">AI Instagram Reel</div>
                 <div className="text-[16px] font-bold text-black">Generated & Ready</div>
               </div>
             </div>
          </div>
        </section>

        {/* Sell What You... Section */}
        <section className="mb-40 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6 group">
              <h3 className="text-[28px] tracking-tight text-black">sell what you <strong className="font-display font-bold">know</strong></h3>
              <div className="aspect-[4/3] rounded-[24px] bg-gradient-to-br from-[#FFE0B2]/40 to-white border border-black/10 relative overflow-hidden group-hover:border-[#FF5C00]/30 transition-colors shadow-sm">
                <img src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80" alt="Coaching" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                   <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                     <p className="text-[12px] text-gray-500 mb-1 font-bold">You got a new order! 🎉</p>
                     <p className="text-black font-bold">1:1 Coaching Session</p>
                     <p className="text-[#25D366] font-bold text-[18px]">₹2,500</p>
                   </div>
                </div>
              </div>
              <p className="text-[#2D2D2D]/70 font-medium">Challenges, 1:1 sessions, courses, templates</p>
            </div>

            <div className="flex flex-col gap-6 group">
              <h3 className="text-[28px] tracking-tight text-black">sell what you <strong className="font-display font-bold">make</strong></h3>
              <div className="aspect-[4/3] rounded-[24px] bg-gradient-to-br from-[#A5D6A7]/40 to-white border border-black/10 relative overflow-hidden group-hover:border-[#FF5C00]/30 transition-colors shadow-sm">
                 <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=600&q=80" alt="Handicrafts" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                   <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                     <p className="text-[12px] text-gray-500 mb-1 font-bold">Payment received 💰</p>
                     <p className="text-black font-bold">Handmade Ceramic Mug</p>
                     <p className="text-[#25D366] font-bold text-[18px]">₹850</p>
                   </div>
                </div>
              </div>
              <p className="text-[#2D2D2D]/70 font-medium">Jewellery, apparel, home decor, art</p>
            </div>

            <div className="flex flex-col gap-6 group">
              <h3 className="text-[28px] tracking-tight text-black">sell what you <strong className="font-display font-bold">love</strong></h3>
              <div className="aspect-[4/3] rounded-[24px] bg-gradient-to-br from-[#B39DDB]/40 to-white border border-black/10 relative overflow-hidden group-hover:border-[#FF5C00]/30 transition-colors shadow-sm">
                 <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" alt="Fitness" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                   <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                     <p className="text-[12px] text-gray-500 mb-1 font-bold">New subscriber 🚀</p>
                     <p className="text-black font-bold">30-Day Home Workout</p>
                     <p className="text-[#25D366] font-bold text-[18px]">₹1,200/mo</p>
                   </div>
                </div>
              </div>
              <p className="text-[#2D2D2D]/70 font-medium">Fitness classes, networking events, dance</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mb-40 text-center">
          <p className="text-[#FF5C00] text-[18px] mb-2 font-bold uppercase tracking-widest">From idea to paying customer</p>
          <h2 className="text-[48px] md:text-[56px] font-display font-bold tracking-tight mb-16 text-black">BizBoost.ai is simple</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            
            <div className="bg-white border border-black/5 shadow-lg rounded-[32px] p-8 text-left flex flex-col hover:border-[#FF5C00]/30 transition-colors">
              <div className="text-gray-400 font-display font-bold text-[18px] mb-6">01</div>
              <div className="w-14 h-14 rounded-full bg-[#FF5C00]/10 flex items-center justify-center mb-6">
                 <Camera size={28} className="text-[#FF5C00]" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-bold mb-3 text-black">Upload photo</h3>
              <p className="text-[#2D2D2D]/70 text-[15px] leading-relaxed">Take a photo of your product, skill, or service. Or just describe it.</p>
            </div>

            <div className="bg-white border border-black/5 shadow-lg rounded-[32px] p-8 text-left flex flex-col hover:border-[#FF5C00]/30 transition-colors">
              <div className="text-gray-400 font-display font-bold text-[18px] mb-6">02</div>
              <div className="w-14 h-14 rounded-full bg-[#FF5C00]/10 flex items-center justify-center mb-6">
                 <Sparkles size={28} className="text-[#FF5C00]" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-bold mb-3 text-black">AI builds store</h3>
              <p className="text-[#2D2D2D]/70 text-[15px] leading-relaxed">Your offer, sales page, and checkout link, created instantly.</p>
            </div>

            <div className="bg-white border border-black/5 shadow-lg rounded-[32px] p-8 text-left flex flex-col hover:border-[#FF5C00]/30 transition-colors">
              <div className="text-gray-400 font-display font-bold text-[18px] mb-6">03</div>
              <div className="w-14 h-14 rounded-full bg-[#FF5C00]/10 flex items-center justify-center mb-6">
                 <Rocket size={28} className="text-[#FF5C00]" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-bold mb-3 text-black">AI markets</h3>
              <p className="text-[#2D2D2D]/70 text-[15px] leading-relaxed">Automated WhatsApp blasts, Instagram content, and Facebook ads.</p>
            </div>

            <div className="bg-white border border-black/5 shadow-lg rounded-[32px] p-8 text-left flex flex-col hover:border-[#FF5C00]/30 transition-colors">
              <div className="text-gray-400 font-display font-bold text-[18px] mb-6">04</div>
              <div className="w-14 h-14 rounded-full bg-[#FF5C00]/10 flex items-center justify-center mb-6">
                 <DollarSign size={28} className="text-[#FF5C00]" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-bold mb-3 text-black">Get paid instantly</h3>
              <p className="text-[#2D2D2D]/70 text-[15px] leading-relaxed">Accept Razorpay, UPI, and COD. Money straight to your account.</p>
            </div>
          </div>

          <Link href="/dashboard" className="inline-block bg-[#FF5C00] text-white hover:bg-[#FF5C00]/90 transition-colors rounded-full font-bold px-10 py-4 text-[18px] shadow-xl shadow-[#FF5C00]/20">
            Start 7-day free trial
          </Link>
        </section>

        {/* Magic Features */}
        <div id="features" className="space-y-40">
          
          {/* Magic Ads */}
          <section className="text-center max-w-5xl mx-auto">
             <div className="inline-flex items-center gap-2 text-[#FF5C00] font-bold text-[20px] mb-6">
               <Sparkles size={24} /> Magic Ads
             </div>
             <h2 className="text-[40px] md:text-[56px] font-display font-bold tracking-tight mb-8 text-black">
               Run ads <span className="text-gray-400 font-normal">without becoming a marketer.</span>
             </h2>
             <p className="text-[18px] text-[#2D2D2D]/70 max-w-3xl mx-auto mb-16">
               No more complicated Meta Ads manager. Magic Ads helps you launch Instagram & Facebook ads and find customers in 3 clicks.
             </p>

             <div className="w-full aspect-[16/10] bg-white rounded-[40px] border border-black/5 relative overflow-hidden shadow-2xl flex flex-col">
                <div className="h-16 border-b border-black/5 bg-gray-50 flex items-center px-6">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                     <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                     <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                   </div>
                   <div className="mx-auto font-bold text-[13px] text-gray-500 uppercase tracking-widest">Ad Creator Interface</div>
                </div>
                <div className="flex-1 flex items-center justify-center relative p-8 bg-gradient-to-b from-gray-50 to-white">
                  {/* Mockup Ad Preview */}
                  <div className="w-[350px] bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden text-black">
                     <div className="p-4 flex items-center gap-3 border-b border-black/5">
                       <div className="w-10 h-10 rounded-full bg-[#FF5C00]/20"></div>
                       <div className="text-left">
                         <div className="font-bold text-[14px]">Your Brand</div>
                         <div className="text-[12px] text-gray-500">Sponsored</div>
                       </div>
                     </div>
                     <div className="p-4 text-[14px] text-left">
                       Long day? Light this. Let the gentle orange aroma calm your thoughts, slow everything down, and ease you into a peaceful night's sleep 🌙🍊
                     </div>
                     <div className="aspect-square bg-gradient-to-br from-[#FFE0B2]/40 to-orange-50 border-y border-black/5 relative">
                       <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover opacity-80" alt="Ad Image"/>
                     </div>
                     <div className="p-4 bg-gray-50 flex justify-between items-center">
                       <div className="font-bold text-[14px]">SoftGlow Orange Candle</div>
                       <div className="bg-white border border-black/10 shadow-sm px-4 py-1.5 rounded-lg font-bold text-[12px]">Shop Now</div>
                     </div>
                  </div>
                </div>
             </div>
          </section>

          {/* Magic Content */}
          <section className="text-center max-w-5xl mx-auto">
             <div className="inline-flex items-center gap-2 text-[#FF5C00] font-bold text-[20px] mb-6">
               <Sparkles size={24} /> Magic Content
             </div>
             <h2 className="text-[40px] md:text-[56px] font-display font-bold tracking-tight mb-8 text-black">
               Launch content <span className="text-gray-400 font-normal">without a content team.</span>
             </h2>
             <p className="text-[18px] text-[#2D2D2D]/70 max-w-3xl mx-auto mb-16">
               Studio photos. Polished ad copy. WhatsApp blast templates. Every day. It's just you and BizBoost.ai, acting as your entire creative agency.
             </p>

             <div className="w-full aspect-[16/10] bg-white rounded-[40px] border border-black/5 relative overflow-hidden shadow-2xl p-8">
               <div className="grid grid-cols-3 gap-4 h-full">
                  <div className="rounded-2xl bg-gray-100 relative overflow-hidden group shadow-inner">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Shoe" />
                  </div>
                  <div className="rounded-2xl bg-gray-100 relative overflow-hidden group shadow-inner">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Watch" />
                  </div>
                  <div className="rounded-2xl bg-gray-100 relative overflow-hidden group shadow-inner">
                     <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Headphones" />
                  </div>
                  <div className="rounded-2xl bg-gray-100 relative overflow-hidden group shadow-inner">
                     <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Macbook" />
                  </div>
                  <div className="rounded-2xl bg-gray-100 relative overflow-hidden group shadow-inner">
                     <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Shoes" />
                  </div>
                  <div className="rounded-2xl bg-gray-100 relative overflow-hidden group shadow-inner flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                    <div className="text-center">
                       <Sparkles size={32} className="text-[#FF5C00] mx-auto mb-2" />
                       <span className="font-bold text-[#FF5C00]">Generate More</span>
                    </div>
                  </div>
               </div>
             </div>
          </section>

          {/* Zero Link (Payments) */}
          <section className="text-center max-w-5xl mx-auto">
             <div className="inline-flex items-center gap-2 text-[#FF5C00] font-bold text-[20px] mb-6">
               <LinkIcon size={24} /> Indian Payments Built-in
             </div>
             <h2 className="text-[40px] md:text-[56px] font-display font-bold tracking-tight mb-8 text-black">
               Accept UPI & COD <span className="text-gray-400 font-normal">with 0% platform fees.</span>
             </h2>
             <p className="text-[18px] text-[#2D2D2D]/70 max-w-3xl mx-auto mb-16">
               Indian buyers want UPI, Cards, and Cash on Delivery. We integrate with Razorpay and manage your checkout experience out of the box.
             </p>

             <div className="w-full aspect-[16/10] bg-white rounded-[40px] border border-black/5 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-gradient-to-tr from-gray-50 to-white">
                <div className="w-[400px] bg-white rounded-3xl border border-black/10 p-8 shadow-xl text-black relative">
                   
                   <div className="absolute -top-4 -right-4 bg-[#25D366] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                     <Check size={14}/> Paid via UPI
                   </div>

                   <div className="flex bg-gray-100 rounded-xl p-1 mb-10">
                     <div className="flex-1 text-center py-2 bg-white rounded-lg font-bold text-[14px] shadow-sm">Checkout</div>
                     <div className="flex-1 text-center py-2 text-gray-500 font-bold text-[14px]">Success</div>
                   </div>
                   
                   <div className="text-center mb-8">
                     <div className="flex items-center justify-center gap-2 text-gray-500 text-[14px] font-bold mb-2">
                       🇮🇳 INR <ArrowRight size={14} className="rotate-90" />
                     </div>
                     <div className="text-[64px] font-display font-bold leading-none mb-4 text-black">₹2,500</div>
                     <div className="text-[14px] text-gray-500 font-medium flex items-center justify-center gap-2">
                       <CheckCircle2 size={16} className="text-[#25D366]" /> Payment Verified
                     </div>
                   </div>

                   <button className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed">Download Invoice</button>
                </div>
             </div>
          </section>
        </div>

        {/* Video Testimonials (Scrolling) */}
        <section className="my-40 max-w-7xl mx-auto text-center">
          <h2 className="text-[40px] md:text-[56px] font-display font-bold tracking-tight mb-4 text-black">
            Stories from people who <span className="italic font-light text-[#FF5C00]">started.</span>
          </h2>
          <p className="text-[18px] text-[#2D2D2D]/70 mb-16">
            Real Indian businesses growing automatically on BizBoost.ai.
          </p>
          
          {/* Horizontal Scroll Snap Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar px-4 md:px-0">
            {/* Video Card 1 */}
            <div className="min-w-[85vw] md:min-w-[400px] snap-center group cursor-pointer shrink-0">
              <div className="w-full aspect-[3/4] rounded-[32px] bg-black relative overflow-hidden mb-4 shadow-xl">
                <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Seller" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-between p-6">
                  <div className="self-start bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[12px] font-bold text-white">
                    Digital Products
                  </div>
                  
                  {/* Big Play Button in center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF5C00] group-hover:scale-110 transition-all border border-white/30">
                     <Play size={24} className="text-white ml-1" fill="currentColor" />
                  </div>

                  <div className="relative z-10 text-left w-full text-white">
                    <h3 className="text-[24px] font-display font-bold mb-4 leading-tight">"I sold 500+ templates on WhatsApp using Magic Ads."</h3>
                    <div className="font-bold">Rahul Design</div>
                    <div className="text-[12px] text-white/70">UI/UX Designer, Delhi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card 2 */}
            <div className="min-w-[85vw] md:min-w-[400px] snap-center group cursor-pointer shrink-0">
              <div className="w-full aspect-[3/4] rounded-[32px] bg-black relative overflow-hidden mb-4 shadow-xl">
                <img src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Seller" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-between p-6">
                  <div className="self-start bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[12px] font-bold text-white">
                    Physical Goods
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF5C00] group-hover:scale-110 transition-all border border-white/30">
                     <Play size={24} className="text-white ml-1" fill="currentColor" />
                  </div>

                  <div className="relative z-10 text-left w-full text-white">
                    <h3 className="text-[24px] font-display font-bold mb-4 leading-tight">"Setup took 2 minutes. My first sale happened same day."</h3>
                    <div className="font-bold">Kavita Arts</div>
                    <div className="text-[12px] text-white/70">Handicrafts, Jaipur</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card 3 */}
            <div className="min-w-[85vw] md:min-w-[400px] snap-center group cursor-pointer shrink-0">
              <div className="w-full aspect-[3/4] rounded-[32px] bg-black relative overflow-hidden mb-4 shadow-xl">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Seller" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-between p-6">
                  <div className="self-start bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[12px] font-bold text-white">
                    Services
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF5C00] group-hover:scale-110 transition-all border border-white/30">
                     <Play size={24} className="text-white ml-1" fill="currentColor" />
                  </div>

                  <div className="relative z-10 text-left w-full text-white">
                    <h3 className="text-[24px] font-display font-bold mb-4 leading-tight">"Finally an app that handles GST invoices automatically."</h3>
                    <div className="font-bold">Anjali Yoga</div>
                    <div className="text-[12px] text-white/70">Fitness Coach, Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* AI School / Community */}
        <section id="community" className="mb-40 max-w-6xl mx-auto bg-[#FF5C00] rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl shadow-[#FF5C00]/20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1 text-center md:text-left">
               <h2 className="text-[40px] md:text-[56px] font-display font-bold tracking-tight mb-6 leading-tight">
                 Join the AI School for Business
               </h2>
               <p className="text-[18px] text-white/80 mb-8 max-w-xl">
                 Get access to a private community of 20,000+ Indian entrepreneurs learning how to leverage AI for growth. Weekly webinars, ad template drops, and 1:1 support.
               </p>
               <Link href="/dashboard" className="inline-block bg-white text-[#FF5C00] hover:bg-gray-50 transition-colors rounded-full font-bold px-8 py-4 text-[16px] shadow-lg">
                 Join Community Free
               </Link>
             </div>
             <div className="flex-1 w-full relative">
                <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 p-2 shadow-2xl relative overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Community" className="w-full h-full object-cover rounded-2xl opacity-80" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 text-white font-bold tracking-widest uppercase text-[14px] flex items-center gap-2">
                       <Sparkles size={16}/> Live Event
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mb-40 max-w-5xl mx-auto text-center">
          <h2 className="text-[40px] md:text-[56px] font-display font-bold tracking-tight mb-4 text-black">
            Simple pricing for <span className="text-[#FF5C00]">Indian sellers.</span>
          </h2>
          <p className="text-[18px] text-[#2D2D2D]/70 mb-16 max-w-2xl mx-auto">
            Start with a 7-day free trial, upgrade when you scale. No hidden platform fees.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-[32px] p-8 border border-black/10 shadow-lg flex flex-col">
              <h3 className="font-display font-bold text-[24px] mb-2 text-black">Starter</h3>
              <p className="text-[14px] text-gray-500 mb-6">Perfect for new sellers testing the waters.</p>
              <div className="flex items-baseline gap-2 mb-8 text-black">
                <span className="text-[48px] font-display font-bold">₹1,999</span>
                <span className="text-gray-500">/month</span>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                {[
                  "Up to 10 Products",
                  "Basic Storefront (BizBoost domain)",
                  "UPI & Cash on Delivery",
                  "10 AI Creatives per month",
                  "Standard Email Support"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-gray-400 shrink-0" />
                    <span className="text-gray-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/dashboard" className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-black py-4 rounded-xl font-bold transition-colors">
                Start 7-Day Free Trial
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-black text-white rounded-[32px] p-8 border border-black shadow-2xl relative flex flex-col overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FF5C00] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-bl-xl z-10">
                Most Popular
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C00]/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display font-bold text-[24px]">Pro</h3>
                  <Sparkles size={18} className="text-[#FF5C00]" />
                </div>
                <p className="text-[14px] text-gray-400 mb-6">For sellers ready to scale their business.</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[48px] font-display font-bold">₹9,999</span>
                  <span className="text-gray-400">/month</span>
                </div>
                
                <div className="space-y-4 mb-8 flex-1">
                  {[
                    "Unlimited Products",
                    "Custom Domain (yourstore.com)",
                    "Razorpay Credit Card Integrations",
                    "Unlimited AI Creatives & Ads",
                    "Automated Festival Campaigns",
                    "Priority WhatsApp Support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[#FF5C00] shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard" className="w-full block text-center bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-[#FF5C00]/20">
                  Start 7-Day Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Final CTA with Lifestyle Background */}
        <section className="mb-20 text-center relative py-32 rounded-[40px] overflow-hidden shadow-2xl border border-black/5">
           {/* Background Image */}
           <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80" alt="Entrepreneur" className="absolute inset-0 w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

           <div className="relative z-20 max-w-3xl mx-auto px-6 text-white">
             <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#FF5C00] to-[#FF5C00]/20 mx-auto mb-10 flex items-center justify-center shadow-[0_0_50px_rgba(255,92,0,0.5)]">
               <div className="w-8 h-8 flex flex-col items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white mb-1"></div>
                  <div className="w-5 h-2 bg-white rounded-t-full"></div>
               </div>
             </div>
             <h2 className="text-[48px] md:text-[64px] font-display font-bold tracking-tight mb-8 leading-tight">
               Life is too short <br className="hidden md:block"/>
               <span className="italic font-light text-[#FF5C00]">to work for others.</span>
             </h2>

             <Link href="/dashboard" className="inline-block bg-[#FF5C00] text-white hover:bg-[#FF5C00]/90 transition-colors rounded-full font-bold px-12 py-5 text-[20px] shadow-xl shadow-[#FF5C00]/30 mb-8">
               Start your free trial
             </Link>
             <p className="text-white/70 text-[15px]">
               No credit card required &nbsp;&middot;&nbsp; 30-second setup
             </p>
           </div>
        </section>

      </main>

      {/* Modern Footer */}
      <div className="px-6 pb-6 mt-10 relative z-20 max-w-7xl mx-auto">
        <footer className="bg-white border border-black/10 rounded-[40px] p-12 relative overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-5 gap-10 relative z-10">
             <div className="md:col-span-2">
                <Link href="/" className="font-display font-bold text-[32px] tracking-tight flex items-center gap-2 mb-2 text-black">
                  <div className="w-8 h-8 rounded bg-[#FF5C00] flex items-center justify-center text-white">
                    <Zap size={18} className="fill-white" />
                  </div>
                  BizBoost<span className="text-[#FF5C00]">.ai</span>
                </Link>
                <p className="text-gray-500 text-[18px] mb-8 font-medium">Work for yourself.</p>
                
                <div className="space-y-4">
                  <Link href="/dashboard" className="w-48 bg-black text-white rounded-xl py-3 px-4 flex items-center gap-3 border border-black/10 hover:bg-gray-900 transition-colors">
                     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                     <div className="text-left">
                       <div className="text-[10px] text-white/70">Download on the</div>
                       <div className="text-[16px] font-bold leading-none">App Store</div>
                     </div>
                  </Link>
                  <Link href="/dashboard" className="w-48 bg-black text-white rounded-xl py-3 px-4 flex items-center gap-3 border border-black/10 hover:bg-gray-900 transition-colors">
                     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341l-4.624-4.624 4.624-4.624c.48.48.745 1.132.745 1.81v5.628c0 .678-.265 1.33-.745 1.81zM3.477 15.341c-.48-.48-.745-1.132-.745-1.81V7.903c0-.678.265-1.33.745-1.81L8.1 10.717l-4.623 4.624zm5.33-5.33L4.183 5.387c.73-.243 1.543-.134 2.18.29l9.274 6.183-6.83-1.849zM4.183 18.613l4.624-4.624 6.83-1.849-9.274 6.183c-.637.424-1.45.533-2.18.29z"/></svg>
                     <div className="text-left">
                       <div className="text-[10px] text-white/70">GET IT ON</div>
                       <div className="text-[16px] font-bold leading-none">Google Play</div>
                     </div>
                  </Link>
                </div>
             </div>

             <div className="flex flex-col gap-3">
               <h4 className="text-[#FF5C00] font-bold text-[12px] uppercase tracking-wider mb-2">BIZBOOST</h4>
               <Link href="/dashboard" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Start for Free</Link>
               <Link href="/auth/signin" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Login</Link>
               <Link href="#pricing" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Pricing</Link>
               <Link href="#community" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Community</Link>
             </div>

             <div className="flex flex-col gap-3">
               <div className="h-6 mb-2"></div> {/* Spacer for alignment */}
               <Link href="#features" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Storefronts</Link>
               <Link href="#features" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Magic Content</Link>
               <Link href="#features" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Magic Ads</Link>
               <Link href="#features" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Payments (UPI)</Link>
             </div>

             <div className="flex flex-col gap-3">
               <div className="h-6 mb-2"></div> {/* Spacer for alignment */}
               <Link href="/dashboard" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Find Customers</Link>
               <Link href="/dashboard" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Make Money Online</Link>
               <Link href="/dashboard" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">For Coaches</Link>

               <h4 className="text-[#FF5C00] font-bold text-[12px] uppercase tracking-wider mt-6 mb-2">COMPARE</h4>
               <Link href="/compare/etsy" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">BizBoost vs Etsy</Link>
               <Link href="/compare/shopify" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">BizBoost vs Shopify</Link>
             </div>

             <div className="flex flex-col gap-3">
               <h4 className="text-[#FF5C00] font-bold text-[12px] uppercase tracking-wider mb-2">COMPANY</h4>
               <Link href="#" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">About Us</Link>
               <Link href="#" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Careers</Link>
               <Link href="#community" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">AI School</Link>
               <Link href="#" className="font-bold text-gray-700 hover:text-[#FF5C00] transition-colors">Contact Us</Link>
             </div>
          </div>

          <div className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center relative z-10 gap-6">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-colors cursor-pointer"><Play size={14} fill="currentColor" /></div>
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-colors cursor-pointer"><Camera size={14} /></div>
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-colors cursor-pointer font-bold font-display text-[12px]">X</div>
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-colors cursor-pointer font-bold font-display text-[12px]">in</div>
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] transition-colors cursor-pointer font-bold font-display text-[12px]">f</div>
            </div>
            
            <div className="flex items-center gap-6 text-[14px] text-gray-500 font-medium">
              <Link href="#" className="hover:text-black transition-colors">Terms of service</Link>
              <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
            </div>

            <div className="flex items-center gap-4 text-[14px] text-gray-500 font-medium">
               <div className="flex items-center gap-1 font-bold text-black"><span className="text-xl">🇮🇳</span> IN</div>
               <div>Copyright © 2026 BizBoost.ai</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
