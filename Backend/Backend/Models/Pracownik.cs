namespace Backend.Models
{
    public class Pracownik
    {
        public int Id { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }

        public string Placa { get; set; }
        public string Zawod { get; set; }
    }
}
