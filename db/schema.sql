-- 
-- Table Definitions
-- 
create table public.contest (
  contest_id  int not null,
  event_date  date,
  winner_id int
);

create table public.flag (
  flag_id int not null,
  value varchar(100) not null
);

create table public.team (
  team_id int not null,
  name  varchar(100) not null,
  user_id int
);

create table public.user (
  user_id int not null,
  password varchar(100) not null
);

create table public.contest_flag (
  contest_id   int not null,
  flag_id int not null
);

create table public.contest_team (
  contest_id  int not null,
  team_id int not null
);

create table public.team_flag (
  team_id int not null,
  flag_id int not null
  attempt timestamp
);

-- 
-- Primary Keys
-- 
alter table public.contest
add constraint contest_pkey primary key (contest_id);

alter table public.flag
add constraint flag_pkey primary key(flag_id);

alter table public.team
add constraint team_pkey primary key(team_id);

alter table public.user
add constraint user_pkey primary key(user_id);

-- 
-- Foreign Keys
-- 

alter table public.contest
add constraint fk_winner_id foreign key(winner_id)
references public.team (team_id);

alter table public.team
add constraint fk_user_id foreign key (user_id)
references public.user (user_id);

alter table public.contest_flag
add constraint fk_contest_id foreign key (contest_id)
references public.contest (contest_id);

alter table public.contest_flag
add constraint fk_flag_id foreign key (flag_id)
references public.flag (flag_id);

alter table public.contest_team
add constraint fk_contest_id foreign key (contest_id)
references public.contest (contest_id);

alter table public.contest_team
add constraint fk_team_id foreign key (team_id)
references public.team (team_id);

alter table public.team_flag
add constraint fk_team_id foreign key (team_id)
references public.team (team_id);

alter table public.team_flag
add constraint fk_flag_id foreign key (flag_id)
references public.flag (flag_id);

-- Create Contest
insert into public.contest
  values (1, '2018-06-24');

-- Create Teams
insert into public.team
  values (2, 'teamb');

insert into public.team
  values (3, 'teamc');

insert into public.team
  values (4, 'teamd');

-- Create Flags
insert into public.flag
  values (1, 'hello');
insert into public.flag
  values (2, 'password123');
insert into public.flag
  values (3, 'qwerty');
insert into public.flag
  values (4, 'letmein');
insert into public.flag
  values (5, 'abc123');
insert into public.flag
  values (6, 'mypassword');

-- Assign the Flags to the Contest
insert into public.contest_flag(contest_id, flag_id)
  values (1, 1);
insert into public.contest_flag(contest_id, flag_id)
  values (1, 2);
insert into public.contest_flag(contest_id, flag_id)
  values (1, 3);
insert into public.contest_flag(contest_id, flag_id)
  values (1, 4);
insert into public.contest_flag(contest_id, flag_id)
  values (1, 5);
insert into public.contest_flag(contest_id, flag_id)
  values (1, 6);

-- Assign Teams to the Contest
insert into public.contest_team(contest_id, team_id)
  values(1, 1);
insert into public.contest_team(contest_id, team_id)
  values(1, 2);
insert into public.contest_team(contest_id, team_id)
  values(1, 3);
insert into public.contest_team(contest_id, team_id)
  values(1, 4);


-- Set Team B to find 1 flags
insert into public.team_flag(team_id, flag_id, attempt)
  values(2, 1, TIMESTAMP '2018-06-24 15:36:38');
-- Set Team C to find 3 flags
insert into public.team_flag(team_id, flag_id, attempt)
  values(3, 1, TIMESTAMP '2018-06-24 12:36:38');
insert into public.team_flag(team_id, flag_id, attempt)
  values(3, 2, TIMESTAMP '2018-06-24 13:36:38');
insert into public.team_flag(team_id, flag_id, attempt)
  values(3, 3, TIMESTAMP '2018-06-24 14:36:38');
-- Set Team D to find 5 flags
insert into public.team_flag(team_id, flag_id, attempt)
  values(4, 1, TIMESTAMP '2018-06-24 12:36:38');
insert into public.team_flag(team_id, flag_id, attempt)
  values(4, 2, TIMESTAMP '2018-06-24 13:36:38');
insert into public.team_flag(team_id, flag_id, attempt)
  values(4, 3, TIMESTAMP '2018-06-24 14:36:38');
insert into public.team_flag(team_id, flag_id, attempt)
  values(4, 4, TIMESTAMP '2018-06-24 15:36:38');
insert into public.team_flag(team_id, flag_id, attempt)
  values(4, 5, TIMESTAMP '2018-06-24 16:36:38');