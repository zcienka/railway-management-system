create table lokomotywa
(
    id                      integer,
    databadaniatechnicznego date,
    nazwa                   varchar(32)
);

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (1, date('12-09-25'), 'ET21');

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (2, date('19-02-24'), 'ET22');

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (3, date('06-12-23'), 'ET40');

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (4, date('22-08-28'), 'ET41');