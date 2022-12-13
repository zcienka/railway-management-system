create table wagon
(
    id                      integer,
    databadaniatechnicznego date,
    nazwa                   varchar(32)
);


insert into wagon(id, databadaniatechnicznego, nazwa)
values (1, date('18-10-23'), 'A');

insert into wagon(id, databadaniatechnicznego, nazwa)
values (2, date('17-04-23'), 'B');

insert into wagon(id, databadaniatechnicznego, nazwa)
values (3, date('01-02-24'), 'AB');

insert into wagon(id, databadaniatechnicznego, nazwa)
values (4, date('28-11-25'), 'A');
