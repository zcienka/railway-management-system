namespace Backend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int Idprzejazdu { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public string Znizka { get; set; }
    }
}
