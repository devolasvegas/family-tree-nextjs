import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const resolvers = {
  Person: {
    // All these are computed from the relationships table

    async parents(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.* FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'child'`,
        [person.id]
      );
      return rows;
    },

    async children(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.* FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'parent'`,
        [person.id]
      );
      return rows;
    },

    async spouses(person, _, __) {
      const { rows } = await pool.query(
        `SELECT p.* FROM persons p
         JOIN relationships r ON p.id = r.related_person_id
         WHERE r.person_id = $1 AND r.type = 'spouse'`,
        [person.id]
      );
      return rows;
    },
  },
};

export default resolvers;
