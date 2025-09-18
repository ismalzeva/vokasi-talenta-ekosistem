import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FileText, 
  Ticket, 
  Briefcase,
  MapPin,
  Star,
  TrendingUp,
  CheckCircle,
  Clock,
  CreditCard,
  Globe,
  Award,
  BookOpen,
  Target,
  Zap,
  Gift
} from "lucide-react";

interface JobSeekerDashboardProps {
  onBack: () => void;
}

export default function JobSeekerDashboard({ onBack }: JobSeekerDashboardProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [voucherBalance] = useState(2500000); // Rp 2.5M

  const stats = [
    { 
      label: 'Profile Completion', 
      value: '85%', 
      icon: User, 
      change: '+15%',
      color: 'bg-gradient-primary'
    },
    { 
      label: 'Certificates Earned', 
      value: '3', 
      icon: Award, 
      change: '+1',
      color: 'bg-gradient-success'
    },
    { 
      label: 'Voucher Balance', 
      value: `Rp ${(voucherBalance / 1000000).toFixed(1)}M`, 
      icon: CreditCard, 
      change: 'Active',
      color: 'bg-gradient-indonesian'
    },
    { 
      label: 'Job Applications', 
      value: '12', 
      icon: Briefcase, 
      change: '+3 this week',
      color: 'bg-gradient-primary'
    }
  ];

  const recommendedTraining = [
    {
      title: 'Advanced Digital Marketing',
      provider: 'BLK Jakarta Pusat',
      duration: '3 months',
      cost: 'Rp 1.5M',
      rating: 4.8,
      voucher: true,
      difficulty: 'Intermediate'
    },
    {
      title: 'Full Stack Web Development',
      provider: 'LPK TechSkills',
      duration: '6 months',
      cost: 'Rp 2.2M',
      rating: 4.9,
      voucher: true,
      difficulty: 'Advanced'
    },
    {
      title: 'Data Science Fundamentals',
      provider: 'BLK Surabaya',
      duration: '4 months',
      cost: 'Rp 1.8M',
      rating: 4.7,
      voucher: true,
      difficulty: 'Beginner'
    }
  ];

  const jobOpportunities = [
    {
      title: 'Digital Marketing Specialist',
      company: 'PT. Gojek Indonesia',
      location: 'Jakarta',
      salary: 'Rp 8-12M',
      type: 'Full-time',
      match: 92,
      overseas: false
    },
    {
      title: 'Software Engineer',
      company: 'Shopee Singapore',
      location: 'Singapore',
      salary: 'SGD 4,000-6,000',
      type: 'Full-time',
      match: 87,
      overseas: true
    },
    {
      title: 'Data Analyst',
      company: 'PT. Tokopedia',
      location: 'Jakarta',
      salary: 'Rp 7-10M',
      type: 'Full-time',
      match: 78,
      overseas: false
    }
  ];

  const voucherServices = [
    {
      name: 'Training Enrollment',
      cost: 'Varies',
      icon: BookOpen,
      description: 'Use vouchers for any certified training program'
    },
    {
      name: 'International Insurance',
      cost: 'Rp 500K',
      icon: Globe,
      description: 'Comprehensive health and travel insurance for overseas workers'
    },
    {
      name: 'Orientation Training',
      cost: 'Rp 300K',
      icon: Target,
      description: 'Pre-departure orientation for international job placement'
    },
    {
      name: 'Travel Package',
      cost: 'Rp 800K',
      icon: MapPin,
      description: 'Complete travel arrangement for overseas job placement'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-success shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
                ← Back
              </Button>
              <div className="text-white">
                <h1 className="text-2xl font-bold">Job Seeker Dashboard</h1>
                <p className="text-white/80">Welcome back, Ahmad Fauzi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Gift className="w-4 h-4 mr-2" />
                Voucher: Rp {(voucherBalance / 1000).toLocaleString()}K
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="dashboard-card hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-success font-medium">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="overseas">Overseas</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Dynamic Profile & CV Builder
                    </CardTitle>
                    <CardDescription>
                      Build your comprehensive profile with AI-powered CV generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Profile Completion</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <Progress value={85} className="h-3" />
                      
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <Button variant="hero" className="h-20 flex flex-col gap-2">
                          <User className="w-6 h-6" />
                          Edit Profile
                        </Button>
                        
                        <Button variant="success" className="h-20 flex flex-col gap-2">
                          <FileText className="w-6 h-6" />
                          Generate CV
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Skills Added</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Experience Years</span>
                        <span className="font-semibold">2.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Training Hours</span>
                        <span className="font-semibold">240</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Profile Views</span>
                        <span className="font-semibold">48</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Recommended Training Programs
                </CardTitle>
                <CardDescription>
                  Personalized training suggestions based on your career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedTraining.map((training, index) => (
                    <Card key={training.title} className="border-2 hover:border-primary transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{training.difficulty}</Badge>
                          {training.voucher && (
                            <Badge variant="default" className="bg-success">
                              <Ticket className="w-3 h-3 mr-1" />
                              Voucher
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{training.title}</CardTitle>
                        <CardDescription>{training.provider}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Duration:</span>
                            <span className="font-medium">{training.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cost:</span>
                            <span className="font-medium">{training.cost}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{training.rating}</span>
                          </div>
                          
                          <Button variant="voucher" className="w-full mt-4">
                            <Ticket className="w-4 h-4 mr-2" />
                            Enroll with Voucher
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vouchers Tab */}
          <TabsContent value="vouchers" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Voucher Services
                    </CardTitle>
                    <CardDescription>
                      Use your vouchers for training and job placement services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {voucherServices.map((service, index) => (
                        <Card key={service.name} className="border-2 hover:border-primary transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <service.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">{service.cost}</p>
                              </div>
                            </div>
                            <p className="text-sm mb-3">{service.description}</p>
                            <Button variant="voucher" size="sm" className="w-full">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Use Voucher
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Voucher Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-gradient-indonesian">
                        Rp {(voucherBalance / 1000).toLocaleString()}K
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available Balance
                      </div>
                      
                      <Button variant="success" className="w-full">
                        <Zap className="w-4 h-4 mr-2" />
                        Top Up Voucher
                      </Button>
                      
                      <div className="space-y-2 pt-4 text-sm">
                        <div className="flex justify-between">
                          <span>This Month Used:</span>
                          <span>Rp 750K</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining:</span>
                          <span className="font-semibold">Rp 1.75M</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Competency Certificates
                </CardTitle>
                <CardDescription>
                  Track your training certificates and competency history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Digital Marketing Professional',
                      issuer: 'BLK Jakarta Pusat',
                      date: 'March 2024',
                      status: 'active',
                      level: 'Professional'
                    },
                    {
                      name: 'Basic Web Development',
                      issuer: 'LPK TechSkills',
                      date: 'January 2024',
                      status: 'active',
                      level: 'Beginner'
                    },
                    {
                      name: 'Advanced Excel Analytics',
                      issuer: 'BLK Surabaya',
                      date: 'December 2023',
                      status: 'active',
                      level: 'Advanced'
                    }
                  ].map((cert, index) => (
                    <Card key={cert.name} className="border-2 border-success/20">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-success rounded-full flex items-center justify-center mb-4">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground mb-3">{cert.date}</p>
                        <Badge variant="default" className="bg-success">
                          {cert.level}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Opportunities
                </CardTitle>
                <CardDescription>
                  Discover job opportunities matching your skills and experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobOpportunities.map((job, index) => (
                    <Card key={job.title} className="border-2 hover:border-primary transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{job.title}</h4>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={job.overseas ? 'default' : 'secondary'}>
                              {job.overseas ? 'Overseas' : 'Local'}
                            </Badge>
                            <div className="mt-2">
                              <span className="text-sm text-muted-foreground">Match: </span>
                              <span className="font-semibold text-success">{job.match}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{job.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{job.salary}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="default" className="flex-1">
                            Apply Now
                          </Button>
                          <Button variant="outline">
                            Save Job
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overseas Tab */}
          <TabsContent value="overseas" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Overseas Job Placement
                </CardTitle>
                <CardDescription>
                  International job opportunities and preparation services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button variant="hero" className="h-32 flex flex-col gap-2">
                    <Globe className="w-8 h-8" />
                    Browse Overseas Jobs
                  </Button>
                  
                  <Button variant="success" className="h-32 flex flex-col gap-2">
                    <Target className="w-8 h-8" />
                    Pre-departure Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}