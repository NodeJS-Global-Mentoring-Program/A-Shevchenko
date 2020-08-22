--
-- Table structure for table "users"
--

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "login" VARCHAR(20) NOT NULL,
  "password" VARCHAR(40) NOT NULL,
  "age" INTEGER NOT NULL,
  "isDeleted" BOOLEAN DEFAULT 'false'
);

--
-- Table structure for table "users_groups"
--

CREATE TABLE "users_groups" (
  "id" SERIAL PRIMARY KEY,
  "uId" INTEGER REFERENCES users (id) ON DELETE CASCADE,
  "gId" INTEGER REFERENCES groups (id) ON DELETE CASCADE
);