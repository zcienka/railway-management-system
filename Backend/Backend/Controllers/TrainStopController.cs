using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/train-stop")]
    [ApiController]
    public class TrainStopController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TrainStopController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from przystanekFilter();
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

        [HttpGet("{numerprzystanku}")]
        public IActionResult Get(string numerprzystanku)
        {
            try
            {
                int nrInt = Int32.Parse(numerprzystanku);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select * from przystanekFilter(vNrPrzystankuMin => @numerprzystanku, 
                                                           vNrPrzystankuMax => @numerprzystanku);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@numerprzystanku", Int32.Parse(numerprzystanku));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("line/{idLinii}")]
        public IActionResult GetTrainStopByLine(string idLinii)
        {
            try
            {
                int idInt = Int32.Parse(idLinii);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select * from przystanekFilter(vNrLiniiMin => @idlinii,
                                                           vNrLiniiMax => @idlinii);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idlinii", Int32.Parse(idLinii));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<TrainStop>>> search(string? numerprzystankumin,  string? numerprzystankumax,
                                                                       string? nazwastacji, 
                                                                       string? idliniimin, string? idliniimax)
        {
            if (numerprzystankumin == null)
                numerprzystankumin = "0";
            if (numerprzystankumax == null)
                numerprzystankumax = "999";
            if (nazwastacji == null)
                nazwastacji = "";
            if (idliniimin == null)
                idliniimin = "0";
            if (idliniimax == null)
                idliniimax = "999";

            try
            {
                Int32.Parse(idliniimin);
                Int32.Parse(idliniimax);
                Int32.Parse(numerprzystankumin);
                Int32.Parse(numerprzystankumax);
            } catch { return StatusCode(409, "Pola id linii i numery przystanków muszą być liczbami"); }

            string query = @"
                            select * from przystanekFilter(vNrPrzystankuMin => @numerprzystankumin, vNrPrzystankuMax => @numerprzystankumax,
                                                            vNrLiniiMin => @idliniimin, vNrLiniiMax => @idliniimax,
                                                            vNazwaStacji => @nazwastacji);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@numerprzystankumin", Int32.Parse(numerprzystankumin));
                    myCommand.Parameters.AddWithValue("@numerprzystankumax", Int32.Parse(numerprzystankumax));
                    myCommand.Parameters.AddWithValue("@idliniimin", Int32.Parse(idliniimin));
                    myCommand.Parameters.AddWithValue("@idliniimax", Int32.Parse(idliniimax));
                    myCommand.Parameters.AddWithValue("@nazwastacji", nazwastacji);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpPost("create")]
        public async Task<ActionResult<IEnumerable<TrainStop>>> create(string? numerprzystanku, string? nazwastacji, string? idlinii)
        {
            if(numerprzystanku == null || nazwastacji == null || idlinii == null)
                return StatusCode(409, "Wszystkie pola muszą być wypełnione");
            try{
                Int32.Parse(numerprzystanku);
                Int32.Parse(idlinii);
            }
            catch { return StatusCode(409, "Id linii i numer przystanku muszą być liczbami"); }

            string query = @"
                            select przystanekCreate(vNrPrzystanku => @numerprzystanku, 
                                                    vNazwaStacji => @nazwastacji, 
                                                    vNrLinii => @idlinii);
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
                    myCommand.Parameters.AddWithValue("@numerprzystanku", Int32.Parse(numerprzystanku));
                    myCommand.Parameters.AddWithValue("@nazwastacji", nazwastacji);
                    myCommand.Parameters.AddWithValue("@idlinii", Int32.Parse(idlinii));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[3].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Na tej linii znajduje się już ten przystanek");
            else if (val == -1)
                return StatusCode(409, "Id linii oraz numer przystanku muszą być liczbami nieujemnymi");
            else if (val == -2)
                return StatusCode(409, "Nazwa stacji musi być długości od 1 do 64 znaków");
            else
                return StatusCode(409, "Na tej linii podany numer przystanku jest już zajęty");

        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<TrainStop>>> update(string? numerprzystanku, string? nazwastacji, string? idlinii)
        {
            if (numerprzystanku == null || nazwastacji == null || idlinii == null)
                return StatusCode(409, "Wszystkie pola muszą być wypełnione");
            try
            {
                Int32.Parse(numerprzystanku);
                Int32.Parse(idlinii);
            }
            catch { return StatusCode(409, "Id linii i numer przystanku muszą być liczbami"); }

            string query = @"
                            select przystanekUpdate(vNrPrzystanku => @numerprzystanku,
                                                    vNazwaStacji => @nazwastacji,
                                                    vNrLinii => @idlinii);
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
                    myCommand.Parameters.AddWithValue("@numerprzystanku", Int32.Parse(numerprzystanku));
                    myCommand.Parameters.AddWithValue("@nazwastacji", nazwastacji);
                    myCommand.Parameters.AddWithValue("@idlinii", Int32.Parse(idlinii));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[3].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Na tej linii nie ma takiego przystanku");
            else if (val == -1)
                return StatusCode(409, "Numer przystanku oraz ID linii musi być nieujemne");
            else
                return StatusCode(409, "Na tej linii podany numer przystanku jest już zajęty");
        }
        
        [HttpDelete("{nazwastacji}/{idLinii}")]
        public IActionResult Delete(string nazwastacji, string idLinii)
        {
            try
            {
                int idInt = Int32.Parse(idLinii);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                           select przystanekDelete(vNazwaStacji => @nazwastacji, vNrLinii => @idlinii);
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
                    myCommand.Parameters.AddWithValue("@nazwastacji", nazwastacji);
                    myCommand.Parameters.AddWithValue("@idlinii", Int32.Parse(idLinii));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[2].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return NoContent();
            else
                return StatusCode(409, "Na tej linii nie ma takiego przystanku");
        }
    }
}
