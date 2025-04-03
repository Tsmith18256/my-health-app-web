CREATE TABLE user_profiles (
    email_address     VARCHAR(255)  PRIMARY KEY,
    birthday          DATE          NOT NULL,
    sex               CHAR(1)       NOT NULL,
    height_in_mm      INTEGER       NOT NULL
);
