
export enum NenType {
  ENHANCER = 'ENHANCER',
  TRANSMUTER = 'TRANSMUTER',
  CONJURER = 'CONJURER',
  EMITTER = 'EMITTER',
  MANIPULATOR = 'MANIPULATOR',
  SPECIALIST = 'SPECIALIST'
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  region: string;
  traits: string[];
  bio: string;
  image: string;
  nenCompatibility: NenType[];
  needs: {
    environment: string;
    activities: string;
    pets: string;
    education: string;
    securityLevel: number;
  };
  verified: boolean;
}

export interface VerificationCheck {
  id: string;
  label: string;
  status: 'PENDING' | 'PASSED' | 'FAILED';
  details: string;
  timestamp?: string;
}

export interface FamilyProfile {
  id: string;
  name: string;
  verifiedStatus: 'Provisional' | 'Certified' | 'Pro Hunter' | 'REJECTED';
  step: number;
  verificationProgress: number;
  isFullyVerified: boolean;
  backgroundInfo: {
    bio: string;
    occupation: string;
    hasCriminalRecord: boolean;
    financialStability: string;
    householdSize: number;
    documentsUploaded: string[];
  };
  verificationChecks: VerificationCheck[];
  preferences: {
    ageRange: [number, number];
    nenCompatibility: NenType[];
    specialCare: boolean;
  };
}

export type ViewState = 'HOME' | 'DISCOVER' | 'VERIFY' | 'PREFERENCES' | 'CHILD_DETAIL' | 'INBOX';
