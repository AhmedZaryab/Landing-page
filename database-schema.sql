-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    occupation VARCHAR(255) NOT NULL,
    usage TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Optional: Create an index on name for searching
CREATE INDEX IF NOT EXISTS idx_waitlist_name ON waitlist(name);
