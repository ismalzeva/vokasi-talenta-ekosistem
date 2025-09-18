import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Calendar, 
  Users, 
  FileText, 
  Building2,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  Award,
  BookOpen,
  Target
} from "lucide-react";

interface LPKDashboardProps {
  onBack: () => void;
}

export default function LPKDashboard({ onBack }: LPKDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { 
      label: 'Active Students', 
      value: '156', 
      icon: Users, 
      change: '+12%',
      color: 'bg-gradient-primary'
    },
    { 
      label: 'Completed Training', 
      value: '89', 
      icon: CheckCircle, 
      change: '+8%',
      color: 'bg-gradient-success'
    },
    { 
      label: 'Vouchers Redeemed', 
      value: 'Rp 45M', 
      icon: DollarSign, 
      change: '+15%',
      color: 'bg-gradient-indonesian'
    },
    { 
      label: 'Job Placement Rate', 
      value: '78%', 
      icon: TrendingUp, 
      change: '+5%',
      color: 'bg-gradient-primary'
    }
  ];

  const recentActivities = [
    {
      type: 'upload',
      title: 'Digital Marketing Syllabus Updated',
      time: '2 hours ago',
      status: 'completed',
      icon: Upload
    },
    {
      type: 'report',
      title: 'Monthly Training Report Submitted',
      time: '5 hours ago',
      status: 'completed',
      icon: FileText
    },
    {
      type: 'collaboration',
      title: 'New Partnership with PT. Tokopedia',
      time: '1 day ago',
      status: 'pending',
      icon: Building2
    },
    {
      type: 'training',
      title: 'Web Development Batch 15 Started',
      time: '2 days ago',
      status: 'in-progress',
      icon: BookOpen
    }
  ];

  const trainingPrograms = [
    {
      name: 'Digital Marketing',
      students: 45,
      duration: '3 months',
      completion: 78,
      vouchers: 'Rp 15M',
      status: 'active'
    },
    {
      name: 'Web Development',
      students: 32,
      duration: '6 months',
      completion: 65,
      vouchers: 'Rp 20M',
      status: 'active'
    },
    {
      name: 'Data Analytics',
      students: 28,
      duration: '4 months',
      completion: 85,
      vouchers: 'Rp 12M',
      status: 'active'
    },
    {
      name: 'Mobile App Development',
      students: 21,
      duration: '5 months',
      completion: 45,
      vouchers: 'Rp 18M',
      status: 'planning'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
                ← Back
              </Button>
              <div className="text-white">
                <h1 className="text-2xl font-bold">LPK/BLK Dashboard</h1>
                <p className="text-white/80">BLK Jakarta Pusat - ID: LPK001</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Award className="w-4 h-4 mr-2" />
              Certified Provider
            </Badge>
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
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="collaboration">Partners</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Training Programs */}
              <div className="lg:col-span-2">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Active Training Programs
                    </CardTitle>
                    <CardDescription>
                      Monitor progress across all training programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainingPrograms.map((program, index) => (
                        <div key={program.name} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{program.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {program.students} students • {program.duration}
                              </p>
                            </div>
                            <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                              {program.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{program.completion}%</span>
                            </div>
                            <Progress value={program.completion} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-muted-foreground">
                              Vouchers: {program.vouchers}
                            </span>
                            <Button variant="ghost" size="sm">
                              View Details <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <div>
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0`}>
                            <activity.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                          <Badge 
                            variant={activity.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Training Syllabus Management
                </CardTitle>
                <CardDescription>
                  Upload and manage training materials and certification modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button variant="hero" className="h-32 flex flex-col gap-2">
                    <Upload className="w-8 h-8" />
                    Upload New Syllabus
                  </Button>
                  
                  <Button variant="outline" className="h-32 flex flex-col gap-2">
                    <FileText className="w-8 h-8" />
                    Manage Existing Materials
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Training Schedules & Attendance
                </CardTitle>
                <CardDescription>
                  Manage training schedules and track student attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="success" className="h-24 flex flex-col gap-2">
                    <Calendar className="w-6 h-6" />
                    Create Schedule
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <Users className="w-6 h-6" />
                    Track Attendance
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <Clock className="w-6 h-6" />
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Training Reports & Analytics
                </CardTitle>
                <CardDescription>
                  Submit reports and view training analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button variant="indonesian" className="h-32 flex flex-col gap-2">
                    <FileText className="w-8 h-8" />
                    Submit Monthly Report
                  </Button>
                  
                  <Button variant="outline" className="h-32 flex flex-col gap-2">
                    <TrendingUp className="w-8 h-8" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Industry Collaboration Board
                </CardTitle>
                <CardDescription>
                  Connect with industry partners and access collaboration opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button variant="success" className="h-32 flex flex-col gap-2">
                    <Building2 className="w-8 h-8" />
                    Browse Partners
                  </Button>
                  
                  <Button variant="outline" className="h-32 flex flex-col gap-2">
                    <Award className="w-8 h-8" />
                    Partnership Requests
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