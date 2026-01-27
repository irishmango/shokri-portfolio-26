import enCommon from "./en/common.json";
import enProfile from "./en/profile.json";
import enCv from "./en/cv.json";
import deCommon from "./de/common.json";
import deProfile from "./de/profile.json";
import deCv from "./de/cv.json";

interface CvWorkExperience {
  title: string;
  company: string;
  duration: string;
  bullets: string[];
}

interface CvEducation {
  degree: string;
  institution: string;
  duration: string;
  bullets?: string[];
}

interface CvTranslations {
  sectionTitles: {
    summary: string;
    technicalSkills: string;
    workExperience: string;
    education: string;
    additionalInfo: string;
  };
  summary: string[];
  skillCategories: { label: string }[];
  workExperience: CvWorkExperience[];
  education: CvEducation[];
  additionalInfo: {
    languagesLabel: string;
    languages: string[];
    certificationsLabel: string;
    certifications: string[];
    interestsLabel: string;
    interests: string[];
  };
  viewCaseStudy: string;
}

export interface Translations {
  common: {
    nav: {
      profile: string;
      profileShort: string;
      caseStudies: string;
      caseStudiesShort: string;
      cv: string;
      cvShort: string;
      myWork: string;
      myWorkShort: string;
      contact: string;
      contactShort: string;
    };
    header: {
      role: string;
    };
    recruiterModal: {
      title: string;
      tldr: string;
      bullets: string[];
      contactButton: string;
    };
    recruiterButton: string;
  };
  profile: {
    content: string;
  };
  cv: CvTranslations;
}

const en: Translations = {
  common: enCommon,
  profile: enProfile,
  cv: enCv,
};

const de: Translations = {
  common: deCommon,
  profile: deProfile,
  cv: deCv,
};

export const translations: Record<"en" | "de", Translations> = {
  en,
  de,
};
