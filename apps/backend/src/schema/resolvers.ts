import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// TODO: Add types to this file

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
        `SELECT p.* FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'parent'`,
        [person.id],
      );

      return rows.map(mapPersonRows);
    },

    async children(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.* FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'child'`,
        [person.id],
      );

      return rows.map(mapPersonRows);
    },

    async spouses(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.* FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'spouse'`,
        [person.id],
      );

      return rows.map(mapPersonRows);
    },
  },
};

export default resolvers;
