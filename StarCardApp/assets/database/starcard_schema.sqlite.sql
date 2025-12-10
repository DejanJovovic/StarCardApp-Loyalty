
PRAGMA foreign_keys = OFF;

CREATE TABLE categories (
  cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
  cat_title TEXT NOT NULL DEFAULT '',
  cat_top TEXT NOT NULL DEFAULT '0',
  cat_image TEXT NOT NULL DEFAULT ''
);

CREATE TABLE checkers (
  checker_id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_code TEXT NOT NULL,
  user_name TEXT,
  user_fullname TEXT NOT NULL,
  user_pass TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE click_program (
  click_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  click_date TEXT NOT NULL,
  click_ip TEXT NOT NULL
);

CREATE TABLE company (
  company_id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_code TEXT NOT NULL,
  company_title TEXT NOT NULL DEFAULT '',
  company_logo TEXT NOT NULL DEFAULT '',
  company_cover TEXT NOT NULL DEFAULT '',
  company_date TEXT NOT NULL,
  company_selector TEXT NOT NULL,
  company_validator TEXT NOT NULL,
  company_status TEXT NOT NULL DEFAULT '',
  company_address TEXT NOT NULL DEFAULT '',
  company_country TEXT NOT NULL DEFAULT '',
  company_category TEXT NOT NULL DEFAULT '',
  company_email TEXT NOT NULL DEFAULT '',
  company_phone TEXT NOT NULL DEFAULT '',
  company_description TEXT NOT NULL
);

CREATE TABLE company_admin (
  admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_code TEXT NOT NULL,
  user_code TEXT NOT NULL,
  admin_add TEXT NOT NULL,
  admin_date TEXT NOT NULL
);

CREATE TABLE company_feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  program_code TEXT,
  company_code TEXT,
  comment TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE company_location (
  location_id INTEGER PRIMARY KEY AUTOINCREMENT,
  location_code TEXT NOT NULL,
  company_code TEXT NOT NULL,
  location_title TEXT NOT NULL DEFAULT '',
  location_selector TEXT NOT NULL,
  location_validator TEXT NOT NULL,
  location_status TEXT NOT NULL DEFAULT '',
  location_address TEXT NOT NULL DEFAULT '',
  location_email TEXT NOT NULL DEFAULT '',
  location_phone TEXT NOT NULL DEFAULT '',
  location_description TEXT NOT NULL
);

CREATE TABLE company_security (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  security_code TEXT NOT NULL,
  company_code TEXT NOT NULL
);

CREATE TABLE company_socials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_code TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  socials TEXT
);

CREATE TABLE country (
  country_id INTEGER PRIMARY KEY,
  country_name TEXT NOT NULL,
  country_continent TEXT NOT NULL,
  country_tax TEXT,
  country_delivery TEXT
);

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_code TEXT NOT NULL,
  customer_country TEXT DEFAULT '',
  customer_city TEXT DEFAULT '',
  customer_contact TEXT DEFAULT '',
  customer_address TEXT DEFAULT '',
  customer_image TEXT,
  selector TEXT NOT NULL,
  validator TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE insecure_link (
  link_id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_date TEXT NOT NULL,
  link_ip TEXT NOT NULL,
  link TEXT NOT NULL
);

