ALTER TABLE user_profiles
  ADD length_system   VARCHAR(255)  NOT NULL  DEFAULT 'imperial';

ALTER TABLE user_profiles
  ADD weight_system   VARCHAR(255)  NOT NULL  DEFAULT 'imperial';
