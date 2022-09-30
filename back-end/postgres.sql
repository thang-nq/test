-- Table: public.Products

-- DROP TABLE IF EXISTS public."Products";

CREATE TABLE IF NOT EXISTS public."Products"
(
    id integer NOT NULL DEFAULT nextval('"Products_id_seq"'::regclass),
    code character varying(9) COLLATE pg_catalog."default" NOT NULL,
    name character varying(90) COLLATE pg_catalog."default" NOT NULL,
    category character varying(28) COLLATE pg_catalog."default" NOT NULL,
    brand character varying(28) COLLATE pg_catalog."default",
    type character varying(21) COLLATE pg_catalog."default",
    description character varying(180) COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Products_pkey" PRIMARY KEY (id),
    CONSTRAINT "Products_code_key" UNIQUE (code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Products"
    OWNER to doadmin;