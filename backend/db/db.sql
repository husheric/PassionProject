DROP DATABASE IF EXISTS passionproject;
CREATE DATABASE passionproject;

\c passionproject;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  password_digest VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR NOT NULL
);

CREATE TABLE markers (
  id SERIAL PRIMARY KEY,
  active BOOLEAN DEFAULT TRUE,
  reported_by INTEGER REFERENCES users (id),
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR CHECK (category='weather' OR category='crime' OR category='construction' OR category='other') NOT NULL,
  latitude VARCHAR NOT NULL,
  longitude VARCHAR NOT NULL,
  description VARCHAR
);

CREATE TABLE positive (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  marker_id INTEGER REFERENCES markers (id)
);

CREATE TABLE negative (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  marker_id INTEGER REFERENCES markers (id)
);

INSERT INTO users (password_digest, email, full_name)
  VALUES ('$2a$10$uvjiYmfuOODIuYOuSb5S/e6TCyLeT3QNGt60oe/IucOPJbPHDbmhq', 'ericliu93@gmail.com', 'Eric Liu');

-- INSERT INTO markers (reported_by, category, latitude, longitude, description)
--   VALUES (1, 'weather', '40.7469446', '-73.951878', 'fallen tree'),
--     (1, 'weather', '40.7529446', '-73.944878', 'big puddle'),
--     (1, 'construction', '40.7349446', '-73.936878', 'sidewalk is blocked off'),
--     (1, 'construction', '40.7379446', '-73.948878', 'building scaffolding'),
--     (1, 'crime', '40.7459446', '-73.953878', 'mugged yesterday'),
--     (1, 'crime', '40.8239597', '-73.941878', 'stranger danger'),
--     (1, 'other', '40.8329446', '-73.944878', 'a lot of rats'),
--     (1, 'other', '40.8349446', '-73.936878', 'road kill'),
--     (1, 'other', '40.8179446', '-73.948878', 'i saw a dinosaur roaming around'),
--     (1, 'other', '40.8159446', '-73.953878', 'open manhole');