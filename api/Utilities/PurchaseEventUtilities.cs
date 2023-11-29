using api.Models;
using MySql.Data.MySqlClient;

namespace api.Utilities
{
    public class PurchaseEventUtilities
    {
        public List<PurchaseEvent> GetAllPurchaseEvents()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Purchase Events ORDER BY PurchaseID ASC";
            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();
            List<PurchaseEvent> Allpurchaseevents = new List<PurchaseEvent>();
            while(rdr.Read())
            {
                Allpurchaseevents.Add(new PurchaseEvent(){PurchaseID = rdr.GetInt32(0), Date = rdr.GetString(1), Time = rdr.GetString(2), ProductID = rdr.GetInt32(3)});
            }
            con.Close();
            return Allpurchaseevents;
        }
    }
}