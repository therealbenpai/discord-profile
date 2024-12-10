CREATE TABLE IF NOT EXISTS "profiles" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,

    PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "pending" (
    "id" INTEGER NOT NULL UNIQUE,
    "state" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    PRIMARY KEY ("id" AUTOINCREMENT)
)

