CREATE TABLE collections (
    collection_id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE
    code_word TEXT NOT NULL,
);

CREATE TABLE collection_items (
    item_id UUID PRIMARY KEY,
    collection_id uuid NOT NULL,
    type VARCHAR(255) NOT NULL,
    title TEXT NOT NULL,
    important BOOLEAN NOT NULL,
    reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(collection_id)
);