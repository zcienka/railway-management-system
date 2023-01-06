CREATE SEQUENCE IF NOT EXISTS seq_wagon 
increment by 1
minvalue 1 no maxvalue;

CREATE SEQUENCE IF NOT EXISTS seq_lokomotywa 
increment by 1
minvalue 1 no maxvalue;

CREATE SEQUENCE IF NOT EXISTS seq_rezerwacja
increment by 1
minvalue 1 no maxvalue;

CREATE SEQUENCE IF NOT EXISTS seq_pociag
increment by 1
minvalue 1 no maxvalue;

CREATE SEQUENCE IF NOT EXISTS seq_pracownik
increment by 1
minvalue 1 no maxvalue;

CREATE SEQUENCE IF NOT EXISTS seq_przejazd
increment by 1
minvalue 1 no maxvalue;



CREATE TABLE IF NOT EXISTS wagon (
id                       INTEGER NOT NULL CONSTRAINT wagon_pk PRIMARY KEY,
databadaniatechnicznego  DATE NOT NULL,
liczbamiejsc             INTEGER NOT NULL
);
	
insert into wagon (id, databadaniatechnicznego, liczbamiejsc)
values (nextval('seq_wagon'), date('18-10-23'), 50);

insert into wagon(id, databadaniatechnicznego, liczbamiejsc)
values (nextval('seq_wagon'), date('17-04-23'), 60);

insert into wagon(id, databadaniatechnicznego, liczbamiejsc)
values (nextval('seq_wagon'), date('01-02-24'), 45);

insert into wagon(id, databadaniatechnicznego, liczbamiejsc)
values (nextval('seq_wagon'), date('28-11-25'), 70);


create table IF NOT EXISTS lokomotywa
(
    id                      INTEGER NOT NULL CONSTRAINT lokomotywa_pk PRIMARY KEY,
    databadaniatechnicznego DATE NOT NULL,
    nazwa                   VARCHAR(32)
);

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (nextval('seq_lokomotywa'), date('12-09-25'), 'ET21');

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (nextval('seq_lokomotywa'), date('19-02-24'), 'ET22');

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (nextval('seq_lokomotywa'), date('06-12-23'), 'ET40');

insert into lokomotywa(id, databadaniatechnicznego, nazwa)
values (nextval('seq_lokomotywa'), date('22-08-28'), 'ET41');

CREATE TABLE IF NOT EXISTS pociag (
    id            INTEGER NOT NULL CONSTRAINT pociag_pk PRIMARY KEY,
    nazwa         VARCHAR(32),
    idlokomotywy INTEGER NOT NULL REFERENCES lokomotywa(id)
);

insert into pociag(id, nazwa, idlokomotywy)
values (nextval('seq_pociag'), 'TLK', 1);

insert into pociag(id, nazwa, idlokomotywy)
values (nextval('seq_pociag'), 'IC', 2);

insert into pociag(id, nazwa, idlokomotywy)
values (nextval('seq_pociag'), 'TLK', 3);

insert into pociag(id, nazwa, idlokomotywy)
values (nextval('seq_pociag'), 'IC', 4);


CREATE TABLE IF NOT EXISTS wagonwpociagu (
    numerwagonu INTEGER NOT NULL,
    idWagonu    INTEGER NOT NULL REFERENCES wagon(id) ON DELETE CASCADE,
    idpociagu   INTEGER NOT NULL REFERENCES pociag(id) ON DELETE CASCADE,
	PRIMARY KEY (idWagonu, idpociagu)
);

insert into wagonWPociagu(numerwagonu, idWagonu, idpociagu)
values (1, 1, 1);

insert into wagonWPociagu(numerwagonu, idWagonu, idpociagu)
values (2, 2, 2);

insert into wagonWPociagu(numerwagonu, idWagonu, idpociagu)
values (3, 3, 3);

insert into wagonWPociagu(numerwagonu, idWagonu, idpociagu)
values (4, 4, 4);

CREATE TABLE IF NOT EXISTS pracownik (
    id       INTEGER NOT NULL CONSTRAINT pracownik_pk PRIMARY KEY,
    imie     VARCHAR(16) NOT NULL,
    nazwisko VARCHAR(32) NOT NULL,
    placa    INTEGER NOT NULL,
    zawod    VARCHAR(16) NOT NULL CHECK (zawod IN ('Maszynista', 'Konduktor'))
);

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (nextval('seq_pracownik'), 'Krzysztof', 'Wójcik', 1000, 'Maszynista');

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (nextval('seq_pracownik'), 'Tomasz', 'Wiśniewski', 2000, 'Konduktor');

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (nextval('seq_pracownik'), 'Grażyna', 'Żarko', 3000, 'Maszynista');

