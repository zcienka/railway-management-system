namespace Backend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int IdPrzejazdu { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public int Znizka { get; set; }
    }
}
