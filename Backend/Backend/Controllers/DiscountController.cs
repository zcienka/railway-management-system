using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DiscountController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from znizkaReadAll();
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

        [HttpGet("{nazwaznizki}")]
        public IActionResult Get(string nazwaznizki)
        {
            string query = @"
                            select * from znizkaReadByName(@nazwaznizki);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nazwaznizki", nazwaznizki);

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
        public async Task<ActionResult<IEnumerable<Discount>>> search(string? nazwa, string? procentmin,
            string? procentmax, string? dokument)
        {
            if (nazwa == null)
                nazwa = "";
            if (procentmin == null)
                procentmin = "0";
            if (procentmax == null)
                procentmax = "100";
            if (dokument == null)
                dokument = "";
            try
            {
                Int32.Parse(procentmin);
                Int32.Parse(procentmax);
            }
            catch
            {
                return StatusCode(409, "Pola procentów muszą być liczbami");
            }

            string query = @"
                            select * from znizkaFilter(vNazwa => @nazwaznizki, vDokument => @dokument, vProcentMin => @procentmin,
                                                                                                       vProcentMax => @procentmax);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nazwaznizki", nazwa);
                    myCommand.Parameters.AddWithValue("@procentmin", Int32.Parse(procentmin));
                    myCommand.Parameters.AddWithValue("@procentmax", Int32.Parse(procentmax));
                    myCommand.Parameters.AddWithValue("@dokument", dokument);

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
        public async Task<ActionResult<IEnumerable<Discount>>> create(string? nazwa, string? procent, string? dokument)
        {
            if (nazwa == null)
                return StatusCode(409, "Pole nazwa nie może być puste");
            if (procent == null)
                return StatusCode(409, "Pole procent zniżki nie może być puste");
            if (dokument == null)
                return StatusCode(409, "Pole dokument potwierdzający nie może być puste");
            try
            {
                Int32.Parse(procent);
            }
            catch
            {
                return StatusCode(409, "Pole procent zniżki musi być liczbą");
            }

            string query = @"
                            select znizkacreate(vNazwa => @nazwaznizki, vProcent => @procentznizki, vDokument => @dokumentpotwierdzajacy);
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
                    myCommand.Parameters.AddWithValue("@nazwaznizki", nazwa);
                    myCommand.Parameters.AddWithValue("@procentznizki", Int32.Parse(procent));
                    myCommand.Parameters.AddWithValue("@dokumentpotwierdzajacy", dokument);
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
            else if (val == 0)
                return StatusCode(409, "Istnieje już zniżka o danej nazwie");
            else if (val == -1)
                return StatusCode(409, "Dokument musi być dlugości między 1 a 32");
            else if (val == -2)
                return StatusCode(409, "Nazwa musi być dlugości między 1 a 32");
            else
                return StatusCode(409, "Procent zniżki musi być między 0 a 100");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<Discount>>> update(string? nazwa, string? procent, string? dokument)
        {
            if (nazwa == null)
                return StatusCode(409, "Pole nazwa nie może być puste");
            if (procent == null)
                return StatusCode(409, "Pole procent zniżki nie może być puste");
            if (dokument == null)
                return StatusCode(409, "Pole dokument potwierdzający nie może być puste");
            try
            {
                Int32.Parse(procent);
            }
            catch
            {
                return StatusCode(409, "Pole procent zniżki musi być liczbą");
            }

            string query = @"
                            select znizkaUpdate(vNazwa => @nazwaznizki, vProcent => @procentznizki, vDokument => @dokumentpotwierdzajacy);
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
                    myCommand.Parameters.AddWithValue("@nazwaznizki", nazwa);
                    myCommand.Parameters.AddWithValue("@procentznizki", Int32.Parse(procent));
                    myCommand.Parameters.AddWithValue("@dokumentpotwierdzajacy", dokument);
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
            else if (val == 0)
                return StatusCode(409, "Nie istnieje zniżka o danej nazwie");
            else if (val == -1)
                return StatusCode(409, "Dokument musi być dlugości między 1 a 32");
            else
                return StatusCode(409, "Procent zniżki musi być między 0 a 100");
        }

        [HttpDelete("{nazwaznizki}")]
        public IActionResult Delete(string nazwaznizki)
        {
            string query = @"
                           select znizkaDelete(@nazwaznizki);
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
                    myCommand.Parameters.AddWithValue("@nazwaznizki", nazwaznizki);
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
                return StatusCode(409, "Nie istnieje zniżka o danej nazwie");
        }
    }
}