insert into pracownik(id, imie, nazwisko, placa, zawod)
values (nextval('seq_pracownik'), 'Julia', 'Nowaczyk', 4000, 'Konduktor');


CREATE TABLE IF NOT EXISTS stacja (
    nazwa VARCHAR(64) NOT NULL CONSTRAINT stacja_pk PRIMARY KEY,
    adres VARCHAR(64) NOT NULL
);

insert into stacja(nazwa, adres)
values ('Warszawa Wschodnia', 'Warszawa, ul. Kijowska 20');

insert into stacja(nazwa, adres)
values ('Warszawa Centralna', 'Warszawa, al. Jerozolimskie 54');

insert into stacja(nazwa, adres)
values ('Warszawa Zachodnia', 'Warszawa, al. Jerozolimskie 142');

insert into stacja(nazwa, adres)
values ('Żyrardów', 'Żyrardów, Plac Marszałka Józefa Piłsudskiego 1');

insert into stacja(nazwa, adres)
values ('Skierniewice', 'Skierniewice, Dworcowa 1');

insert into stacja(nazwa, adres)
values ('Łowicz Główny', 'Łowicz, Dworcowa 1');

insert into stacja(nazwa, adres)
values ('Kutno', 'Kutno, 3 Maja 3');

insert into stacja(nazwa, adres)
values ('Koło', 'Koło, Kolejowa 1');

insert into stacja(nazwa, adres)
values ('Konin', 'Konin, Kolejowa 1');

insert into stacja(nazwa, adres)
values ('Słupca', 'Słupca, Kolejowa 1');

insert into stacja(nazwa, adres)
values ('Swarzędz', 'Swarzędz, Dworcowa 1');
-------------------------------------------------------------
insert into stacja(nazwa, adres)
values ('Poznań Główny', 'Poznań, Dworcowa 2');

insert into stacja(nazwa, adres)
values ('Kościan', 'Kościan, Dworcowa 1');

insert into stacja(nazwa, adres)
values ('Leszno', 'Leszno, Dworcowa 1');

insert into stacja(nazwa, adres)
values ('Rawicz', 'Rawicz, Dworcowa 1');

insert into stacja(nazwa, adres)
values ('Żmigród', 'Żmigród, Kolejowa 14');

insert into stacja(nazwa, adres)
values ('Oborniki Śląskie', 'Oborniki Śląskie, Dworcowa 1');

insert into stacja(nazwa, adres)
values ('Wrocław Główny', 'Wrocław Główny, Piłsudskiego 105');
-------------------------------------------------------------
insert into stacja(nazwa, adres)
values ('Opole Wschodnie', 'Opole, Oleska 1');

insert into stacja(nazwa, adres)
values ('Strzelce Opolskie', 'Strzelce Opolskie, Dworcowa 8');

insert into stacja(nazwa, adres)
values ('Gliwice', 'Gliwice, Bohaterów Getta Warszawskiego 12');

insert into stacja(nazwa, adres)
values ('Zabrze', 'Zabrze, Plac Dworcowy 2');

insert into stacja(nazwa, adres)
values ('Chorzów Batory', 'Chorzów, Armii Krajowej 1');

insert into stacja(nazwa, adres)
values ('Katowice', 'Katowice, Plac Marii i Lecha Kaczyńskich 2');


CREATE TABLE IF NOT EXISTS liniaprzejazdu (
    id INTEGER NOT NULL CONSTRAINT liniaprzejazdu_pk PRIMARY KEY
);

insert into liniaprzejazdu(id)
values (1);

insert into liniaprzejazdu(id)
values (2);

insert into liniaprzejazdu(id)
values (3);


