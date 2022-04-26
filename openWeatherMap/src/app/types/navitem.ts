export interface NavItem {
    icon: string;
    name: string;
    url: string;
    children?: NavItem[];
  }