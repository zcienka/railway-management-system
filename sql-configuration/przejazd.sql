create table przejazd
(
    id               integer,
    dataodjazdu      TIMESTAMP,
    dataprzyjazdu    TIMESTAMP,
    idkonduktora     integer,
    idmaszynisty     integer,
    idliniiprzejazdu integer,
    idpociagu        integer
);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (1, '2023-02-04 21:20:00', '2023-02-05 00:50:00', 1, 1, 1, 1);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (2, '2023-12-24 04:20:00', '2023-12-24 05:43:00', 2, 2, 1, 2);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (3, '2023-09-27 12:39:00', '2023-09-28 00:29:00', 3, 3, 1, 3);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (4, '2023-11-09 14:42:00', '2023-11-10 05:13:00', 4, 4, 1, 4);

------------------------------------------------------------------------------------------------------------------
insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (5, '2023-07-25 21:37:00', '2023-05-26 06:33:00', 1, 1, 2, 1);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (6, '2023-03-16 12:49:00', '2023-03-16 14:45:00', 2, 2, 2, 2);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (7, '2023-10-14 20:34:00', '2023-10-14 23:55:00', 3, 3, 2, 3);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (8, '2023-06-30 22:28:00', '2023-06-30 23:40:00', 4, 4, 2, 4);

------------------------------------------------------------------------------------------------------------------
insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (9, '2023-05-12 18:20:00', '2023-05-12 20:28:00', 5, 5, 3, 5);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (10, '2023-08-23 15:27:00', '2023-08-23 19:39:00', 6, 6, 3, 6);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (11, '2023-06-10 00:33:00', '2023-06-10 03:28:00', 7, 7, 3, 7);

insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (12, '2023-07-09 10:28:00', '2023-07-09 14:12:00', 8, 8, 3, 8);

------------------------------------------------------------------------------------------------------------------
-- drop table przejazd;
select *
from przejazd;