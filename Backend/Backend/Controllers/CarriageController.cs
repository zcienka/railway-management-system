using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarriageController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CarriageController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from wagonReadAll();
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
            catch
            {
                return StatusCode(409, "Id musi być liczbą");
            }

            string query = @"
                            select * from wagonReadById(@id);
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
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Carriage>>> search(string? databadaniamin,
                                                                             string? databadaniamax,
                                                                             string? liczbamiejscmin,
                                                                             string? liczbamiejscmax)
        {
            if (databadaniamin == null)
                databadaniamin = "2022-12-31";
            if (databadaniamax == null)
                databadaniamax = "2122-12-31";
            if (liczbamiejscmin == null)
                liczbamiejscmin = "0";
            if (liczbamiejscmax == null)
                liczbamiejscmax = "100000";

            try
            {
                Int32.Parse(liczbamiejscmin);
                Int32.Parse(liczbamiejscmax);
            }
            catch { return StatusCode(409, "Pola liczby miejsc muszą być liczbami"); }

            string query = @"
                            select * from wagonFilter(vMiejscMin => @liczbamiejscmin, vMiejscMax => @liczbamiejscmax, 
                                                      vDataMin => @databadaniamin, vDataMax => @databadaniamax);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@databadaniamin", DateOnly.Parse(databadaniamin));
                    myCommand.Parameters.AddWithValue("@databadaniamax", DateOnly.Parse(databadaniamax));
                    myCommand.Parameters.AddWithValue("@liczbamiejscmin", Int32.Parse(liczbamiejscmin));
                    myCommand.Parameters.AddWithValue("@liczbamiejscmax", Int32.Parse(liczbamiejscmax));

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
        public async Task<ActionResult<IEnumerable<Carriage>>> create(string? databadania, string? liczbamiejsc)
        {
            if (databadania == null)
                return StatusCode(409, "Pole daty następnego badania nie może być puste");
            if (liczbamiejsc == null)
                return StatusCode(409, "Pole liczby miejsc nie może być puste");
            try
            {
                Int32.Parse(liczbamiejsc);
            }
            catch
            {
                return StatusCode(409, "Pole Liczby miejsc musi być liczbą");
            }

            try
            {
                DateOnly.Parse(databadania);
            }
            catch
            {
                return StatusCode(409, "Pole daty badania nie jest datą");
            }

            string query = @"
                            select wagonCreate(vData => @databadaniatechnicznego, vMiejsc => @liczbamiejsc);
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
                    myCommand.Parameters.AddWithValue("@databadaniatechnicznego", DateOnly.Parse(databadania));
                    myCommand.Parameters.AddWithValue("@liczbamiejsc", Int32.Parse(liczbamiejsc));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32)
                        { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[2].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }

            if (val == 1)
                return Ok();
            else if (val == -1)
                return StatusCode(409, "Data nie może być przeszła");
            else
                return StatusCode(409, "Liczba miejsc nie może być ujemna");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<Carriage>>> update(string? id, string? databadania,
            string? liczbamiejsc)
        {
            if (id == null)
                return StatusCode(409, "Pole id nie może być puste");
            if (databadania == null)
                return StatusCode(409, "Pole daty następnego badania nie może być puste");
            if (liczbamiejsc == null)
                return StatusCode(409, "Pole liczby miejsc nie może być puste");
            try
            {
                Int32.Parse(liczbamiejsc);
            }
            catch
            {
                return StatusCode(409, "Pole Liczby miejsc musi być liczbą");
            }

            try
            {
                DateOnly.Parse(databadania);
            }
            catch
            {
                return StatusCode(409, "Pole daty badania nie jest datą");
            }

            try
            {
                Int32.Parse(id);
            }
            catch
            {
                return StatusCode(409, "Pole id musi być liczbą");
            }

            string query = @"
                            select wagonUpdate(vId => @id, vData => @databadaniatechnicznego, vMiejsc => @liczbamiejsc);
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
                    myCommand.Parameters.AddWithValue("@databadaniatechnicznego", DateOnly.Parse(databadania));
                    myCommand.Parameters.AddWithValue("@liczbamiejsc", Int32.Parse(liczbamiejsc));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32)
                        { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[3].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }

            if (val == 1)
                return Ok();
            else if (val == -1)
                return StatusCode(409, "Data nie może być przeszła");
            else if (val == -2)
                return StatusCode(409, "Liczba miejsc nie może być ujemna");
            else
                return StatusCode(409, "Nie znaleziono wagonu o danym ID");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch
            {
                return StatusCode(409, "Id musi być liczbą");
            }

            string query = @"
                           select wagonDelete(@id);
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
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32)
                        { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[1].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }

            if (val == 1)
                return NoContent();
            else
                return StatusCode(409, "Nie znaleziono wagonu o danym ID");
        }
    }
}