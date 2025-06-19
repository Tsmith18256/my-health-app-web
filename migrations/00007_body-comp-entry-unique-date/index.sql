ALTER TABLE body_comp_entries
  DROP CONSTRAINT body_comp_entries_pkey;

DELETE FROM body_comp_entries
  WHERE ctid IN (
    SELECT ctid FROM (
      SELECT ctid, ROW_NUMBER() OVER (
        PARTITION BY entry_date, user_email
          ORDER BY updated_at DESC
      ) AS rn
      FROM body_comp_entries
    ) t
      WHERE t.rn > 1
);

ALTER TABLE body_comp_entries
  ADD PRIMARY KEY (entry_date, user_email);
