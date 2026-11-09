// one item per disease: its name and the number of laboratory-acquired infections, 1970–2021
// source: the course's "Get full dataset" (Scales module project), ordered by count, smallest first
export type DataItem = {
  name: string;
  count: number;
};

export const data: DataItem[] = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];
