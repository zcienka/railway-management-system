create table znizka
(
    nazwaznizki            varchar(32),
    procentznizki          integer,
    dokumentpotwierdzajacy varchar(32)
);

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Student', 51, 'Legitymacja studencka');

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Senior', 25, 'Dowód osobisty');

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Nauczyciel szkolny', 33, 'Legitymacja nauczyciela');

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Żołnierz', 93, 'Książeczka wojskowa');

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Doktorant', 51, 'Legitymacja doktoranta');

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Honorowy dawca krwi', 33, 'Zaświadczenie dawcy krwi');

insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
values ('Uczeń', 49, 'Legitymacja szkolna');
