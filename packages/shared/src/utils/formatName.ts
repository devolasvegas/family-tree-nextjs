import { Person } from "../types/person";

export function formatPersonName(person: Person) {
  return `${person.firstName} ${person.lastName}`.trim();
}
