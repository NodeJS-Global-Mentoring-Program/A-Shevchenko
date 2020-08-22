--
-- Table structure for table "permissions"
--

CREATE TABLE "permissions" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

--
-- Table structure for table "groups"
--

CREATE TABLE "groups" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

--
-- Table structure for table "groups_permissions"
--

CREATE TABLE "groups_permissions" (
  "id" SERIAL PRIMARY KEY,
  "gId" INTEGER REFERENCES groups (id) ON DELETE CASCADE,
  "pId" INTEGER REFERENCES permissions (id) ON DELETE CASCADE
);

--
-- Dumping data for table "permissions"
--

INSERT INTO "permissions" ("name") VALUES
('READ'),
('WRITE'),
('DELETE'),
('SHARE'),
('UPLOAD_FILES');