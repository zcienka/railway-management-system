using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;
using System;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocomotiveController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LocomotiveController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from lokomotywaReadAll();
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
                            select * from lokomotywaReadById(@id);
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
        public async Task<ActionResult<IEnumerable<Locomotive>>> search(string? nazwa,
            string? databadaniamin,
            string? databadaniamax)
        {
            if (nazwa == null)
                nazwa = "";
            if (databadaniamin == null)
                databadaniamin = "2022-12-31";
            if (databadaniamax == null)
                databadaniamax = "2122-12-31";

            DateTime dateTime;
            if (!DateTime.TryParse(databadaniamin, out dateTime))
            {
                return StatusCode(409, "Niepoprawny format daty");
            }

            string query = @"
                            select * from lokomotywaFilter(vNazwa => @nazwa, 
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
                    myCommand.Parameters.AddWithValue("@nazwa", nazwa);
                    myCommand.Parameters.AddWithValue("@databadaniamin", DateOnly.Parse(databadaniamin));
                    myCommand.Parameters.AddWithValue("@databadaniamax", DateOnly.Parse(databadaniamax));

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
        public async Task<ActionResult<IEnumerable<Locomotive>>> create(string? databadania, string? nazwa)
        {
            if (databadania == null)
                return StatusCode(409, "Pole daty następnego badania nie może być puste");
            if (nazwa == null)
                nazwa = "";
            try
            {
                DateOnly.Parse(databadania);
            }
            catch
            {
                return StatusCode(409, "Pole daty badania nie jest datą");
            }

            string query = @"
                            select lokomotywaCreate(vData => @databadaniatechnicznego, vNazwa => @nazwa);
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
                    myCommand.Parameters.AddWithValue("@nazwa", nazwa);
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
                return StatusCode(409, "Nazwa lokomotywy musi mieć długość do 32 znaków");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<Locomotive>>> update(string? id, string? databadania, string? nazwa)
        {
            if (id == null)
                return StatusCode(409, "Pole id nie może być puste");
            if (nazwa == null)
                nazwa = "";
            if (databadania == null)
                return StatusCode(409, "Pole daty następnego badania nie może być puste");
            try
            {
                Int32.Parse(id);
            }
            catch
            {
                return StatusCode(409, "Pole id musi być liczbą");
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
                            select lokomotywaUpdate(vId => @id, vData => @databadaniatechnicznego, vNazwa => @nazwa);
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
                    myCommand.Parameters.AddWithValue("@nazwa", nazwa);
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
            if (val == 0)
                return StatusCode(409, "Nie znaleziono lokomotywy o danym ID");
            if (val == -1)
                return StatusCode(409, "Data nie może być przeszła");
            else
                return StatusCode(409, "Nazwa musi być dlugości maksymalnie 32");
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
                           select lokomotywaDelete(@id);
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
                return Ok();
            else
                return StatusCode(409, "Nie znaleziono lokomotywy o danym ID");
        }
    }
}