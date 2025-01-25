-- Database Schema Export
-- Generated on 2025-01-25

-- Create tables in correct order (respecting foreign key dependencies)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    email TEXT,
    created_at TEXT
);

CREATE TABLE IF NOT EXISTS puppies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age TEXT,
    color TEXT,
    description TEXT,
    image_url TEXT,
    available BOOLEAN DEFAULT TRUE,
    created_at TEXT,
    breed TEXT,
    gender TEXT
);

CREATE TABLE IF NOT EXISTS lineage_relationships (
    id SERIAL PRIMARY KEY,
    puppy_id INTEGER REFERENCES puppies(id),
    parent_id INTEGER REFERENCES puppies(id),
    relationship_type TEXT NOT NULL,
    created_at TEXT
);

CREATE TABLE IF NOT EXISTS _drizzle_migrations (
    id SERIAL PRIMARY KEY,
    hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

-- Database Data Export
-- Users data
INSERT INTO users (id, username, password, is_admin, email, created_at) 
VALUES (7, 'admin', '$2a$10$kv0HSaKf.P5HGVHt2aYVoOcsdVuEeYRh8Gvw.OO4LeZxcsugsFKaC', true, 'admin@starsdogs.com', '2025-01-24 19:00:12.882162+00');

-- Note: Migration data is not included as it's empty

-- Note: No data found for puppies table
-- Note: No data found for lineage_relationships table