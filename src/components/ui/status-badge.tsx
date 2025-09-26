import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  verified: "verified" | "unverified";
  className?: string;
}

export function StatusBadge({ verified, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
        verified === "verified"
          ? "bg-success/10 text-success border border-success/20"
          : "bg-destructive/10 text-destructive border border-destructive/20",
        className
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full mr-2",
          verified === "verified" ? "bg-success" : "bg-destructive"
        )}
      />
      {verified === "verified" ? "TerAkredasi" : "Belum TerAkredasi"}
    </span>
  );
}
