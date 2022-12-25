using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/train-ride")]
    [ApiController]
    public class TrainRideController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TrainRideController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = $@"
                            select przejazd.id, przejazd.dataodjazdu, przejazd.dataprzyjazdu, 
                                   konduktor.imie as imiekonduktora, konduktor.nazwisko as nazwiskokonduktora,
	                               maszynista.imie as imiemaszynisty, maszynista.nazwisko as nazwiskomaszynisty, 
                                   przejazd.idliniiprzejazdu, 
                                   pociag.nazwa as nazwapociagu from przejazdReadAll() przejazd 
                                   join pracownik maszynista on maszynista.id = idmaszynisty
								   join pracownik konduktor on konduktor.id = idkonduktora
								   join pociag on pociag.id = idpociagu;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }
        
        [HttpGet("{id}/station-by-line")]
        public IActionResult GetStationsByLine(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select *
                            from
                            przystanek p join liniaprzejazdu l
                            on l.id = p.idlinii
                            where @id=id;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {   
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select przejazd.id, przejazd.dataodjazdu, przejazd.dataprzyjazdu, 
                                   konduktor.imie as imiekonduktora, konduktor.nazwisko as nazwiskokonduktora,
	                               maszynista.imie as imiemaszynisty, maszynista.nazwisko as nazwiskomaszynisty, 
                                   przejazd.idliniiprzejazdu, 
                                   pociag.nazwa as nazwapociagu from przejazdReadById(@id) przejazd 
                                   join pracownik maszynista on maszynista.id = idmaszynisty
								   join pracownik konduktor on konduktor.id = idkonduktora
								   join pociag on pociag.id = idpociagu;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpPost]
        public IActionResult Post(TrainRide trainPassage)
        {
            string query = @"
                            select przejazdCreate(vOdjazd => @dataodjazdu,
										          vPrzyjazd => @dataprzyjazdu,
										          vIdKonduktora => @idkonduktora,
										          vIdMaszynisty => @idmaszynisty,
										          vIdLiniiPrzejazdu => @idliniiprzejazdu,
										          vIdPociagu => @idpociagu);
                            ";

            int val = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idkonduktora", trainPassage.IdKonduktora);
                    myCommand.Parameters.AddWithValue("@idmaszynisty", trainPassage.IdMaszynisty);
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdu", trainPassage.IdLiniiPrzejazdu);
                    myCommand.Parameters.AddWithValue("@idpociagu", trainPassage.IdPociagu);
                    myCommand.Parameters.AddWithValue("@dataodjazdu", trainPassage.DataOdjazdu);
                    myCommand.Parameters.AddWithValue("@dataprzyjazdu", trainPassage.DataPrzyjazdu);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[6].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return CreatedAtAction(nameof(Get), trainPassage);
            else if (val == 0)
                return StatusCode(409, "Dany pracownik nie jest z zawodu konduktorem");
            else if (val == -1)
                return StatusCode(409, "Dany pracownik nie jest z zawodu maszynistą");
            else if (val == -2)
                return StatusCode(409, "Dana linia przejazdu nie istnieje");
            else if (val == -3)
                return StatusCode(409, "Dany pociąg nie istnieje");
            else if (val == -4)
                return StatusCode(409, "Data odjazdu nie może być przeszła");
            else
                return StatusCode(409, "Data odjazdu musi być późniejsza niż data przyjazdu");
        }

        [HttpPatch]
        public IActionResult Patch(TrainRide trainPassage)
        {
            string query = @"
                           select przejazdUpdate(vId => @id,
										        vOdjazd => @dataodjazdu,
										        vPrzyjazd => @dataprzyjazdu,
										        vIdKonduktora => @idkonduktora,
										        vIdMaszynisty => @idmaszynisty,
										        vIdLiniiPrzejazdu => 2,
										        vIdPociagu => @idpociagu);
                           ";

            int val = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", trainPassage.Id);
                    myCommand.Parameters.AddWithValue("@idkonduktora", trainPassage.IdKonduktora);
                    myCommand.Parameters.AddWithValue("@idmaszynisty", trainPassage.IdMaszynisty);
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdu", trainPassage.IdLiniiPrzejazdu);
                    myCommand.Parameters.AddWithValue("@idpociagu", trainPassage.IdPociagu);
                    myCommand.Parameters.AddWithValue("@dataodjazdu", trainPassage.DataOdjazdu);
                    myCommand.Parameters.AddWithValue("@dataprzyjazdu", trainPassage.DataPrzyjazdu);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[7].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok(trainPassage);
            else if (val == 0)
                return StatusCode(409, "Dany pracownik nie jest z zawodu konduktorem");
            else if (val == -1)
                return StatusCode(409, "Dany pracownik nie jest z zawodu maszynistą");
            else if (val == -2)
                return StatusCode(409, "Dana linia przejazdu nie istnieje");
            else if (val == -3)
                return StatusCode(409, "Dany pociąg nie istnieje");
            else if (val == -4)
                return StatusCode(409, "Data odjazdu nie może być przeszła");
            else if (val == -5)
                return StatusCode(409, "Data odjazdu musi być późniejsza niż data przyjazdu");
            else
                return StatusCode(409, "Nie znaleziono przejazdu o danym ID");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select przejazdDelete(@id);
                           ";

            int val = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[1].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return NoContent();
            else
                return StatusCode(409, "Nie znaleziono przejazdu o danym ID");
        }
    }
}
