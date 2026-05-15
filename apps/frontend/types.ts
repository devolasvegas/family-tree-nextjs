export interface FamilyTreeMember {
  id: string;
  data: {
    gender: string;
    firstName: string;
    lastName: string;
    birthday: string;
    death: string;
    profession: string;
    avatar: string;
    notes: string;
    nationality: string;
  };
  rels: {
    parents: [string];
    spouses: [string];
    children: [string];
  };
}
