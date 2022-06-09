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

    public class UsuarioController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsuarioController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        

        public JsonResult Get()
        {
            string query = @"select USUARIO, CLAVE ,NOMBRE_COMPLETO FROM dbo.USUARIO";
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

        [HttpPost]
        public JsonResult Post(Usuario usuario)
        {
            string query = @"insert into dbo.USUARIO (ID_USUARIO, USUARIO, CLAVE, NOMBRE_COMPLETO) values (@IDUSUARIO, @USER , @CLAVE , @NOMBRE)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@IDUSUARIO", SqlDbType.Int);
                    myCommand.Parameters["@IDUSUARIO"].Value = 5;

                    myCommand.Parameters.Add("@USER", SqlDbType.VarChar, 100);
                    myCommand.Parameters["@USER"].Value = (object)usuario.User;

                    myCommand.Parameters.Add("@CLAVE", SqlDbType.VarChar,100);
                    myCommand.Parameters["@CLAVE"].Value = (object)usuario.Clave;

                    myCommand.Parameters.Add("@NOMBRE", SqlDbType.VarChar, 100);
                    myCommand.Parameters["@NOMBRE"].Value = (object)usuario.NombreCompleto;

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
