CREATE TABLE artwork (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    image TEXT NOT NULL,
    title TEXT NOT NULL,
    artist_name TEXT DEFAULT 'Unknown',
    price MONEY DEFAULT 0,
    description TEXT NOT NULL
);