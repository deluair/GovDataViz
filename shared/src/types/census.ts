// U.S. Census Bureau API Types

export interface CensusApiParams {
  key?: string;
  get: string;
  for?: string;
  in?: string;
  ucgid?: string;
  time?: string;
}

export interface CensusVariable {
  name: string;
  label: string;
  concept: string;
  predicateType: string;
  group: string;
  limit: number;
  attributes?: string;
}

export interface CensusGeography {
  name: string;
  geoLevelId: number;
  referenceDate: string;
  requiresOf: string[];
  wildcard: string[];
  optionalWithWCFor: string[];
}

export interface CensusDataset {
  title: string;
  description: string;
  c_vintage: number;
  c_dataset: string[];
  c_geographyLink: string;
  c_variablesLink: string;
  c_examplesLink: string;
  c_groupsLink: string;
  c_valuesLink: string;
  c_tagsLink: string;
}

// Common Census API Endpoints
export const CENSUS_DATASETS = {
  // American Community Survey
  ACS_1_YEAR: 'acs/acs1',
  ACS_5_YEAR: 'acs/acs5',
  ACS_1_YEAR_SUBJECT: 'acs/acs1/subject',
  ACS_5_YEAR_SUBJECT: 'acs/acs5/subject',
  
  // Decennial Census
  DECENNIAL_2020: 'dec/pl',
  DECENNIAL_2010: 'dec/sf1',
  
  // Economic Census
  ECONOMIC_CENSUS: 'ecnbasic',
  
  // Population Estimates
  POPULATION_ESTIMATES: 'pep/population',
  
  // Business Patterns
  COUNTY_BUSINESS_PATTERNS: 'cbp',
  
  // International Trade
  INTERNATIONAL_TRADE: 'timeseries/intltrade/exports/hs',
  
  // Construction and Housing
  BUILDING_PERMITS: 'eits/bps',
  NEW_RESIDENTIAL_CONSTRUCTION: 'eits/nrc'
} as const;

// Common Census Variables
export const CENSUS_VARIABLES = {
  // Population
  TOTAL_POPULATION: 'B01003_001E',
  MALE_POPULATION: 'B01001_002E',
  FEMALE_POPULATION: 'B01001_026E',
  
  // Demographics
  MEDIAN_AGE: 'B01002_001E',
  WHITE_ALONE: 'B02001_002E',
  BLACK_ALONE: 'B02001_003E',
  ASIAN_ALONE: 'B02001_005E',
  HISPANIC_LATINO: 'B03003_003E',
  
  // Housing
  TOTAL_HOUSING_UNITS: 'B25001_001E',
  OCCUPIED_HOUSING_UNITS: 'B25003_001E',
  OWNER_OCCUPIED: 'B25003_002E',
  RENTER_OCCUPIED: 'B25003_003E',
  MEDIAN_HOME_VALUE: 'B25077_001E',
  MEDIAN_RENT: 'B25064_001E',
  
  // Income
  MEDIAN_HOUSEHOLD_INCOME: 'B19013_001E',
  PER_CAPITA_INCOME: 'B19301_001E',
  POVERTY_RATE: 'B17001_002E',
  
  // Education
  BACHELOR_DEGREE_OR_HIGHER: 'B15003_022E',
  HIGH_SCHOOL_GRADUATE: 'B15003_017E',
  
  // Employment
  LABOR_FORCE: 'B23025_002E',
  EMPLOYED: 'B23025_004E',
  UNEMPLOYED: 'B23025_005E'
} as const;

// Geographic Levels
export const CENSUS_GEOGRAPHIES = {
  US: 'us:*',
  STATE: 'state:*',
  COUNTY: 'county:*',
  TRACT: 'tract:*',
  BLOCK_GROUP: 'block group:*',
  PLACE: 'place:*',
  METROPOLITAN_AREA: 'metropolitan statistical area/micropolitan statistical area:*',
  CONGRESSIONAL_DISTRICT: 'congressional district:*',
  SCHOOL_DISTRICT: 'school district (elementary):*',
  ZIP_CODE: 'zip code tabulation area:*'
} as const; 