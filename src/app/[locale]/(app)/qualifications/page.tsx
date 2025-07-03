import { QualificationManager } from '@/components/dashboard/qualification-manager';
import type { Qualification } from '@/lib/types';

// Mock data
const qualifications: Qualification[] = [
  { 
    id: 'q1', 
    name: 'Certified Cloud Practitioner', 
    subjects: [
      { id: 's1', name: 'Cloud Concepts' },
      { id: 's2', name: 'Security and Compliance' },
      { id: 's3', name: 'Technology' },
      { id: 's4', name: 'Billing and Pricing' },
    ]
  },
  { 
    id: 'q2', 
    name: 'Project Management Professional', 
    subjects: [
      { id: 's5', name: 'Initiating' },
      { id: 's6', name: 'Planning' },
      { id: 's7', name: 'Executing' },
      { id: 's8', name: 'Monitoring and Controlling' },
      { id: 's9', name: 'Closing' },
    ]
  },
  { 
    id: 'q3', 
    name: 'Certified Information Systems Security Professional', 
    subjects: [
      { id: 's10', name: 'Security and Risk Management' },
      { id: 's11', name: 'Asset Security' },
      { id: 's12', name: 'Security Architecture and Engineering' },
    ]
  },
];

export default function QualificationsPage() {
  return (
    <div>
      <QualificationManager initialQualifications={qualifications} />
    </div>
  );
}
