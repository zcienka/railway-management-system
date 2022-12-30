using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public WorkerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from
                            pracownikReadAll();
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

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select * from
                            pracownikReadById(@id);
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

        [HttpGet("conductors")]
        public IActionResult GetConductors()
        {
            string query = @"
                            select * from pracownikFilter(vZawod => 'Konduktor');
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

        [HttpGet("drivers")]
        public IActionResult GetDrivers()
        {
            string query = @"
                            select * from pracownikFilter(vZawod => 'Maszynista');
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

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Worker>>> search(string? imie, string? nazwisko, 
                                                                    string? placamin, string? placamax, string? zawod)
        {
            if (imie == null)
                imie = "";
            if (nazwisko == null)
                nazwisko = "";
            if (placamin == null)
                placamin = "0";
            if (placamax == null)
                placamax = "999999";
            if (zawod == null)
                zawod = "";
            try{
                Int32.Parse(placamin);
                Int32.Parse(placamax);
            } catch { return StatusCode(409, "Pola płac muszą być liczbami"); }

            string query = @"
                            select * from pracownikFilter(vImie => @imie, vNazwisko => @nazwisko,
                                                       vMinPlaca => @placamin, vMaxPlaca => @placamax, vZawod => @zawod);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@imie", imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", nazwisko);
                    myCommand.Parameters.AddWithValue("@placamin", Int32.Parse(placamin));
                    myCommand.Parameters.AddWithValue("@placamax", Int32.Parse(placamax));
                    myCommand.Parameters.AddWithValue("@zawod", zawod);

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
        public async Task<ActionResult<IEnumerable<Worker>>> create(string? imie, string? nazwisko, string? placa, string? zawod)
        {
            if(imie == null || nazwisko == null || placa == null || zawod == null)
                return StatusCode(409, "Wszystkie pola muszą byc wypełnione");
            try{
                Int32.Parse(placa);
            } catch { return StatusCode(409, "Pole płacy musi być liczbą"); }

            string query = @"
                            select pracownikCreate(vImie => @imie,
                                                   vNazwisko => @nazwisko,
                                                   vZawod => @zawod,
                                                   vPlaca => @placa);
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
                    myCommand.Parameters.AddWithValue("@imie", imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", nazwisko);
                    myCommand.Parameters.AddWithValue("@placa", Int32.Parse(placa));
                    myCommand.Parameters.AddWithValue("@zawod", zawod);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[4].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == -1)
                return StatusCode(409, "Dostępne zawody: \"Maszynista\", \"Konduktor\".");
            else if (val == -2)
                return StatusCode(409, "Imię musi być dlugości między 1 a 31");
            else if (val == -3)
                return StatusCode(409, "Nazwisko musi być dlugości między 1 a 31");
            else
                return StatusCode(409, "Płaca nie może być ujemna");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<Worker>>> update(string? id,string? imie, string? nazwisko, 
                                                                    string? placa, string? zawod)
        {
            if (id == null || imie == null || nazwisko == null || placa == null || zawod == null)
                return StatusCode(409, "Wszystkie pola muszą byc wypełnione");
            try
            {
                Int32.Parse(id);
                Int32.Parse(placa);
            }
            catch { return StatusCode(409, "Pola płacy i id muszą być liczbami"); }

            string query = @"
                           select pracownikUpdate(vId => @id,
                                                  vImie => @imie, 
                                                  vNazwisko => @nazwisko, 
                                                  vZawod => @zawod, 
                                                  vPlaca => @placa);
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
                    myCommand.Parameters.AddWithValue("@imie", imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", nazwisko);
                    myCommand.Parameters.AddWithValue("@placa", Int32.Parse(placa));
                    myCommand.Parameters.AddWithValue("@zawod", zawod);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[5].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Nie znaleziono pracownika o danym ID");
            else if (val == -1)
                return StatusCode(409, "Dostępne zawody: \"Maszynista\", \"Konduktor\".");
            else if (val == -2)
                return StatusCode(409, "Imię musi być dlugości między 1 a 32");
            else if (val == -3)
                return StatusCode(409, "Nazwisko musi być dlugości między 1 a 32");
            else
                return StatusCode(409, "Płaca nie może być ujemna");
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
                           select pracownikDelete(@id);
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

            if (val == 1)
                return Ok();
            else
                return StatusCode(409, "Nie znaleziono pracownika o danym ID");
        }


    }
}