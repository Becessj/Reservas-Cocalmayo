using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebReserva.Models
{
    public class AccesoUsuario
    {
   
        public int IdReserva { get; set; }

        public DateTime Fecha { get; set; }

        public string Local { get; set; }

        public string Nacional { get; set; }

        public string Extranjero { get; set; }
        
        public string Local_n { get; set; }

        public string Nacional_n { get; set; }

        public string Extranjero_n { get; set; }

        public float Monto { get; set; }

        public int Poza { get; set; }

        public int Horario { get; set; }

        public string TipoDoc { get; set; }

        public string NroDoc { get; set; }

        public string Estado { get; set; }

        public string RazonSocial { get; set; }

        public string NombreCompleto { get; set; }

        public string Email { get; set; }

        public DateTime FControl { get; set; }

        public DateTime FechaCrea { get; set; }

        public int User { get; set; }



    }
}
