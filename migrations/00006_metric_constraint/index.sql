ALTER TABLE user_profiles
  ADD CONSTRAINT length_system_values CHECK (length_system in (
    'imperial',
    'metric'
  ));

ALTER TABLE user_profiles
  ADD CONSTRAINT weight_system_values CHECK (weight_system in (
    'imperial',
    'metric'
  ));
