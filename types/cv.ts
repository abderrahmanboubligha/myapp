export interface CVData {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  profileImage: string | null;
  about: string;
  experiences: {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string;
  }[];
  education: {
    university: string;
    degree: string;
    period: string;
  }[];
  expertise: string[];
  languages: string[];
  references: {
    name: string;
    position: string;
    phone: string;
    email: string;
  }[];
  includeHobbies: boolean;
  hobbies: string[];
}