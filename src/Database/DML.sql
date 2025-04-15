BEGIN;

INSERT INTO public.Users(username, first_name, last_name, birthdate)
VALUES
  ('habani', 'taly', 'habani', DATE('1999-01-01')),
  ('shahar', 'shahar', 'mendi', DATE('1999-02-02'));

INSERT INTO public.Messages("from", "to", content)
VALUES
  ('habani', 'shahar', 'hey shahar ma omer');

COMMIT;
