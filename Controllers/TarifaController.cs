using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebReserva.Models;
using Microsoft.AspNetCore.Cors;

namespace WebReserva.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]


    public class TarifaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TarifaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]



        public JsonResult Get()
        {
            string query = @"select TARIFA, ORIGEN, MONTO FROM TARIFA";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult(table);
        }



        /**
        public ActionResult<IEnumerable<string>> Usuarios()
        {
            return new string[] { "value1", "value2" };
        }
        /**
         public IActionResult Index()
         {
             return View();
         }
        **/

    }

}





