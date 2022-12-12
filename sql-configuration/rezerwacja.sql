create table rezerwacja
(
    id          integer,
    imie        varchar(16),
    nazwisko    varchar(32),
    idprzejazdu integer,
    znizka      varchar(32)
);

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (1, 'Jan', 'Nowak', 1, 'Student');

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (2, 'Janusz', 'Kowalski', 2, 'Senior');

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (3, 'Grażyna', 'Kowalska', 3, 'Nauczyciel szkolny');

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (4, 'Katarzyna', 'Nowak', 4, 'Doktorant');


-- drop table rezerwacja;
-- select *
-- from rezerwacja;