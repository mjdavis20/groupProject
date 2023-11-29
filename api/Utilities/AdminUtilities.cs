using api.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Runtime.InteropServices;

namespace api.Utilities
{
    public class AdminUtilities
    {
        public List<Admin> GetAllAdmins()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Admins ORDER BY AdminID ASC";
            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();
            List<Admin> Alladmins = new List<Admin>();
            while(rdr.Read())
            {
                Alladmins.Add(new Admin(){AdminID = rdr.GetInt32(0), Email = rdr.GetString(1), Password = rdr.GetString(2)});
            }
            con.Close();
            return Alladmins;
        }

        public void CreateAdmin(Admin myAdmin)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            Console.WriteLine("New Admin");

            string stm = @"INSERT INTO Admins(Email, Password) VALUES(@Email, @Password)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@Email", myAdmin.Email);
            cmd.Parameters.AddWithValue("@Password", myAdmin.Password);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
            // throw new NotImplementedException();
        }
    }
}