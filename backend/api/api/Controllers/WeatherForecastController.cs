using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ordersController : ControllerBase
    {
        [HttpGet()]
        public async Task<ActionResult> Get()
        {
            int taxed = 0;
            int total = 0;
            string order = "no order";
            string[] arr;

            if(!String.IsNullOrEmpty(HttpContext.Request.Query["order"]))
            {
                order = HttpContext.Request.Query["order"].ToString();
                arr = order.Split("|");

                for(int i = 0; i < arr.Length-1; i++)
                {
                    int value = Int32.Parse(arr[i].Split(",")[0]);
                    string type = arr[i].Split(",")[1];
                    string item = arr[i].Split(",")[2];

                    if(item.IndexOf("imported") != -1)
                    {
                        taxed += value / 5;
                    }

                    if(type != "book" || type != "food" || type != "medical")
                    {
                        taxed += value / 10;
                    }
                    total += value;

                }
            }

            int[] res = { total + taxed, total};

            return Ok(res);
        }  
    }
}