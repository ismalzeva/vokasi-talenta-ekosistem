import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Activity,
  GraduationCap,
  Search,
} from "lucide-react";
import { mockLpkData } from "@/pages/data";
import { StatsCard } from "../ui/stats-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { LpkCard } from "../ui/lpk-card";
import { Lpk } from "@/pages/types";

interface GovernmentDashboardProps {
  onBack: () => void;
}
type ProvincialRow = {
  province: string;
  trainingCenters: number;
  jobSeekers: number; // sum latest-year counts
  placementRate: number; // weighted avg (1 desimal)
  performance: "excellent" | "good" | "average" | "poor";
  growthRate: number | null; // YoY %, bisa null kalau ga ada data prev
};

const sortByYearAsc = (arr: { year: number; count: number }[]) =>
  [...arr].sort((a, b) => a.year - b.year);

function latestAndPrev(trainings: { year: number; count: number }[]) {
  const s = sortByYearAsc(trainings);
  const len = s.length;
  return {
    latest: len > 0 ? s[len - 1] : undefined,
    prev: len > 1 ? s[len - 2] : undefined,
  };
}

function classify(
  perPlacement: number,
  growth: number | null
): ProvincialRow["performance"] {
  const g = growth ?? 0;
  if (perPlacement >= 80 && g > 5) return "excellent";
  if (perPlacement >= 60 && g >= 0) return "good";
  if (perPlacement >= 40 || g >= -5) return "average";
  return "poor";
}

function getPerformanceBadge(level: ProvincialRow["performance"]) {
  const map: Record<
    ProvincialRow["performance"],
    { label: string; className: string }
  > = {
    excellent: { label: "Excellent", className: "bg-green-100 text-green-700" },
    good: { label: "Good", className: "bg-blue-100 text-blue-700" },
    average: { label: "Average", className: "bg-amber-100 text-amber-700" },
    poor: { label: "Poor", className: "bg-red-100 text-red-700" },
  };
  const { label, className } = map[level];
  return <Badge className={`text-xs ${className}`}>{label}</Badge>;
}
function buildProvincialData(lpks: Lpk[]): ProvincialRow[] {
  const byProvince = lpks.reduce<Record<string, Lpk[]>>((acc, l) => {
    (acc[l.province] ||= []).push(l);
    return acc;
  }, {});

  const rows: ProvincialRow[] = Object.entries(byProvince).map(
    ([province, list]) => {
      const centers = list.length;

      // aggregate latest + prev
      let sumLatest = 0;
      let sumPrev = 0;

      // weighted placement by latest count
      let weightedPlacementSum = 0;
      let weight = 0;

      list.forEach((l) => {
        const { latest, prev } = latestAndPrev(
          l.realizationOfIndependentTrainings
        );
        const latestCount = latest?.count ?? 0;
        const prevCount = prev?.count ?? 0;

        sumLatest += latestCount;
        sumPrev += prevCount;

        if (latestCount > 0) {
          weightedPlacementSum += l.placement * latestCount;
          weight += latestCount;
        }
      });

      const placementRate =
        weight > 0
          ? Number((weightedPlacementSum / weight).toFixed(1))
          : Number(
              (
                list.reduce((s, l) => s + (l.placement ?? 0), 0) /
                Math.max(1, list.length)
              ).toFixed(1)
            );

      const growthRate =
        sumPrev > 0
          ? Number((((sumLatest - sumPrev) / sumPrev) * 100).toFixed(1))
          : null;

      const performance = classify(placementRate, growthRate);

      return {
        province,
        trainingCenters: centers,
        jobSeekers: sumLatest,
        placementRate,
        performance,
        growthRate,
      };
    }
  );

  // contoh: urutkan berdasarkan jobSeekers desc
  rows.sort((a, b) => b.jobSeekers - a.jobSeekers);

  return rows;
}

