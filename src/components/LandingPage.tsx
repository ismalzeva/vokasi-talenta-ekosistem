import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  Building2, 
  BarChart3,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Award
} from "lucide-react";
import heroBanner from "@/assets/hero-vocasi-banner.jpg";

interface LandingPageProps {
  onRoleSelect: (role: 'lpk' | 'jobseeker' | 'government') => void;
}

export default function LandingPage({ onRoleSelect }: LandingPageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const userRoles = [
    {
      id: 'lpk',
      title: 'Penyedia LPK/BLK',
      description: 'Lembaga Pelatihan Kerja & Balai Latihan Kerja',
      icon: GraduationCap,
      color: 'bg-gradient-primary',
      features: [
        'Unggah silabus & modul pelatihan',
        'Kelola jadwal & kehadiran',
        'Kirim laporan real-time',
        'Akses papan kolaborasi industri'
      ]
    },
    {
      id: 'jobseeker',
      title: 'Pencari Kerja',
      description: 'Calon Tenaga Kerja',
      icon: Users,
      color: 'bg-gradient-success',
      features: [
        'Buat profil CV dinamis',
        'Tukar voucher pelatihan',
        'Akses peluang kerja luar negeri',
        'Lacak sertifikat kompetensi'
      ]
    },
    {
      id: 'government',
      title: 'Pemerintah',
      description: 'Dashboard Monitoring & Analitik',
      icon: Building2,
      color: 'bg-gradient-indonesian',
      features: [
        'Monitoring pelatihan nasional',
        'Data penempatan real-time',
        'Pelacakan pencairan dana',
        'Analitik performa'
      ]
    }
  ];

  const stats = [
    { label: 'Pusat Pelatihan Aktif', value: '1,247', icon: Building2 },
    { label: 'Pencari Kerja Tersertifikasi', value: '89,523', icon: Users },
    { label: 'Penempatan Kerja', value: '45,891', icon: Star },
    { label: 'Perusahaan Mitra', value: '3,456', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center text-primary-foreground max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              <MapPin className="w-4 h-4 mr-2" />
              Platform Nasional Indonesia
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              VokasiTerpadu<span className="text-indonesian-red">.id</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
              Ekosistem Terintegrasi Pelatihan Vokasi & Penempatan Kerja
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="hero" 
                size="lg"
                className="animate-bounce-in"
                onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Jelajahi Platform
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-primary animate-bounce-in"
                style={{ animationDelay: '0.2s' }}
              >
                Tonton Demo
                <Calendar className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label} 
                  className="bg-white/10 border-white/20 backdrop-blur-sm hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-white" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient-primary">
              Pilih Peran Anda
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Akses platform yang dirancang khusus untuk kebutuhan Anda dalam ekosistem pelatihan vokasi Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {userRoles.map((role, index) => (
              <Card 
                key={role.id}
                className={`dashboard-card cursor-pointer transform transition-all duration-500 hover-lift ${
                  hoveredCard === role.id ? 'scale-105 shadow-hero' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onRoleSelect(role.id as 'lpk' | 'jobseeker' | 'government')}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto ${role.color} rounded-2xl flex items-center justify-center mb-4 shadow-elevated hover-glow`}>
                    <role.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="default" 
                    className="w-full mt-6 group"
                    onClick={() => onRoleSelect(role.id as 'lpk' | 'jobseeker' | 'government')}
                  >
                    Akses Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Fitur Platform</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Alat komprehensif untuk mengelola ekosistem pelatihan vokasi dan penempatan kerja Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Analitik Real-time',
                description: 'Pantau kemajuan pelatihan dan hasil penempatan kerja dengan visualisasi data langsung'
              },
              {
                icon: Award,
                title: 'Sistem Voucher',
                description: 'Manajemen voucher digital untuk layanan pelatihan, sertifikasi, dan penempatan kerja'
              },
              {
                icon: Users,
                title: 'Pencocokan AI',
                description: 'Rekomendasi cerdas untuk program pelatihan dan peluang kerja'
              },
              {
                icon: Building2,
                title: 'Kolaborasi Industri',
                description: 'Menghubungkan penyedia pelatihan dengan mitra industri untuk hasil kerja yang lebih baik'
              },
              {
                icon: GraduationCap,
                title: 'Pelacakan Sertifikasi',
                description: 'Sertifikat digital dan pelacakan kompetensi di semua program pelatihan'
              },
              {
                icon: MapPin,
                title: 'Cakupan Nasional',
                description: 'Cakupan komprehensif di seluruh provinsi dan daerah di Indonesia'
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className="dashboard-card text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}