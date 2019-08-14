CREATE TABLE users(
    user_id VARCHAR(20)         NOT NULL,
    username VARCHAR(50)        NOT NULL,
    passwordHash VARCHAR(100)   NOT NULL, 
    firstName VARCHAR(50)       NOT NULL,
    lastName VARCHAR(50)        NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    pref_temp DECIMAL(9),
    pref_pressure DECIMAL(9),
    temp_limit_high DECIMAL(9),
    temp_limit_low DECIMAL(9),
    pressure_limit_high DECIMAL(9),
    time_limit DECIMAL(9),
    is_admin BOOLEAN,
    admin_id VARCHAR(20)
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_unique_user UNIQUE (username),
    CONSTRAINT users_unique_passwd UNIQUE (username)
);

CREATE TABLE devices(
    device_id VARCHAR(20)       NOT NULL,
    device_name VARCHAR(50),
    location VARCHAR(100),
    default_pref_temp DECIMAL(9),
    default_pref_pressure DECIMAL(9),
    default_temp_limit_high DECIMAL(9),
    default_temp_limit_low DECIMAL(9),
    default_pressure_limit_high DECIMAL(9),
    default_time_limit DECIMAL(9),
    admin_id VARCHAR(20),
    CONSTRAINT devices_pkey PRIMARY KEY (device_id),
);

CREATE TABLE userDevices(
    user_id VARCHAR(20)         NOT NULL,
    device_id VARCHAR(20)       NOT NULL,
    CONSTRAINT userDevices_unique UNIQUE (user_id, device_id),
    CONSTRAINT userDevices_fkey_users FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT userDevices_fkey_devices FOREIGN KEY (device_id) REFERENCES devices(device_id)
)