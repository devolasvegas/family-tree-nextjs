import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const mapPersonRows = (row) => ({
  id: row.id,
  firstName: row.first_name,
  lastName: row.last_name,
  gender: row.gender,
  birthDate: row.birth_date,
  deathDate: row.death_date,
  birthLocation: row.birthLocation,
  deathLocation: row.deathLocation,
  notes: row.notes,
  createdBy: row.created_by,
  createdAt: row.created_at,
  parents: row.parents,
  children: row.children,
  spouses: row.spouses,
});

const mapFamilyTreeRows = (row) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  createdBy: row.created_by,
  createdAt: row.created_at,
  members: row.members,
});

const mapFamilyTreeMemberDataRows = (row) => ({
  firstName: row.first_name,
  lastName: row.last_name,
  gender: row.gender === "MALE" ? "M" : "F",
  birthday: row.birth_date,
  death: row.death_date,
  notes: row.notes,
});

const resolvers = {
  Query: {
    async person(_, { id }) {
      const { rows } = await pool.query("SELECT * FROM persons WHERE id = $1", [
        id,
      ]);
      return mapPersonRows(rows[0]);
    },

    async persons() {
      const { rows } = await pool.query("SELECT * FROM persons");
      return rows.map(mapPersonRows);
    },

    async familyTreesByUser(_, { id }) {
      const { rows } = await pool.query(
        "SELECT * FROM family_trees WHERE created_by = $1",
        [id],
      );
      return rows.map(mapFamilyTreeRows);
    },
  },

  FamilyTreeMember: {
    async id(memberId, _, __) {
      const { rows } = await pool.query(
        "SELECT id FROM persons WHERE id = $1",
        [memberId],
      );
      return rows[0]?.id || null;
    },

    async data(memberId, _, __) {
      const { rows } = await pool.query("SELECT * FROM persons WHERE id = $1", [
        memberId,
      ]);
      return mapFamilyTreeMemberDataRows(rows[0]);
    },

    async rels(memberId, _, __) {
      const { rows } = await pool.query(
        `SELECT r.type, p.id FROM relationships r
         JOIN persons p ON r.related_person_id = p.id
         WHERE r.person_id = $1`,
        [memberId],
      );

      const rels = { parents: [], children: [], spouses: [] };
      rows.forEach((row) => {
        if (row.type === "parent") rels.parents.push(row.id);
        else if (row.type === "child") rels.children.push(row.id);
        else if (row.type === "spouse") rels.spouses.push(row.id);
      });

      return rels;
    },
  },

  Person: {
    // All these are computed from the relationships table

    async birthLocation(person, _, __) {
      const { rows } = await pool.query(
        `SELECT l.* from locations l
         JOIN persons p ON p.birth_location_id = l.id
         WHERE p.id = $1
        `,
        [person.id],
      );

      return rows[0];
    },

    async deathLocation(person, _, __) {
      const { rows } = await pool.query(
        `SELECT l.* from locations l
         JOIN persons p ON p.death_location_id = l.id
         WHERE p.id = $1
        `,
        [person.id],
      );

      return rows[0];
    },

    async parents(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.id FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'parent'`,
        [person.id],
      );

      return rows.map((row) => row.id);
    },

    async children(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.id FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'child'`,
        [person.id],
      );

      return rows.map((row) => row.id);
    },

    async spouses(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.id FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'spouse'`,
        [person.id],
      );

      return rows.map((row) => row.id);
    },
  },
};

export default resolvers;
