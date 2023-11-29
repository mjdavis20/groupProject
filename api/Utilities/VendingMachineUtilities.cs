using api.Models;
using MySql.Data.MySqlClient;

namespace api.Utilities
{
    public class VendingMachineUtilities
    {
         public List<VendingMachine> GetAllPurchaseEvents()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Vending Machines ORDER BY VendID ASC";
            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();
            List<VendingMachine> Allvendingmachines = new List<VendingMachine>();
            while(rdr.Read())
            {
                Allvendingmachines.Add(new VendingMachine(){VendID = rdr.GetInt32(0), Address = rdr.GetString(1), ZipCode = rdr.GetInt32(2)});
            }
            con.Close();
            return Allvendingmachines;
        }
    }
}