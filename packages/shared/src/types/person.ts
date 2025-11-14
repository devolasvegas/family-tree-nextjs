import { Gender } from "./gender";

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  deathDate: string;
}
