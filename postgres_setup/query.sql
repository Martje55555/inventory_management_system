-- Creates a new database
-- CREATE DATABASE postgres OWNER postgres

-- Creates the schema inventory
-- CREATE SCHEMA 'inventory'

-- Create Table Items
-- create table inventory.items (
-- 	id serial primary key,
-- 	name varchar(200),
-- 	price NUMERIC,
-- 	inventory integer,
-- 	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
-- 	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- Create Table Shipments
-- create table inventory.shipments (
--     ship_id serial primary key,
--     name varchar(200),
--     items JSONB,
--     inventory integer,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );