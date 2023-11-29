using api.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Runtime.InteropServices;

namespace api.Utilities
{
    public class VendingMachineUtilities
    {
        public List<VendingMachine> GetAllVendingMachines()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Vending Machines WHERE Deleted = 0 ORDER BY VendID ASC";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            List<VendingMachine> AllVendingMachines = new List<VendingMachine>();
            while(rdr.Read())
            {
                AllVendingMachines.Add(new VendingMachine(){VendID = rdr.GetInt32(0), Address = rdr.GetString(1), ZipCode = rdr.GetInt32(0)});
            }
            con.Close();
            return AllVendingMachines;
        }

        public void NewVendingMachine(VendingMachine myVendingMachine)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            Console.WriteLine("New Vending Machine");

            string stm = @"INSERT INTO Vending Machines(Address, ZipCode) VALUES(@Address, @ZipCode)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@Address", myVendingMachine.Address);
            cmd.Parameters.AddWithValue("@ZipCode", myVendingMachine.ZipCode);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
    }
}