CREATE TABLE IF NOT EXISTS przystanek (
    numerprzystanku INTEGER NOT NULL,
    nazwastacji     VARCHAR(64) NOT NULL REFERENCES stacja(nazwa) ON DELETE CASCADE,
    idlinii         INTEGER NOT NULL REFERENCES liniaprzejazdu(id) ON DELETE CASCADE,
	PRIMARY KEY(numerprzystanku, nazwastacji, idlinii)
);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (1, 'Warszawa Wschodnia', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (2, 'Warszawa Centralna', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (3, 'Warszawa Zachodnia', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (4, 'Żyrardów', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (5, 'Skierniewice', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (6, 'Łowicz Główny', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (7, 'Kutno', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (8, 'Koło', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (9, 'Konin', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (10, 'Słupca', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (11, 'Swarzędz', 1);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (12, 'Poznań Główny', 1);

----------------------------------------------------------------
insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (1, 'Poznań Główny', 2);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (2, 'Kościan', 2);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (3, 'Leszno', 2);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (4, 'Rawicz', 2);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (5, 'Żmigród', 2);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (6, 'Oborniki Śląskie', 2);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (7, 'Wrocław Główny', 2);
---------------------------------------------------------------
insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (1, 'Wrocław Główny', 3);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (2, 'Opole Wschodnie', 3);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (3, 'Strzelce Opolskie', 3);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (4, 'Gliwice', 3);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (5, 'Zabrze', 3);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (6, 'Chorzów Batory', 3);

insert into przystanek(numerprzystanku, nazwastacji, idlinii)
values (7, 'Katowice', 3);


CREATE TABLE IF NOT EXISTS przejazd (
    id                INTEGER NOT NULL CONSTRAINT przejazd_pk PRIMARY KEY,
    dataodjazdu       TIMESTAMP NOT NULL,
    dataprzyjazdu     TIMESTAMP NOT NULL,
    idkonduktora      INTEGER NOT NULL REFERENCES pracownik(id) ON DELETE CASCADE,
    idmaszynisty      INTEGER NOT NULL REFERENCES pracownik(id) ON DELETE CASCADE,
    idliniiprzejazdu  INTEGER NOT NULL REFERENCES liniaprzejazdu(id) ON DELETE CASCADE,
    idpociagu         INTEGER NOT NULL REFERENCES pociag(id) ON DELETE CASCADE,
	check(idkonduktora != idmaszynisty)
);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-02-04 21:20:00', '2023-02-05 00:50:00', 2, 1, 1, 1);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-12-24 04:20:00', '2023-12-24 05:43:00', 4, 1, 1, 2);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-09-27 12:39:00', '2023-09-28 00:29:00', 2, 3, 1, 3);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-11-09 14:42:00', '2023-11-10 05:13:00', 4, 3, 1, 4);

------------------------------------------------------------------------------------------------------------------
insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-07-25 21:37:00', '2023-05-26 06:33:00', 4, 3, 2, 1);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-03-16 12:49:00', '2023-03-16 14:45:00', 4, 3, 2, 2);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-10-14 20:34:00', '2023-10-14 23:55:00', 2, 1, 2, 3);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (nextval('seq_przejazd'), '2023-06-30 22:28:00', '2023-06-30 23:40:00', 2, 1, 2, 4);


CREATE TABLE IF NOT EXISTS znizka (
    nazwaznizki            VARCHAR(32) NOT NULL CONSTRAINT znizka_pk PRIMARY KEY,
    procentznizki          INTEGER NOT NULL,
    dokumentpotwierdzajacy VARCHAR(32) NOT NULL
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


CREATE TABLE IF NOT EXISTS rezerwacja (
    id             INTEGER NOT NULL CONSTRAINT rezerwacja_pk PRIMARY KEY,
    imie           VARCHAR(16) NOT NULL,
    nazwisko       VARCHAR(32) NOT NULL,
    idprzejazdu    INTEGER NOT NULL REFERENCES przejazd(id) ON DELETE CASCADE,
    znizka         VARCHAR(32) NOT NULL REFERENCES znizka(nazwaznizki) ON DELETE CASCADE
);

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (nextval('seq_rezerwacja'), 'Jan', 'Nowak', 1, 'Student');

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (nextval('seq_rezerwacja'), 'Janusz', 'Kowalski', 2, 'Senior');

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (nextval('seq_rezerwacja'), 'Grażyna', 'Kowalska', 3, 'Nauczyciel szkolny');

insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
values (nextval('seq_rezerwacja'), 'Katarzyna', 'Nowak', 4, 'Doktorant');



CREATE OR REPLACE PROCEDURE delete_database()
LANGUAGE SQL
AS $$
	DROP SEQUENCE IF EXISTS seq_wagon;
	DROP SEQUENCE IF EXISTS seq_pociag;
	DROP SEQUENCE IF EXISTS seq_lokomotywa;
	DROP SEQUENCE IF EXISTS seq_pracownik;
	DROP SEQUENCE IF EXISTS seq_przejazd;
	DROP SEQUENCE IF EXISTS seq_rezerwacja;

	DROP TABLE IF EXISTS wagon 			CASCADE;
	DROP TABLE IF EXISTS pociag 		CASCADE;
	DROP TABLE IF EXISTS wagonwpociagu 	CASCADE;
	DROP TABLE IF EXISTS lokomotywa 	CASCADE;
	DROP TABLE IF EXISTS pracownik 		CASCADE;
	DROP TABLE IF EXISTS stacja 		CASCADE;
	DROP TABLE IF EXISTS liniaprzejazdu CASCADE;
	DROP TABLE IF EXISTS przystanek 	CASCADE;
	DROP TABLE IF EXISTS przejazd 		CASCADE;
	DROP TABLE IF EXISTS znizka 		CASCADE;
	DROP TABLE IF EXISTS rezerwacja 	CASCADE;
$$;

-- CALL delete_database();
