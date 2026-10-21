-- Гостевой чат для портфолио. Выполните в Supabase: SQL Editor -> New query -> Run.

create table if not exists public.portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 30),
  text text not null check (char_length(text) between 1 and 300),
  is_owner boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.portfolio_messages enable row level security;

-- читать сообщения может кто угодно
create policy "chat read" on public.portfolio_messages
  for select using (true);

-- писать может кто угодно, но не от имени автора сайта
create policy "chat insert" on public.portfolio_messages
  for insert with check (is_owner = false);

-- живое обновление чата
alter publication supabase_realtime add table public.portfolio_messages;

-- Ответ от вашего имени: вставьте строку вручную в Table Editor
-- с is_owner = true (анонимные посетители так сделать не смогут).
