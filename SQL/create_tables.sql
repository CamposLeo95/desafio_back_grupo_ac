CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  admin BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  balance NUMERIC NOT NULL,
  account_number INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  from_account_number INTEGER NOT NULL,
  to_account_number INTEGER NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  transaction_status TEXT NOT NULL,
  id_transition_reversal UUID,
  created_at TIMESTAMP NOT NULL
);


CREATE TABLE request_reversals (
  id UUID PRIMARY KEY,
  from_account_number INTEGER NOT NULL,
  to_account_number INTEGER NOT NULL,
  transaction_id UUID NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  request_reversal_status TEXT NOT NULL,
  CONSTRAINT fk_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);
