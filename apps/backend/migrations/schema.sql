-- Users table (for authorship tracking)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Locations (optional, reusable across people)
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,           -- e.g. "Toronto, Ontario, Canada"
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6)
);

-- Core person data
CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  birth_date DATE,
  death_date DATE,
  birth_location_id INT REFERENCES locations(id),
  death_location_id INT REFERENCES locations(id),
  notes TEXT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Relationship types (so we can add flexible relationship definitions)
CREATE TYPE relationship_type AS ENUM (
  'parent',
  'child',
  'spouse'
  -- 'adoptive_parent',
  -- 'adoptive_child',
  -- 'sibling',
  -- 'half_sibling'
);

-- Relationships between persons
CREATE TABLE relationships (
  id SERIAL PRIMARY KEY,
  person_id INT NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
  related_person_id INT NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
  type relationship_type NOT NULL
);

-- Sources (citations, documents, etc.)
-- CREATE TABLE sources (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   description TEXT,
--   url TEXT,
--   created_by INT REFERENCES users(id),
--   created_at TIMESTAMP DEFAULT NOW()
-- );

-- Link sources to persons (many-to-many)
-- CREATE TABLE person_sources (
--   person_id INT REFERENCES persons(id) ON DELETE CASCADE,
--   source_id INT REFERENCES sources(id) ON DELETE CASCADE,
--   PRIMARY KEY (person_id, source_id)
-- );
