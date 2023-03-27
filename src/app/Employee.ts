export interface RootObject {
    _embedded: Embedded;
    _links: Links2;
    page: Page;
  }
  
 export interface Page {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
  
export interface Links2 {
    first: Self;
    self: Self2;
    next: Self;
    last: Self;
    profile: Self;
  }
  
export interface Self2 {
    href: string;
    templated: boolean;
  }
  
export interface Embedded {
    employees: Employee[];
  }
  
export interface Employee {
    id: number;
    birthDate: string;
    firstName: string;
    lastName: string;
    gender: string;
    hireDate: string;
    _links: Links;
  }
  
export interface Links {
    self: Self;
    employee: Self;
  }
  
export interface Self {
    href: string;
  }