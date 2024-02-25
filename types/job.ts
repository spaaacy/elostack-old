export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salaryRange: string;
    description: string;
    isSaved: boolean; // Indicates whether the job is saved by the user
  }
  