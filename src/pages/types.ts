export interface Lpk {
  name: string;
  province: string;
  vin: string;
  trainingProgram: string;
  verificationStatus: "verified" | "unverified";
  realizationOfIndependentTrainings: RealizationOfIndependentTraining[];
  placement: number;
}

export interface RealizationOfIndependentTraining {
  year: number;
  count: number;
}
