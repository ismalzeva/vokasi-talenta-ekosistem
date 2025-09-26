export interface Lpk {
  name: string;
  province: string;
  vin: string;
  trainingProgram: string;
  verificationStatus: "verified" | "unverified";
  realizationOfIndependentTrainings: RealizationOfIndependentTraining[];
  placement: 0;
}

export interface RealizationOfIndependentTraining {
  year: number;
  count: number;
}
