import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2,
  DollarSign,
  MapPin,
  Target,
  Award,
  Calendar,
  FileText,
  Briefcase,
  Globe,
  PieChart,
  Activity
} from "lucide-react";

interface GovernmentDashboardProps {
  onBack: () => void;
}

export default function GovernmentDashboard({ onBack }: GovernmentDashboardProps) {
  const [activeTab, setActiveTab] = useState("national");

  const nationalStats = [
    { 
      label: 'Total Training Centers', 
      value: '1,247', 
      icon: Building2, 
      change: '+54 this month',
      color: 'bg-gradient-primary'
    },
    { 
      label: 'Active Job Seekers', 
      value: '89,523', 
      icon: Users, 
      change: '+12% from last month',
      color: 'bg-gradient-success'
    },
    { 
      label: 'Total Fund Disbursed', 
      value: 'Rp 145B', 
      icon: DollarSign, 
      change: '78% of budget used',
      color: 'bg-gradient-indonesian'
    },
    { 
      label: 'Job Placement Rate', 
      value: '76.8%', 
      icon: TrendingUp, 
      change: '+2.3% improvement',
      color: 'bg-gradient-primary'
    }
  ];

  const provincialData = [
    {
      province: 'DKI Jakarta',
      trainingCenters: 156,
      jobSeekers: 12456,
      placementRate: 82.5,
      fundingUsed: 15.2,
      performance: 'excellent'
    },
    {
      province: 'Jawa Barat',
      trainingCenters: 189,
      jobSeekers: 18923,
      placementRate: 78.3,
      fundingUsed: 18.7,
      performance: 'good'
    },
    {
      province: 'Jawa Timur',
      trainingCenters: 167,
      jobSeekers: 16785,
      placementRate: 75.1,
      fundingUsed: 16.3,
      performance: 'good'
    },
    {
      province: 'Sumatera Utara',
      trainingCenters: 98,
      jobSeekers: 9876,
      placementRate: 71.2,
      fundingUsed: 9.8,
      performance: 'average'
    },
    {
      province: 'Sulawesi Selatan',
      trainingCenters: 87,
      jobSeekers: 8234,
      placementRate: 68.9,
      fundingUsed: 8.1,
      performance: 'average'
    }
  ];

  const fundingSources = [
    {
      source: 'Government Budget',
      amount: 89.5,
      percentage: 62,
      programs: ['Kartu Prakerja', 'Dana Desa', 'APBN Training'],
      color: 'bg-gradient-primary'
    },
    {
      source: 'Private Sector CSR',
      amount: 35.2,
      percentage: 24,
      programs: ['Corporate Training', 'Industry Partnership', 'Scholarship'],
      color: 'bg-gradient-success'
    },
    {
      source: 'International Aid',
      amount: 20.3,
      percentage: 14,
      programs: ['World Bank', 'ADB', 'JICA Programs'],
      color: 'bg-gradient-indonesian'
    }
  ];

  const recentActivities = [
    {
      type: 'report',
      title: 'Monthly Training Report from 1,247 LPK/BLK',
      time: '2 hours ago',
      status: 'completed',
      icon: FileText
    },
    {
      type: 'placement',
      title: '2,456 New Job Placements Recorded',
      time: '5 hours ago',
      status: 'in-progress',
      icon: Briefcase
    },
    {
      type: 'funding',
      title: 'Rp 12.5B Fund Disbursement Approved',
      time: '1 day ago',
      status: 'completed',
      icon: DollarSign
    },
    {
      type: 'partnership',
      title: 'New International Partnership Agreement',
      time: '2 days ago',
      status: 'pending',
      icon: Globe
    }
  ];

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge className="bg-success">Excellent</Badge>;
      case 'good':
        return <Badge variant="default">Good</Badge>;
      case 'average':
        return <Badge variant="secondary">Average</Badge>;
      default:
        return <Badge variant="destructive">Needs Improvement</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-indonesian shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
                ← Back
              </Button>
              <div className="text-white">
                <h1 className="text-2xl font-bold">Government Dashboard</h1>
                <p className="text-white/80">Ministry of Manpower - National Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Activity className="w-4 h-4 mr-2" />
                Live Data
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Calendar className="w-4 h-4 mr-2" />
                Q4 2024
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* National Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {nationalStats.map((stat, index) => (
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
            <TabsTrigger value="national">National</TabsTrigger>
            <TabsTrigger value="provincial">Provincial</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* National Overview Tab */}
          <TabsContent value="national" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Training Progress */}
              <div className="lg:col-span-2">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      National Training Progress
                    </CardTitle>
                    <CardDescription>
                      Real-time training data from all registered LPK/BLK centers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { program: 'Digital Skills Training', progress: 78, total: 25000, completed: 19500 },
                        { program: 'Manufacturing & Engineering', progress: 65, total: 18000, completed: 11700 },
                        { program: 'Service & Hospitality', progress: 82, total: 15000, completed: 12300 },
                        { program: 'Agriculture & Fishery', progress: 71, total: 12000, completed: 8520 }
                      ].map((program, index) => (
                        <div key={program.program} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{program.program}</span>
                            <span className="text-sm text-muted-foreground">
                              {program.completed.toLocaleString()} / {program.total.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={program.progress} className="h-3" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{program.progress}% completed</span>
                            <span>{program.total - program.completed} remaining</span>
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
                      <Activity className="w-5 h-5" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
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

          {/* Provincial Monitoring Tab */}
          <TabsContent value="provincial" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Provincial Performance Monitoring
                </CardTitle>
                <CardDescription>
                  Training and placement performance by province
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Province</th>
                        <th className="text-left p-3">Training Centers</th>
                        <th className="text-left p-3">Job Seekers</th>
                        <th className="text-left p-3">Placement Rate</th>
                        <th className="text-left p-3">Funding (B)</th>
                        <th className="text-left p-3">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provincialData.map((province, index) => (
                        <tr key={province.province} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{province.province}</td>
                          <td className="p-3">{province.trainingCenters}</td>
                          <td className="p-3">{province.jobSeekers.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span>{province.placementRate}%</span>
                              <Progress value={province.placementRate} className="w-16 h-2" />
                            </div>
                          </td>
                          <td className="p-3">Rp {province.fundingUsed}B</td>
                          <td className="p-3">{getPerformanceBadge(province.performance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Funding Overview Tab */}
          <TabsContent value="funding" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Fund Disbursement Breakdown
                  </CardTitle>
                  <CardDescription>
                    Total budget allocation and usage across funding sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {fundingSources.map((source, index) => (
                      <div key={source.source} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{source.source}</span>
                          <span className="text-lg font-bold">Rp {source.amount}B</span>
                        </div>
                        <Progress value={source.percentage} className="h-3" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{source.percentage}% of total funding</span>
                          <span>{source.programs.length} programs</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {source.programs.map((program, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    ROI & Impact Analysis
                  </CardTitle>
                  <CardDescription>
                    Training return on investment and societal impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-success rounded-lg text-white">
                      <div className="text-3xl font-bold">3.2x</div>
                      <div className="text-sm">Average ROI</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Training Cost per Person</span>
                        <span className="font-semibold">Rp 2.3M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Average Salary Increase</span>
                        <span className="font-semibold">+145%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Employment Duration</span>
                        <span className="font-semibold">2.8 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Economic Impact</span>
                        <span className="font-semibold">Rp 7.4M</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Button variant="hero" className="h-32 flex flex-col gap-2">
                <BarChart3 className="w-8 h-8" />
                Training Analytics
              </Button>
              
              <Button variant="success" className="h-32 flex flex-col gap-2">
                <TrendingUp className="w-8 h-8" />
                Placement Trends
              </Button>
              
              <Button variant="indonesian" className="h-32 flex flex-col gap-2">
                <Target className="w-8 h-8" />
                Performance Metrics
              </Button>
              
              <Button variant="outline" className="h-32 flex flex-col gap-2">
                <Users className="w-8 h-8" />
                Demographic Analysis
              </Button>
              
              <Button variant="outline" className="h-32 flex flex-col gap-2">
                <Building2 className="w-8 h-8" />
                Provider Performance
              </Button>
              
              <Button variant="outline" className="h-32 flex flex-col gap-2">
                <Globe className="w-8 h-8" />
                Regional Comparison
              </Button>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  System Reports & Documentation
                </CardTitle>
                <CardDescription>
                  Generate and access comprehensive system reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button variant="hero" className="h-32 flex flex-col gap-2">
                    <FileText className="w-8 h-8" />
                    Generate Monthly Report
                  </Button>
                  
                  <Button variant="success" className="h-32 flex flex-col gap-2">
                    <Award className="w-8 h-8" />
                    Performance Dashboard
                  </Button>
                  
                  <Button variant="outline" className="h-32 flex flex-col gap-2">
                    <Calendar className="w-8 h-8" />
                    Historical Data
                  </Button>
                  
                  <Button variant="outline" className="h-32 flex flex-col gap-2">
                    <Target className="w-8 h-8" />
                    Impact Assessment
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