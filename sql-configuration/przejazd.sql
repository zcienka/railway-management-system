create table przejazd
(
    id               integer,
    idkonduktora     integer,
    idmaszynisty     integer,
    idliniiprzejazdu integer,
    idpociagu        integer
);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (1, 1, 1, 1, 1);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (2, 2, 2, 1, 2);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (3, 3, 3, 1, 3);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (4, 4, 4, 1, 4);

------------------------------------------------------------------------------------------------------------------
insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (5, 1, 1, 2, 1);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (6, 2, 2, 2, 2);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (7, 3, 3, 2, 3);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (8, 4, 4, 2, 4);

------------------------------------------------------------------------------------------------------------------
insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (9, 5, 5, 3, 5);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (10, 6, 6, 3, 6);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (11, 7, 7, 3, 7);

insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
values (12, 8, 8, 3, 8);
------------------------------------------------------------------------------------------------------------------
-- drop table przejazd;