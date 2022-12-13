create table pracownik
(
    id       integer,
    imie     varchar(16),
    nazwisko varchar(16),
    placa    integer,
    zawod    varchar(16)
);

select nazwisko
from pracownik;

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (1, 'Krzysztof', 'Wójcik', 1, 'Maszynista');

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (2, 'Tomasz', 'Wiśniewski', 2, 'Konduktor');

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (3, 'Grażyna', 'Żarko', 3, 'Maszynista');

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (4, 'Julia', 'Nowaczyk', 4, 'Konduktor');