export default function GovernmentDashboard({
  onBack,
}: GovernmentDashboardProps) {
  const [activeTab, setActiveTab] = useState("national");
  const provincialData = useMemo(
    () => buildProvincialData(mockLpkData ?? []),
    []
  );

  const fundingSources = [
    {
      source: "Government Budget",
      amount: 89.5,
      percentage: 62,
      programs: ["Kartu Prakerja", "Dana Desa", "APBN Training"],
      color: "bg-gradient-primary",
    },
    {
      source: "Private Sector CSR",
      amount: 35.2,
      percentage: 24,
      programs: ["Corporate Training", "Industry Partnership", "Scholarship"],
      color: "bg-gradient-success",
    },
    {
      source: "International Aid",
      amount: 20.3,
      percentage: 14,
      programs: ["World Bank", "ADB", "JICA Programs"],
      color: "bg-gradient-indonesian",
    },
  ];

  const recentActivities = [
    {
      type: "report",
      title: "Monthly Training Report from 1,247 LPK/BLK",
      time: "2 hours ago",
      status: "completed",
      icon: FileText,
    },
    {
      type: "placement",
      title: "2,456 New Job Placements Recorded",
      time: "5 hours ago",
      status: "in-progress",
      icon: Briefcase,
    },
    {
      type: "funding",
      title: "Rp 12.5B Fund Disbursement Approved",
      time: "1 day ago",
      status: "completed",
      icon: DollarSign,
    },
    {
      type: "partnership",
      title: "New International Partnership Agreement",
      time: "2 days ago",
      status: "pending",
      icon: Globe,
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredLpks = mockLpkData.filter((lpk) => {
    const matchesSearch =
      lpk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lpk.trainingProgram.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince =
      selectedProvince === "all" || lpk.province === selectedProvince;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "verified" && lpk.verificationStatus) ||
      (selectedStatus === "unverified" && !lpk.verificationStatus);

    return matchesSearch && matchesProvince && matchesStatus;
  });

  const totalLpks = mockLpkData.length;
  const verifiedLpks = mockLpkData.filter(
    (lpk) => lpk.verificationStatus == "verified"
  ).length;
  const totalTrainings = mockLpkData.reduce(
    (sum, lpk) =>
      sum +
      lpk.realizationOfIndependentTrainings.reduce(
        (trainingsSum, training) => trainingsSum + training.count,
        0
      ),
    0
  );
  const avgPlacement = Math.round(
    mockLpkData.reduce((sum, lpk) => sum + lpk.placement, 0) / totalLpks
  );

  const provinces = [...new Set(mockLpkData.map((lpk) => lpk.province))];
  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-success">Excellent</Badge>;
      case "good":
        return <Badge variant="default">Good</Badge>;
      case "average":
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
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                ← Back
              </Button>
              <div className="text-white">
                <h1 className="text-2xl font-bold">Government Dashboard</h1>
                <p className="text-white/80">
                  Ministry of Manpower - National Monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                <Activity className="w-4 h-4 mr-2" />
                Live Data
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
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
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total LPK"
            value={totalLpks}
            icon={<Building2 className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Terverifikasi"
            value={`${verifiedLpks}/${totalLpks}`}
            icon={<MapPin className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Total Pelatihan"
            value={totalTrainings.toLocaleString("id-ID")}
            icon={<GraduationCap className="h-6 w-6" />}
            trend={{ value: 25, isPositive: true }}
          />
          <StatsCard
            title="Rata-rata Penempatan"
            value={`${avgPlacement}%`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="provincial">Provincial</TabsTrigger>
            <TabsTrigger value="national">National</TabsTrigger>
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
                      Real-time training data from all registered LPK/BLK
                      centers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          program: "Digital Skills Training",
                          progress: 78,
                          total: 25000,
                          completed: 19500,
                        },
                        {
                          program: "Manufacturing & Engineering",
                          progress: 65,
                          total: 18000,
                          completed: 11700,
                        },
                        {
                          program: "Service & Hospitality",
                          progress: 82,
                          total: 15000,
                          completed: 12300,
                        },
                        {
                          program: "Agriculture & Fishery",
                          progress: 71,
                          total: 12000,
                          completed: 8520,
                        },
                      ].map((program, index) => (
                        <div key={program.program} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {program.program}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {program.completed.toLocaleString()} /{" "}
                              {program.total.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={program.progress} className="h-3" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{program.progress}% completed</span>
                            <span>
                              {program.total - program.completed} remaining
                            </span>
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
                            <p className="text-sm font-medium">
                              {activity.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                          <Badge
                            variant={
                              activity.status === "completed"
                                ? "default"
                                : "secondary"
                            }
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
          <TabsContent value="list" className="space-y-6">
            {/* Filters Section */}
            <Card className="mb-8 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Filter & Pencarian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Cari LPK
                    </label>
                    <Input
                      placeholder="Nama LPK atau program pelatihan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Provinsi
                    </label>
                    <Select
                      value={selectedProvince}
                      onValueChange={setSelectedProvince}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Provinsi</SelectItem>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Status Verifikasi
                    </label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status verifikasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="verified">Terverifikasi</SelectItem>
                        <SelectItem value="unverified">
                          Belum Terverifikasi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Total: {filteredLpks.length} LPK
                  </Badge>
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Pencarian: "{searchTerm}"
                    </Badge>
                  )}
                  {selectedProvince !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      Provinsi: {selectedProvince}
                    </Badge>
                  )}
                  {selectedStatus !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      Status:{" "}
                      {selectedStatus === "verified"
                        ? "Terverifikasi"
                        : "Belum Terverifikasi"}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* LPK Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLpks.map((lpk) => (
                <LpkCard key={lpk.vin} lpk={lpk} />
              ))}
            </div>

            {filteredLpks.length === 0 && (
              <Card className="mt-8 shadow-card">
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Tidak ada LPK ditemukan
                  </h3>
                  <p className="text-muted-foreground">
                    Coba ubah kriteria pencarian atau filter untuk menemukan LPK
                    yang Anda cari.
                  </p>
                </CardContent>
              </Card>
            )}
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
                        <th className="text-left p-3">Job Seekers (Latest)</th>
                        <th className="text-left p-3">Placement Rate</th>
                        <th className="text-left p-3">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provincialData.map((province) => (
                        <tr
                          key={province.province}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="p-3 font-medium">
                            {province.province}
                          </td>

                          <td className="p-3">{province.trainingCenters}</td>

                          <td className="p-3">
                            {province.jobSeekers.toLocaleString("id-ID")}
                          </td>

                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span>{province.placementRate}%</span>
                              <Progress
                                value={province.placementRate}
                                className="w-16 h-2"
                              />
                              {/* optional: tampilkan YoY kecil */}
                              <span className="text-xs text-muted-foreground">
                                {province.growthRate === null
                                  ? "YoY —"
                                  : `YoY ${province.growthRate > 0 ? "+" : ""}${
                                      province.growthRate
                                    }%`}
                              </span>
                            </div>
                          </td>

                          <td className="p-3">
                            {getPerformanceBadge(province.performance)}
                          </td>
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
                          <span className="text-lg font-bold">
                            Rp {source.amount}B
                          </span>
                        </div>
                        <Progress value={source.percentage} className="h-3" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{source.percentage}% of total funding</span>
                          <span>{source.programs.length} programs</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {source.programs.map((program, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
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
                        <span className="text-sm">
                          Training Cost per Person
                        </span>
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

                  <Button
                    variant="success"
                    className="h-32 flex flex-col gap-2"
                  >
                    <Award className="w-8 h-8" />
                    Performance Dashboard
                  </Button>

                  <Button
                    variant="outline"
                    className="h-32 flex flex-col gap-2"
                  >
                    <Calendar className="w-8 h-8" />
                    Historical Data
                  </Button>

                  <Button
                    variant="outline"
                    className="h-32 flex flex-col gap-2"
                  >
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
