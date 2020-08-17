--
-- Table structure for table "users"
--

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "login" varchar(20) NOT NULL,
  "password" varchar(20) NOT NULL,
  "age" int NOT NULL,
  "isDeleted" boolean DEFAULT 'false'
);

--
-- Dumping data for table "users"
--

INSERT INTO "users" ("login", "password", "age") VALUES
('User1', '111', 10),
('User2', '222', 20),
('User3', '333', 30),
('User4', '444', 40),
('User5', '555', 50);