CREATE TABLE locations (
  location_id INTEGER PRIMARY KEY AUTOINCREMENT,
  location_name TEXT NOT NULL,
  location_address TEXT NOT NULL,
  location_coords TEXT NOT NULL,
  location_push_mess TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loyalty_cards (
  loyalty_id INTEGER PRIMARY KEY AUTOINCREMENT,
  loyalty_code TEXT NOT NULL,
  company_code TEXT NOT NULL,
  loyalty_selector TEXT NOT NULL,
  loyalty_validator TEXT NOT NULL,
  loyalty_link TEXT NOT NULL,
  user_code TEXT NOT NULL,
  loyalty_date TEXT NOT NULL,
  loyalty_use TEXT NOT NULL
);

CREATE TABLE program_cards (
  program_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL UNIQUE,
  company_code TEXT NOT NULL,
  program_selector TEXT NOT NULL,
  program_validator TEXT NOT NULL,
  program_link TEXT NOT NULL,
  program_title TEXT NOT NULL DEFAULT '',
  program_description TEXT,
  program_date TEXT,
  date_start TEXT,
  time_start TEXT,
  date_end TEXT,
  time_end TEXT,
  program_status TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE program_color (
  color_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  card_background TEXT NOT NULL DEFAULT '',
  card_background_hex TEXT,
  card_text TEXT,
  strip_background TEXT NOT NULL DEFAULT '',
  stamped_image TEXT NOT NULL DEFAULT '',
  unstamped_image TEXT NOT NULL DEFAULT '',
  stamp_text_color TEXT,
  reward_background TEXT NOT NULL DEFAULT '',
  stamp_text_color_hex TEXT,
  active_stamp_color TEXT,
  active_stamp_color_hex TEXT,
  inactive_stamp_color TEXT,
  inactive_stamp_color_hex TEXT,
  stamp_background_color TEXT,
  stamp_background_color_hex TEXT
);

CREATE TABLE program_images (
  images_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  program_icon TEXT NOT NULL DEFAULT '',
  program_logo TEXT NOT NULL DEFAULT '',
  active_select_image_url TEXT,
  inactive_select_image_url TEXT
);

CREATE TABLE program_information (
  information_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  card_description TEXT,
  company_name TEXT,
  company_code TEXT,
  reward_details TEXT,
  earned_stamp_message TEXT,
  earned_reward_message TEXT,
  terms_of_use TEXT,
  how_to_earn_stamp TEXT
);

CREATE TABLE program_location (
  location_id INTEGER,
  program_code TEXT NOT NULL,
  company_code TEXT NOT NULL,
  location_name TEXT,
  location_address TEXT,
  location_coord TEXT,
  location_push_message TEXT
);

CREATE TABLE program_rewards (
  rewards_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  program_stamp TEXT NOT NULL DEFAULT '',
  program_reward TEXT NOT NULL DEFAULT '',
  rewards_active TEXT NOT NULL DEFAULT '',
  reward_type TEXT,
  reward_details TEXT,
  earned_reward_message TEXT
);

CREATE TABLE program_stamps (
  stamps_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  program_number TEXT NOT NULL DEFAULT '',
  stamped_number TEXT NOT NULL DEFAULT '',
  program_stamped TEXT NOT NULL DEFAULT '',
  program_unstamped TEXT NOT NULL DEFAULT '',
  visits_required TEXT,
  stamps_required TEXT,
  purchase_amount NUMERIC,
  stamps_per_purchase INTEGER,
  expiration_type TEXT,
  expiration_date TEXT,
  expiration_period_value INTEGER,
  expiration_period_unit TEXT,
  stamp_lifetime_value INTEGER,
  stamp_lifetime_unit TEXT,
  stamp_lifetime_type TEXT DEFAULT '',
  privacy_policy_enabled TEXT DEFAULT '',
  privacy_policy_text TEXT,
  card_issue_limit INTEGER,
  daily_stamp_limit INTEGER,
  initial_stamps INTEGER,
  card_name TEXT,
  background_stamp_img TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE program_type (
  type_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_code TEXT NOT NULL,
  program_type TEXT NOT NULL DEFAULT ''
);

CREATE TABLE program_users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,
  selector TEXT NOT NULL,
  validator TEXT NOT NULL,
  link TEXT NOT NULL,
  program_code TEXT NOT NULL,
  user_code TEXT NOT NULL,
  date TEXT NOT NULL,
  stamped_number TEXT NOT NULL DEFAULT '',
  reward_number TEXT NOT NULL DEFAULT ''
);

CREATE TABLE program_wallet (
  wallet_id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,
  program_users_code TEXT NOT NULL,
  program_code TEXT NOT NULL,
  user_code TEXT NOT NULL,
  company_code TEXT NOT NULL
);

CREATE TABLE reset (
  reset_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT NOT NULL,
  reset_code TEXT NOT NULL,
  reset_date TEXT NOT NULL,
  reset_ip TEXT NOT NULL,
  validator TEXT NOT NULL
);

CREATE TABLE rewards (
  reward_id INTEGER PRIMARY KEY AUTOINCREMENT,
  reward_code TEXT NOT NULL,
  reward_selector TEXT NOT NULL,
  reward_validator TEXT NOT NULL,
  reward_link TEXT NOT NULL,
  program_code TEXT NOT NULL,
  company_code TEXT NOT NULL,
  reward_date TEXT NOT NULL,
  reward_status TEXT NOT NULL DEFAULT '',
  security_code TEXT NOT NULL
);

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_code TEXT NOT NULL,
  user_fullname TEXT NOT NULL DEFAULT '',
  user_phone TEXT NOT NULL DEFAULT '',
  user_email TEXT NOT NULL,
  user_pass TEXT NOT NULL,
  user_level INTEGER NOT NULL DEFAULT 0,
  user_type TEXT NOT NULL,
  user_ip TEXT NOT NULL,
  user_date TEXT NOT NULL,
  activation_code TEXT NOT NULL DEFAULT '',
  block TEXT NOT NULL DEFAULT '',
  one_signal_app_id TEXT NOT NULL DEFAULT '',
  one_signal_player_id TEXT NOT NULL DEFAULT '',
  license TEXT NOT NULL DEFAULT '',
  card_id INTEGER NOT NULL DEFAULT 0,
  user_logo TEXT,
  UNIQUE (user_email),
  UNIQUE (user_pass)
);

PRAGMA foreign_keys = ON;
