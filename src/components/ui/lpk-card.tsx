import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "./status-badge";
import { Lpk } from "@/pages/types";

interface LpkCardProps {
  lpk: Lpk;
}

export function LpkCard({ lpk }: LpkCardProps) {
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

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {lpk.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {lpk.province}
            </div>
          </div>
          <StatusBadge verified={lpk.verificationStatus} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{lpk.trainingProgram}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Total Pelatihan
                </span>
              </div>
              <p className="text-lg font-bold text-primary">{totalTrainings}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Penempatan Kerja
                </span>
              </div>
              <p className="text-lg font-bold text-success">
                {Math.round((lpk.placement / 3506) * 100)}%
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>VIN: {lpk.vin}</span>
              <span>
                {latestYear}: {latestCount} peserta
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border">
              <Badge variant="secondary" className="text-xs">
                {lpk.realizationOfIndependentTrainings.length} tahun data
              </Badge>

              <Button asChild variant="outline" size="sm" className="group/btn">
                <Link to={`/lpk/${lpk.vin}`}>
                  <Eye className="h-4 w-4 mr-2 group-hover/btn:text-primary transition-colors" />
                  Detail
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
