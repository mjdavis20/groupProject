using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Utilities;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        // GET: api/TTVM
        [HttpGet]

        public List<Admin> Get()
        {
            AdminUtilities utility = new AdminUtilities();
            return utility.GetAllAdmins();
        }

        // GET: api/TTVM/5
        [HttpGet("{id}", Name = "Get")]
        public Admin Get(int id)
        {
            AdminUtilities utility = new AdminUtilities();
            List<Admin> myAdmins = utility.GetAllAdmins();
            foreach(Admin admin in myAdmins)
            {
                if(admin.AdminID == id)
                {
                    return admin;
                }
            }
            return new Admin();
        }

        // POST: api/TTVM
        [HttpPost]
        public void Post([FromBody] Admin value)
        {
            AdminUtilities utility = new AdminUtilities();
            utility.CreateAdmin(value);
        }

        // PUT: api/TTVM/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Product value)
        {
        }

        // DELETE: api/TTVM/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

   
}
