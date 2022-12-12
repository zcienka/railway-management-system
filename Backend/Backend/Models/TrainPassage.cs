namespace Backend.Models
{
    public class TrainPassage
    {
        public int Id { get; set; }
        public int IdKonduktora { get; set; }
        public int IdMaszynisty { get; set; }
        public int IdLiniiPrzejazdu { get; set; }
        public int IdPociagu { get; set; }
    }
}
