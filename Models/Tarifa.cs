using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebReserva.Models
{
    public class Tarifa
    {

        public int IdTarifa { get; set; }

        public string Origen { get; set; }

        public float Monto { get; set; }
    }
}
