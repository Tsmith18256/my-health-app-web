CREATE OR REPLACE FUNCTION set_updated_at_date()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE 'plpgsql';

CREATE TABLE body_comp_entries (
    id                SERIAL        PRIMARY KEY,
    entry_date        DATE          NOT NULL,
    weight_in_grams   INTEGER       NOT NULL,
    created_at        TIMESTAMP     NOT NULL  DEFAULT NOW(),
    updated_at        TIMESTAMP     NOT NULL  DEFAULT NOW()
);

CREATE TRIGGER set_body_comp_entries_updated
  BEFORE UPDATE ON body_comp_entries
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at_date();
