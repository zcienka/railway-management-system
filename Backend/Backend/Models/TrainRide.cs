namespace Backend.Models
{
    public class TrainRide
    {
        public int Id { get; set; }
        public int IdKonduktora { get; set; }
        public int IdMaszynisty { get; set; }
        public int IdLiniiPrzejazdu { get; set; }
        public int IdPociagu { get; set; }
        public DateTime DataOdjazdu { get; set; }
        public DateTime DataPrzyjazdu { get; set; }

    }
}
