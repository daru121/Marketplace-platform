import React from 'react';
import { BoltIcon, TruckIcon, ShieldCheckIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

function AboutUs() {
  const features = [
    {
      icon: BoltIcon,
      title: "Flash Sale Harian",
      description: "Dapatkan penawaran spesial setiap hari dengan diskon hingga 70%"
    },
    {
      icon: TruckIcon,
      title: "Pengiriman Cepat",
      description: "Layanan pengiriman yang cepat dan aman ke seluruh Indonesia"
    },
    {
      icon: ShieldCheckIcon,
      title: "Produk Berkualitas",
      description: "Semua produk dijamin original dengan garansi resmi"
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: "Layanan 24/7",
      description: "Tim support kami siap membantu Anda 24 jam setiap hari"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-br from-blue-800 to-indigo-900">
        <div className="absolute inset-0">
          {/* Overlay Pattern */}
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4">
          <div className="h-full flex items-center">
            <div className="max-w-3xl">
              <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-12 border border-white/20">
                <h1 className="text-6xl font-bold text-white mb-6">
                  Tentang <span className="text-blue-300">LUXE</span>{" "}
                  <span className="text-indigo-300">MART</span>
                </h1>
                <p className="text-2xl text-white/90 leading-relaxed">
                  Destinasi belanja online premium untuk semua kebutuhan elektronik Anda.
                  Dengan komitmen memberikan produk berkualitas dan layanan terbaik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} 
                   className="group bg-white rounded-2xl p-8 transition-all duration-300
                            hover:shadow-xl border border-gray-100 hover:border-blue-100">
                <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6
                              group-hover:bg-blue-100 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Visi & Misi
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform e-commerce terdepan yang menyediakan produk elektronik berkualitas
                  dengan harga terbaik dan pelayanan prima untuk seluruh masyarakat Indonesia.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Misi</h3>
                <ul className="space-y-4">
                  {[
                    "Menyediakan produk elektronik berkualitas dengan harga kompetitif",
                    "Memberikan pengalaman berbelanja online yang aman dan nyaman",
                    "Mengutamakan kepuasan pelanggan dalam setiap layanan",
                    "Mengembangkan teknologi dan inovasi untuk kemudahan berbelanja"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 
                                   flex items-center justify-center text-white text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 