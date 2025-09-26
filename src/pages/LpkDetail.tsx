import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ArrowLeft,
  Building2,
  MapPin,
  GraduationCap,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Award,
} from "lucide-react";
import { LpkChart } from "@/components/ui/lpk-chart";
import { LpkComparisonTable } from "@/components/ui/lpk-comparison-table";
import { mockLpkData } from "./data";
import { RealizationOfIndependentTraining } from "./types";
import { useMemo } from "react";

export default function LpkDetail() {
  const { id } = useParams();
  const lpk = mockLpkData.find((l) => l.vin === id);
  const sorted = useMemo(
    () =>
      [...lpk.realizationOfIndependentTrainings].sort(
        (a, b) => b.count - a.count
      ),
    [lpk.realizationOfIndependentTrainings]
  );

  console.log("👻 ~ LpkDetail ~ sorted:", sorted);
  if (!lpk) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">LPK Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-4">
              LPK yang Anda cari tidak ada dalam sistem.
            </p>
            <Button asChild>
              <Link to="/lpk">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Daftar LPK
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalTrainings = lpk.realizationOfIndependentTrainings.reduce(
    (sum, training) => sum + training.count,
    0
  );
  const latestYear = Math.max(
    ...lpk.realizationOfIndependentTrainings.map((t) => t.year)
  );
  const latestCount =
    lpk.realizationOfIndependentTrainings.find((t) => t.year === latestYear)
      ?.count || 0;
  const previousYear = latestYear - 1;
  const previousCount =
    lpk.realizationOfIndependentTrainings.find((t) => t.year === previousYear)
      ?.count || 0;
  const growthRate =
    previousCount > 0
      ? ((latestCount - previousCount) / previousCount) * 100
      : 0;

  // Get similar LPKs for comparison (same province or same training program, excluding current)
  const comparisonLpks = mockLpkData
    .filter(
      (l) =>
        l.vin !== lpk.vin &&
        (l.province === lpk.province ||
          l.trainingProgram === lpk.trainingProgram)
    )
    .slice(0, 3);
  const toCumulative = (
    arr: RealizationOfIndependentTraining[]
  ): RealizationOfIndependentTraining[] => {
    let run = 0;
    return arr
      .sort((a, b) => a.year - b.year)
      .map(({ year, count }) => ({ year, count: (run += count) }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-hero py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              asChild
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Link to="/lpk">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Daftar
              </Link>
            </Button>

            <StatusBadge
              verified={lpk.verificationStatus}
              className="bg-white/10 backdrop-blur-sm"
            />
          </div>

          <div className="mt-6">
            <h1 className="text-4xl font-bold text-white mb-2">{lpk.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {lpk.province}
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                {lpk.trainingProgram}
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                VIN: {lpk.vin}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Peserta Pelatihan"
            value={totalTrainings.toLocaleString("id-ID")}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: growthRate, isPositive: growthRate > 0 }}
          />
          <StatsCard
            title="Peserta Tahun Ini"
            value={latestCount.toLocaleString("id-ID")}
            icon={<Calendar className="h-6 w-6" />}
            trend={{ value: growthRate, isPositive: growthRate > 0 }}
          />
          <StatsCard
            title="Tingkat Penempatan"
            value={`${lpk.placement}%`}
            icon={<Award className="h-6 w-6" />}
          />
          <StatsCard
            title="Tahun Beroperasi"
            value={lpk.realizationOfIndependentTrainings.length}
            icon={<TrendingUp className="h-6 w-6" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LpkChart
            data={[...lpk.realizationOfIndependentTrainings].sort(
              (a, b) => a.year - b.year
            )}
            title="Tren Realisasi Pelatihan Mandiri"
            type="bar"
          />
          <LpkChart
            data={sorted}
            title="Distribusi Peserta per Tahun"
            type="line"
          />
        </div>

        {/* Area Chart */}
        <div className="mb-8">
          <LpkChart
            data={toCumulative(lpk.realizationOfIndependentTrainings)}
            title="Pertumbuhan Kumulatif Peserta Pelatihan"
            type="area"
          />
        </div>

        {/* Detailed Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-1 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informasi Detail
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Nama LPK
                </label>
                <p className="text-base font-medium text-foreground">
                  {lpk.name}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Provinsi
                </label>
                <p className="text-base text-foreground">{lpk.province}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  VIN (Vendor Identification Number)
                </label>
                <p className="text-base text-foreground font-mono">{lpk.vin}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Program Pelatihan
                </label>
                <Badge variant="secondary" className="mt-1">
                  {lpk.trainingProgram}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status Verifikasi
                </label>
                <div className="mt-1">
                  <StatusBadge verified={lpk.verificationStatus} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tingkat Penempatan Kerja
                </label>
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-success h-2 rounded-full transition-all duration-500"
                        style={{ width: `${lpk.placement}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-success">
                      {lpk.placement}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Summary */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Ringkasan Pelatihan per Tahun
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const data = lpk.realizationOfIndependentTrainings ?? [];

                  // sort DESC by year, tanpa mutate
                  const sorted = [...data].sort((a, b) => b.year - a.year);

                  return sorted.map((training, index) => {
                    const isLatest = index === 0;
                    const prev = sorted[index + 1]; // tahun sebelumnya dalam urutan DESC
                    const hasPrev = !!prev;

                    const delta = hasPrev ? training.count - prev.count : 0;
                    const pct =
                      hasPrev && prev.count !== 0
                        ? (delta / prev.count) * 100
                        : hasPrev
                        ? null // prev ada tapi 0 → gak bisa hitung %
                        : null;

                    const pctDisplay =
                      pct === null
                        ? "—"
                        : (() => {
                            // bulatkan 1 desimal dan handle -0.0
                            let v = Number(
                              (Math.round(pct * 10) / 10).toFixed(1)
                            );
                            if (Object.is(v, -0)) v = 0;
                            return `${delta > 0 ? "+" : ""}${v}%`;
                          })();

                    const deltaDisplay = hasPrev
                      ? `${delta > 0 ? "+" : ""}${delta.toLocaleString(
                          "id-ID"
                        )} peserta`
                      : "";

                    const growthClass = !hasPrev
                      ? "text-muted-foreground"
                      : delta > 0
                      ? "text-success"
                      : delta < 0
                      ? "text-destructive"
                      : "text-muted-foreground";

                    return (
                      <div
                        key={training.year}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          isLatest
                            ? "bg-primary/5 border-primary/20"
                            : "bg-muted/30 border-border"
                        }`}
                      >
                        <div>
                          <p
                            className={`font-semibold ${
                              isLatest ? "text-primary" : "text-foreground"
                            }`}
                          >
                            Tahun {training.year}
                          </p>

                          {hasPrev && (
                            <p className={`text-xs ${growthClass}`}>
                              {deltaDisplay} ({pctDisplay}) dari {prev.year}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-2xl font-bold ${
                              isLatest ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {training.count.toLocaleString("id-ID")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            peserta
                          </p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        {comparisonLpks.length > 0 && (
          <LpkComparisonTable
            currentLpk={lpk}
            comparisonLpks={comparisonLpks}
          />
        )}
      </div>
    </div>
  );
}
