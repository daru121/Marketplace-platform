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
    <div className="mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang LUXE MART
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Kami adalah destinasi belanja online terpercaya untuk semua kebutuhan elektronik Anda.
              Dengan komitmen untuk memberikan produk berkualitas dan layanan terbaik.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <feature.icon className="w-12 h-12 text-primary-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visi & Misi</h2>
              <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Visi</h3>
                <p className="text-gray-600">
                  Menjadi platform e-commerce terdepan yang menyediakan produk elektronik berkualitas
                  dengan harga terbaik dan pelayanan prima untuk seluruh masyarakat Indonesia.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Misi</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Menyediakan produk elektronik berkualitas dengan harga kompetitif</li>
                  <li>Memberikan pengalaman berbelanja online yang aman dan nyaman</li>
                  <li>Mengutamakan kepuasan pelanggan dalam setiap layanan</li>
                  <li>Mengembangkan teknologi dan inovasi untuk kemudahan berbelanja</li>
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