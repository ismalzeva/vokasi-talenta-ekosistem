import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Lpk } from "@/pages/types";

const sortByYearAsc = (arr: { year: number; count: number }[]) =>
  [...arr].sort((a, b) => a.year - b.year);

const getLatestTwo = (arr: { year: number; count: number }[]) => {
  const s = sortByYearAsc(arr);
  const len = s.length;
  return {
    latest: len > 0 ? s[len - 1] : undefined,
    prev: len > 1 ? s[len - 2] : undefined,
  };
};

const formatPct = (v: number) => {
  // 1 desimal & handle -0.0
  let n = Number((Math.round(v * 10) / 10).toFixed(1));
  if (Object.is(n, -0)) n = 0;
  return n;
};

interface LpkComparisonTableProps {
  currentLpk: Lpk;
  comparisonLpks: Lpk[];
}

export function LpkComparisonTable({
  currentLpk,
  comparisonLpks,
}: LpkComparisonTableProps) {
  const allLpks = [currentLpk, ...(comparisonLpks ?? [])];

  const getTotalTrainings = (lpk: Lpk) =>
    lpk.realizationOfIndependentTrainings.reduce((sum, t) => sum + t.count, 0);

  const getLatestYearTraining = (lpk: Lpk) => {
    const { latest } = getLatestTwo(lpk.realizationOfIndependentTrainings);
    return latest ?? { year: undefined, count: 0 };
  };

  const getGrowthYoY = (lpk: Lpk) => {
    const { latest, prev } = getLatestTwo(
      lpk.realizationOfIndependentTrainings
    );
    if (!latest || !prev) {
      return {
        delta: 0,
        pct: null as number | null,
        fromYear: prev?.year,
        toYear: latest?.year,
      };
    }
    const delta = latest.count - prev.count;
    const pct = prev.count === 0 ? null : (delta / prev.count) * 100;

    return { delta, pct, fromYear: prev.year, toYear: latest.year };
  };

  const renderTrendIcon = (pct: number | null) => {
    if (pct === null)
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (pct > 5) return <TrendingUp className="h-4 w-4 text-success" />;
    if (pct < -5) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const trendClass = (pct: number | null) =>
    pct === null
      ? "text-muted-foreground"
      : pct > 5
      ? "text-success"
      : pct < -5
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Perbandingan dengan LPK Lain
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Nama LPK</TableHead>
                <TableHead className="font-semibold">Provinsi</TableHead>
                <TableHead className="font-semibold">Program</TableHead>
                <TableHead className="font-semibold text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Total Peserta (All-time)
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Tahun Terbaru
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Trend YoY
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Penempatan
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allLpks.map((lpk, index) => {
                const isCurrentLpk = index === 0;

                const latest = getLatestYearTraining(lpk);
                const total = getTotalTrainings(lpk);
                const { delta, pct, fromYear } = getGrowthYoY(lpk);

                const pctLabel =
                  pct === null
                    ? "—"
                    : `${pct > 0 ? "+" : ""}${formatPct(pct)}%`;
                const deltaLabel =
                  fromYear === undefined
                    ? ""
                    : `(${delta > 0 ? "+" : ""}${delta.toLocaleString(
                        "id-ID"
                      )})`;

                return (
                  <TableRow
                    key={lpk.vin}
                    className={
                      isCurrentLpk
                        ? "bg-primary/5 border-l-4 border-l-primary"
                        : ""
                    }
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isCurrentLpk && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                        <span
                          className={
                            isCurrentLpk ? "font-semibold text-primary" : ""
                          }
                        >
                          {lpk.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {lpk.province}
                    </TableCell>

                    <TableCell className="text-sm">
                      {lpk.trainingProgram}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant={
                          lpk.verificationStatus === "verified"
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                        title={lpk.verificationStatus}
                      >
                        {lpk.verificationStatus === "verified" ? "✓" : "✗"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {total.toLocaleString("id-ID")}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      <div className="flex flex-col items-end">
                        <span>{latest.count.toLocaleString("id-ID")}</span>
                        {latest.year !== undefined && (
                          <span className="text-[10px] text-muted-foreground">
                            ({latest.year})
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {renderTrendIcon(pct)}
                        <span
                          className={`text-xs font-medium ${trendClass(pct)}`}
                        >
                          {pctLabel} {deltaLabel}
                          {fromYear !== undefined && (
                            <span className="text-[10px] text-muted-foreground">
                              {" "}
                              dari {fromYear}
                            </span>
                          )}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <span
                        className={
                          lpk.placement >= 80
                            ? "text-success font-semibold"
                            : lpk.placement >= 60
                            ? "text-primary font-medium"
                            : "text-destructive"
                        }
                      >
                        {Number(lpk.placement || 0).toLocaleString("id-ID")}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
