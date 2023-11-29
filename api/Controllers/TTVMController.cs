
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Utilities;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TTVMController : ControllerBase
    {


             // GET: api/Exercise
        // [HttpGet]
        // public List<Exercise> Get()
        // {
        //     IGetAllExercises readObject = new GetExercise();
        //     Console.WriteLine("Get All");
        //     return readObject.GetAllExercises();
        // }

        // // GET: api/Exercise/5
        // [EnableCors("OpenPolicy")]
        // [HttpGet("{id}", Name = "GetExercise")]
        // public Exercise Get(int id)
        // {
        //     IGetExercise readObject = new GetExercise();
        //     return readObject.GetExercise(id);
           
        // }

        // GET: api/TTVM
        [HttpGet]
        // public List<Admin> Get()
        // {
        //     GetAllAdmins readOject = new GetAllAdmins();
        //     return readOject.GetAllAdmin();
        // }

        public List<Product> Get()
        {
            Product readObject = new GetAllProducts();
            return readObject.GetAllProducts();
        }

        // GET: api/TTVM/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{ProductID}", Name = "GetProductById")]
        public Product Get(int ProductID)
        {
            GetProductById readObject = new GetProductById();
            return readObject.GetProductById(ProductID);
        }

        [EnableCors("OpenPolicy")]
        [HttpGet("{Sold}", Name = "GetSoldProducts")]
        public Product Get(bool Sold)
        {
            GetSoldProducts readObject = new GetSoldProducts();
            return readObject.GetSoldProducts(Sold);
        }


        // POST: api/TTVM
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/TTVM/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/TTVM/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

   
}
