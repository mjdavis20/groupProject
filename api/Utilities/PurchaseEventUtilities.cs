using api.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Runtime.InteropServices;

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

        public void NewPurchaseEvent(PurchaseEvent myPurchaseEvent)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            Console.WriteLine("New Purchase Event");

            string stm = @"INSERT INTO Purchase Events (Date, Time) VALUES(@Date, @Time)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@Date", myPurchaseEvent.Date);
            cmd.Parameters.AddWithValue("@Time", myPurchaseEvent.Time);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
    }
}