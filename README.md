create or replace function requesting_user_id()
returns text
language sql stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::json ->> 'sub', '')::text;
$$;


---
generate 4 description and requirements for the following jobs
ai engineer,backend developer,cloud engineer, database administrator fot the following companies
google,amazon,uber,meta accordingly